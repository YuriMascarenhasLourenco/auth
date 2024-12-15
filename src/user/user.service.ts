import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { UserDto } from './dto/user.dto';
import { cryptoUtil } from 'src/common/utils/crypt.util';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = this.repo.create(createUserDto);
      user.id = randomUUID();
      const dbuser = await this.repo.save(user);
      return plainToInstance(UserDto, dbuser);
    } catch (err) {
      console.log('error:', err);
      throw new InternalServerErrorException(
        'error trying to create a user',
        err,
      );
    }
  }

  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.repo.find({});
      return plainToInstance(UserDto, users);
    } catch (e) {
      throw new InternalServerErrorException('there is no users', e);
    }
  }

  async findOne(id: string): Promise<UserDto> {
    try {
      const user = await this.repo.findOne({
        where: {
          id,
        },
      });
      if (user) {
        return plainToInstance(UserDto, User);
      }
    } catch (e) {
      throw new InternalServerErrorException('there is no user', e);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      const user = await this.repo.findOne({
        where: {
          id,
        },
      });
      user.password = updateUserDto.password;
      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      const dbUser = await this.repo.save(user);
      return plainToInstance(UserDto, dbUser);
    } catch (err) {
      throw new InternalServerErrorException(
        'User doesn´t able to update ',
        err,
      );
    }
  }

  async remove(id: string) {
    return await this.repo.delete({
      id,
    });
  }

  async validatePassword(
    name: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.repo.findOne({
      where: {
        name: name,
      },
    });
    if (
      user &&
      (await cryptoUtil.validatePassword(password, user.salt, user.password))
    ) {
      return plainToInstance(UserDto, user);
    } else {
      return null;
    }
  }
}
