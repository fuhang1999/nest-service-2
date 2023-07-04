/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-04 21:58:10
 * @LastEditTime: 2023-07-04 22:00:29
 * @LastEditors: 
 * @FilePath: \nest-service\src\modules\menu\menu.service.ts
 */
import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  create(createMenuDto: CreateMenuDto) {
    console.log(createMenuDto);

    return 'This action adds a new menu';
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    console.log(updateMenuDto);
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
