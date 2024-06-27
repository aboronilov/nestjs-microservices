import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDTO } from '@app/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_TEST_KEY'),
    { apiVersion: '2024-06-20' },
  );

  constructor(
    // private readonly stripe: Stripe,
    private readonly configService: ConfigService,
  ) {}

  async createCharge({ amount, card }: CreateChargeDTO) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      confirm: true,
      description: 'My First Test Charge (created for API docs)',
      return_url: 'https://stripe.com/',
    });

    return paymentIntent;
  }
}
