import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';

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
    fontSize: 14,
    bold: true,
  },
  footer: {
    fontSize: 10,
    margin: [0, 0, 0, 20],
    alignment: 'center',
    italics: true,
  },
};

export const getEmploymentLetter = (): TDocumentDefinitions => {
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
        text: 'Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado].\n\nDurante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo delEmpleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\nLa jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\nEsta constancia se expide a solicitud del interesado para los fines que considere conveniente.',
        style: 'mainContent',
      },
      {
        text: 'Atentamente,\n[Nombre del Empleador]\n[Cargo del Empleador]\n[Nombre de la Empresa]\n[Fecha de Emisión]',
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
