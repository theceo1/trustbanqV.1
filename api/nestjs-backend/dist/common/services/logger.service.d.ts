import { Logger } from '@nestjs/common';
export declare class LoggerService extends Logger {
    error(message: string, trace: string): void;
    warn(message: string): void;
    log(message: string): void;
    debug(message: string): void;
}
