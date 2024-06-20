import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepostory } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepostory) {}
  async create(createUserDTO: CreateUserDTO) {
    return this.usersRepository.create(createUserDTO);
  }
}
