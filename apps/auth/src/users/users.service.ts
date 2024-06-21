import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepostory } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepostory) {}
  async create(createUserDTO: CreateUserDTO) {
    return this.usersRepository.create({
      ...createUserDTO,
      password: await bcrypt.hash(createUserDTO.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return { ...this.returnUserFields(user) };
  }

  returnUserFields(user: UserDocument) {
    return {
      _id: user._id,
      email: user.email,
    };
  }
}
