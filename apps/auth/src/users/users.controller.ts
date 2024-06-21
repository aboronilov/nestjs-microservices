import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserDocument } from './models/user.schema';
import { JwtAuthGuard } from '../guards';

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
