import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';

@Module({
  providers: [PrinterService],
  exports: [PrinterService],
  imports: [],
})
export class PrinterModule {}
