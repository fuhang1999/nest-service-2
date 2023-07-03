/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-03 02:42:59
 * @LastEditTime: 2023-07-04 03:11:15
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\core\role\entities\role.entity.ts
 */
import { Menu } from '@/core/menu/entities/menu.entity';
import { User } from '@/core/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Menu)
  @JoinTable()
  menus: Menu[];

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
