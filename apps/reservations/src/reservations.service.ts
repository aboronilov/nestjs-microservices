import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(createReservationDto: CreateReservationDto, userId: string) {
    return await this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }

  async findAll() {
    return await this.reservationsRepository.find({});
  }

  async findOne(_id: string) {
    return await this.reservationsRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return await this.reservationsRepository.findOneAndDelete({ _id });
  }
}
