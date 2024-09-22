import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    this.logger.error(`HTTP Exception: ${JSON.stringify(exceptionResponse)}`);

    let errorMessage: string;
    if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
      errorMessage = exceptionResponse.message as string;
    } else if (typeof exceptionResponse === 'string') {
      errorMessage = exceptionResponse;
    } else {
      errorMessage = exception.message;
    }

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: errorMessage,
      });
  }
}