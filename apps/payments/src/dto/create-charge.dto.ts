import Stripe from 'stripe';

export class CreateChargeDTO {
  card: Stripe.PaymentMethodCreateParams.Card;
  amount: number;
}
