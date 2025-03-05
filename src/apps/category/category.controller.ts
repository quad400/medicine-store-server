import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  QueryParam,
} from "routing-controllers";
import Container, { Service } from "typedi";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./category.dto";
import { Response } from "src/common/utils/response";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} from "src/common/utils/constants";

@Service()
@Controller("/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() body: CreateCategoryDto) {
    return new Response(
      true,
      HTTP_STATUS_CREATED,
      "Category Created Successfully",
      await this.categoryService.createCategory(body)
    );
  }

  @Get()
  async get(@QueryParam("parentId") parentId?: string) {
    return new Response(
      true,
      HTTP_STATUS_OK,
      "Categories Fetched Successfully",
      await this.categoryService.getCategories()
    );
  }

  @Get("/decendants/:categoryId")
  async getDescendants(@Param("parentId") parentId: string) {
    return new Response(
      true,
      HTTP_STATUS_OK,
      "Categories Fetched Successfully",
      await this.categoryService.getCategoryDescendants(parentId)
    );
  }

  @Get("/:categoryId")
  async getById(@Param("categoryId") categoryId: string) {
    return new Response(
      true,
      HTTP_STATUS_OK,
      "Category Fetched",
      await this.categoryService.getCategoriesById(categoryId)
    );
  }

  @Delete("/:categoryId")
  async delete(@Param("categoryId") categoryId: string) {
    return new Response(
      true,
      HTTP_STATUS_OK,
      "Category deleted",
      await this.categoryService.removeCategory(categoryId)
    );
  }
}
