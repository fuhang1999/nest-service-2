/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-04 03:16:52
 * @LastEditTime: 2023-07-04 03:26:33
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\config\database.db.ts
 */

import type { TypeOrmModule } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModule = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT as unknown as number,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  // 自动加载实体
  autoLoadEntities: true,
};
