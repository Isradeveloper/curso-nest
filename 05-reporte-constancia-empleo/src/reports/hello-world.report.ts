import { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
}

export const getHelloWorldReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { name } = options;

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: `Hello, ${name}`,
        style: 'header',
      },
    ],
  };
  return docDefinition;
};
