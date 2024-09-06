import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  error(message: string, stack?: string, context?: string) {
    super.error(message, stack, context);
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
  }

  log(message: string, context?: string) {
    super.log(message, context);
  }

  debug(message: string, context?: string) {
    super.debug(message, context);
  }

  verbose(message: string, context?: string) {
    super.verbose(message, context);
  }
}