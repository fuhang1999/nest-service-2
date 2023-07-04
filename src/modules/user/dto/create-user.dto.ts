/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-04 11:46:03
 * @LastEditTime: 2023-07-04 22:01:08
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\user\dto\create-user.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
  isEmpty,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '所属部门编号',
  })
  departmentId: number;

  @ApiProperty({
    description: '用户姓名',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: '登录账号',
  })
  @IsString()
  @Matches(/^[a-z0-9A-Z]+$/)
  @MinLength(6)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: '用户密码',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    description: '归属角色',
  })
  roles: number;

  @ApiProperty({
    required: false,
    description: '呢称',
  })
  @IsString()
  @IsOptional()
  nickName: string;

  @ApiProperty({
    required: false,
    description: '邮箱',
  })
  @IsEmail()
  @ValidateIf((o) => !isEmpty(o.email))
  email: string;

  @ApiProperty({
    required: false,
    description: '手机号',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    required: false,
    description: '备注',
  })
  @IsString()
  @IsOptional()
  remark: string;

  @ApiProperty({
    description: '状态',
  })
  @IsIn([0, 1])
  status: number;
}
