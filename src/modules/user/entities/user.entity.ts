/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-03 02:42:10
 * @LastEditTime: 2023-07-05 01:38:20
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\user\entities\user.entity.ts
 */
import { Role } from '@/modules/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  nickName: string;

  @Column()
  remark: string;

  //   一个用户对应一个角色，一个角色对应多个用户
  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'roleId' })
  role: Role;

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
