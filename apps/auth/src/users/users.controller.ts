import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usesrService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usesrService.create(createUserDTO);
  }
}
