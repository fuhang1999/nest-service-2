/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-04 21:58:10
 * @LastEditTime: 2023-07-04 22:00:56
 * @LastEditors: 
 * @FilePath: \nest-service\src\modules\upload\upload.service.ts
 */
import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';

@Injectable()
export class UploadService {
  create(createUploadDto: CreateUploadDto) {
    console.log(createUploadDto);
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    console.log(updateUploadDto);
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
