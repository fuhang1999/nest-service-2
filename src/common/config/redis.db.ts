/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-03 02:40:23
 * @LastEditTime: 2023-07-04 03:19:06
 * @LastEditors: 
 * @FilePath: \nest-service\src\common\config\redis.db.ts
 */
export default () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});
