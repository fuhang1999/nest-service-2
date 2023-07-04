/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-04 01:50:46
 * @LastEditTime: 2023-07-04 03:09:50
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\core\menu\entities\menu.entity.ts
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_deleted',
  })
  isDeleted: boolean;

  @CreateDateColumn({
    name: 'create_time',
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
  })
  updateTime: Date;
}
