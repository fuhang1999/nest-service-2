/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-04 03:16:52
 * @LastEditTime: 2023-07-04 16:56:38
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\config\configuration.ts
 */
export const getConfiguration = () => ({
  database: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT as unknown as number,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    timezone: '+08:00', // 东八区
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB || 0,
  },
  swagger: {
    enable: process.env.SWAGGER_ENABLE === 'true',
    path: process.env.SWAGGER_PATH,
    title: process.env.SWAGGER_TITLE,
    desc: process.env.SWAGGER_DESC,
    version: process.env.SWAGGER_VERSION,
  },
});
