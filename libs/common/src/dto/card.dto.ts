import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import Stripe from 'stripe';

export class CardDTO {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNumber()
  exp_month: number;

  @IsNumber()
  exp_year: number;

  @IsCreditCard()
  number: string;

  // @IsOptional()
  // networks?: Stripe.Card.Networks;

  // @IsOptional()
  // @IsString()
  // token?: string;
}
