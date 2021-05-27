import { Logger } from '@nestjs/common';

export class Log {
  private readonly logger = new Logger();
  log(context, fn: Function, start: number, end: number, additional?: any) {
    const duration: number = end - start;
    let log;
    if (additional) {
      log = { method: fn.name, duration, additional };
    } else {
      log = { method: fn.name, duration };
    }
    this.logger.log(JSON.stringify(log), context);
  }
}
export default new Log();
