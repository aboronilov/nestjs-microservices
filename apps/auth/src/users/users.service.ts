import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepostory } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from './models/user.schema';
import { GetUserDTO } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepostory) {}
  async create(createUserDTO: CreateUserDTO) {
    await this.validateCreateUserDTO(createUserDTO);

    const user = await this.usersRepository.create({
      ...createUserDTO,
      password: await bcrypt.hash(createUserDTO.password, 10),
    });

    return { ...this.returnUserFields(user) };
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

  async getUser(getUserDto: GetUserDTO) {
    const user = await this.usersRepository.findOne(getUserDto);
    return { ...this.returnUserFields(user) };
  }

  async validateCreateUserDTO(createUserDto: CreateUserDTO) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('User already exists');
  }

  returnUserFields(user: UserDocument) {
    return {
      _id: user._id,
      email: user.email,
    };
  }
}
