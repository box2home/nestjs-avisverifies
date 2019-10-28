import { Logger, Injectable } from '@nestjs/common';
@Injectable()
export class AvVerifLogger extends Logger {
  error(message: string, trace: string) {
    super.error(message, trace);
  }
  log(message: string, trace: string) {
    super.log(message, trace);
  }

}
