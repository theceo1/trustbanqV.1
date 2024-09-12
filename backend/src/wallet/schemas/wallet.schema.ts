import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Wallet extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ default: 0 })
  balance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);