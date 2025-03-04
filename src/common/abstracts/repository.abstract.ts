import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  DeepPartial,
  SelectQueryBuilder,
  Like,
  ILike,
  FindOptionsWhere,
  DataSource,
  EntityTarget,
} from "typeorm";
import { AbstractEntity } from "./entity.abstract";
import {
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
} from "../utils/constants";
import { HttpError } from "routing-controllers";
import { Service } from "typedi";
//   import { SearchKey } from '../enums/search.enum';

@Service()
export abstract class AbstractRepository<T extends AbstractEntity> {
  protected repository: Repository<T>;

  constructor(private dataSource: DataSource,private entity: EntityTarget<T>) {
    this.repository = this.dataSource.getRepository(entity);
  }

  getEntityName(){
    return this.entity.toString()
  }

  async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  // Unique check method
  async checkUnique(
    data: Record<string, any>,
    uniqueField: string
  ): Promise<boolean> {
    const entity = await this.repository.findOne({
      where: {
        [uniqueField]: data[uniqueField],
      } as FindOneOptions["where"],
    });

    if (entity) {
      throw new HttpError(
        HTTP_STATUS_FORBIDDEN,
        `${this.getEntityName()} with ${uniqueField} "${data[uniqueField]}" already exists.`
      );
    }
    return true;
  }

  // Create method with uniqueness check and active records only
  async create(data: Partial<T>): Promise<T> {
    return await this.repository.save(data as T);
  }


  async findOne({
    data,
    bypassExistenceCheck = false,
    options,
  }: {
    data?: T;
    bypassExistenceCheck?: boolean;
    options?: any;
  }): Promise<T> {
    const entity = await this.repository.findOne({
      where: data as FindOneOptions<T> | FindManyOptions<T[]>,
      ...options,
    });

    if (!entity || !bypassExistenceCheck) {
      throw new HttpError(
        HTTP_STATUS_NOT_FOUND,
        `${this.getEntityName()} with "${JSON.stringify(
          data
        )}" does not exist or has been deleted.`
      );
    }

    return entity;
  }

  // Pagination method with isDeleted check and total count
  async findPaginate({
    options,
    search,
    page = 1,
    limit = 10,
  }: {
    options: FindManyOptions<T>;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{
    data: T[];
    total: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const whereCondition = {
      ...(options.where as FindManyOptions["where"]),
      ...(search
        ? { name: ILike(`%${search}%`) } // Case-insensitive search for name
        : {}),
    } as FindManyOptions["where"];

    const [data, total] = await this.repository.findAndCount({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      ...options,
    });

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      total,
      currentPage: page,
      hasNextPage,
      hasPreviousPage,
      data,
    };
  }

  async findAll({
    options,
    search,
  }: {
    options: FindManyOptions<T>;
    search?: string;
  }) {
    const whereCondition = {
      ...(options.where as FindManyOptions["where"]),
      ...(search && { name: ILike(`%${search}%`) }),
    } as FindManyOptions["where"];
    const data = await this.repository.find({
      where: whereCondition,
      ...options,
    });

    return data;
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(alias);
  }

  async findOneAndDelete(data: T): Promise<void> {
    const entity = await this.findOne({ data: data });
    await this.repository.remove(entity);
  }

  // Update method with existence check
  async findOneAndUpdate(id: string, data: Partial<T>, uniqueField?: string): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOneOptions["where"],
    });
    if (!entity) {
      throw new HttpError(
        HTTP_STATUS_NOT_FOUND,
        `Cannot update. Entity with ID "${id}" does not exist or has been deleted.`
      );
    }

    if (uniqueField) await this.checkUnique(data, uniqueField);

    Object.assign(entity, data);
    return await this.repository.save(entity);
  }
}
