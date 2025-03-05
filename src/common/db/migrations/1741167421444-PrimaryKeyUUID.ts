import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimaryKeyUUID1741167421444 implements MigrationInterface {
    name = 'PrimaryKeyUUID1741167421444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "FK_4aa1348fc4b7da9bef0fae8ff48"`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "FK_6a22002acac4976977b1efd114a"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "parentId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "PK_6a22002acac4976977b1efd114a" PRIMARY KEY ("id_descendant")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4aa1348fc4b7da9bef0fae8ff4"`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP COLUMN "id_ancestor"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD "id_ancestor" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "PK_6a22002acac4976977b1efd114a"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9" PRIMARY KEY ("id_descendant", "id_ancestor")`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "PK_4aa1348fc4b7da9bef0fae8ff48" PRIMARY KEY ("id_ancestor")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a22002acac4976977b1efd114"`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP COLUMN "id_descendant"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD "id_descendant" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "PK_4aa1348fc4b7da9bef0fae8ff48"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9" PRIMARY KEY ("id_ancestor", "id_descendant")`);
        await queryRunner.query(`CREATE INDEX "IDX_4aa1348fc4b7da9bef0fae8ff4" ON "category_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_6a22002acac4976977b1efd114" ON "category_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "FK_4aa1348fc4b7da9bef0fae8ff48" FOREIGN KEY ("id_ancestor") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "FK_6a22002acac4976977b1efd114a" FOREIGN KEY ("id_descendant") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "FK_6a22002acac4976977b1efd114a"`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "FK_4aa1348fc4b7da9bef0fae8ff48"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a22002acac4976977b1efd114"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4aa1348fc4b7da9bef0fae8ff4"`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "PK_4aa1348fc4b7da9bef0fae8ff48" PRIMARY KEY ("id_ancestor")`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP COLUMN "id_descendant"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD "id_descendant" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_6a22002acac4976977b1efd114" ON "category_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "PK_4aa1348fc4b7da9bef0fae8ff48"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9" PRIMARY KEY ("id_descendant", "id_ancestor")`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "PK_6a22002acac4976977b1efd114a" PRIMARY KEY ("id_descendant")`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP COLUMN "id_ancestor"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD "id_ancestor" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_4aa1348fc4b7da9bef0fae8ff4" ON "category_closure" ("id_ancestor") `);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "PK_6a22002acac4976977b1efd114a"`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9" PRIMARY KEY ("id_ancestor", "id_descendant")`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "parentId" integer`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "FK_4aa1348fc4b7da9bef0fae8ff48" FOREIGN KEY ("id_ancestor") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
