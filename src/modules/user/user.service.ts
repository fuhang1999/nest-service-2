import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 查询所有用户
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // 根据ID查询用户
  findById(id: any): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  // 根据用户名查询用户
  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  // 创建用户
  async create(user: CreateUserDto): Promise<User> {
    // return this.userRepository.save(user);
    const existUser = await this.findByUsername(user?.username);
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.save(user);
  }

  // 更新用户
  async update(id: string, updateUser: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (user) {
      // 更新用户属性
      Object.assign(user, updateUser);
      return this.userRepository.save(user);
    }
    return null;
  }

  // 删除用户
  async delete(id: string): Promise<User> {
    const user = await this.findById(id);
    if (user) {
      return this.userRepository.remove(user);
    }
    return null;
  }
}
