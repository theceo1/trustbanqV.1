import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { ThrottlerModule } from '@nestjs/throttler';  // Comment this line
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    // ThrottlerModule.forRoot([{  // Comment this block
    //   ttl: 60000,
    //   limit: 10,
    // }]),
    AuthModule,
    UserModule,
    WalletModule,
  ],
})
export class AppModule {}