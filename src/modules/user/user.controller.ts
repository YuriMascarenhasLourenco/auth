import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CACHE_MANAGER, CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('user')
export class UserController {
  constructor(@Inject(CACHE_MANAGER) private CacheManager:Cache,
    private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @UseInterceptors(CacheInterceptor)
  @CacheKey('USER_REPORT_CACHE_KEY')
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get()
  async refresh(){
    return await this.CacheManager.get('USER_REPORT_CACHE_KEY')
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
