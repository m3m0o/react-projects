import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertAdminUser1686354953992 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.user(name, email, cpf, type_user, phone, password)
        VALUES ('root', 'root@root.com', '12345678901', 2, '14991113926', '$2b$10$8EVZ4VpxQg3szLf150JLJe.KBvND1/s1wx.Ijl42z5qgIRW9BSdUK')
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.user WHERE email LIKE 'root@root.com'
      `);
  }
}
