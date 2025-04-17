import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'My PDF Document';
    pdfDoc.info.Author = 'Israel Trujillo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  @Header('Content-Type', 'application/pdf')
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.employmentLetter();
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  @Header('Content-Type', 'application/pdf')
  async employmentLetterById(
    @Res() response: Response,
    @Param('employeeId') employeeId: string,
  ) {
    const pdfDoc =
      await this.basicReportsService.employmentLetterById(+employeeId);
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
