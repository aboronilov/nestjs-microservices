import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDocument } from './models/user.schema';
import { JwtAuthGuard } from '../guards';
import { CurrentUser } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usesrService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usesrService.create(createUserDTO);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
