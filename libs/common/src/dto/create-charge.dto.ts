import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CardDTO } from './card.dto';
import { Type } from 'class-transformer';

export class CreateChargeDTO {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDTO)
  card: CardDTO;

  @IsNumber()
  amount: number;
}
