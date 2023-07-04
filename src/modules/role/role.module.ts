/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-03 02:42:59
 * @LastEditTime: 2023-07-04 01:53:28
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\core\role\role.module.ts
 */
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Role } from './entities/role.entity';
import { Menu } from '../menu/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Menu])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
