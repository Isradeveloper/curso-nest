import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getEmploymentLetter,
  getEmploymentLetterByIdReport,
  getHelloWorldReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    // console.log('Connected to the database');
  }

  async hello() {
    const docDefinition = getHelloWorldReport({ name: 'Isra' });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetter() {
    const docDefinition = getEmploymentLetter();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: { id: employeeId },
    });

    if (!employee)
      throw new NotFoundException(`Employee with ${employeeId} not found`);

    const docDefinition = getEmploymentLetterByIdReport({
      employeeHours: employee.hours_per_day,
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'TUCAN CORP S.A.S',
      employerName: 'Israel Trujillo Domínguez',
      employerPosition: 'CEO',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
