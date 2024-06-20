import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModel } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModel.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
