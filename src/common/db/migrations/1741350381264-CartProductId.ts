import { MigrationInterface, QueryRunner } from "typeorm";

export class CartProductId1741350381264 implements MigrationInterface {
    name = 'CartProductId1741350381264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_371eb56ecc4104c2644711fa85f"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "productId" TO "product_id"`);
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "product_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_dccd1ec2d6f5644a69adf163bc1" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_dccd1ec2d6f5644a69adf163bc1"`);
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "product_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "product_id" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_371eb56ecc4104c2644711fa85f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
