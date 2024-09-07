import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'TrustBank API is running!';
  }

  @Get('api')
  getApi(): string {
    return 'TrustBank API endpoint';
  }
}