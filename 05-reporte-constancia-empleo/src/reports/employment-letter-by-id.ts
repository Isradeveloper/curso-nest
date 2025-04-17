import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { DateFormatter } from 'src/helpers';

interface ReportOptions {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}

const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 100, 0, 20],
  },
  mainContent: {
    fontSize: 12,
    margin: [0, 0, 0, 70],
    alignment: 'justify',
  },
  signature: {
    fontSize: 12,
    bold: true,
  },
  footer: {
    fontSize: 10,
    margin: [0, 0, 0, 20],
    alignment: 'center',
    italics: true,
  },
};

export const getEmploymentLetterByIdReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employerCompany,
    employeeName,
    employeeHours,
    employeePosition,
    employeeStartDate,
    employeeWorkSchedule,
  } = options;

  const docDefinition: TDocumentDefinitions = {
    styles: style,
    header: headerSection({
      showLogo: true,
      showDate: true,
    }),
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMYYYY(employeeStartDate)}.\n\nDurante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\nLa jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\nEsta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'mainContent',
      },
      {
        text: `Atentamente,\n${employerName}\n${employerPosition}\n${employerCompany}\n${DateFormatter.getDDMMYYYY(new Date())}`,
        style: 'signature',
      },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
  };
  return docDefinition;
};
