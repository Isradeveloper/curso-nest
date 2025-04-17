import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { showDate = true, showLogo = true, title, subtitle } = options;

  const headerLogo = showLogo ? logo : null;
  const headerDate = showDate
    ? ({
        text: `${DateFormatter.getDDMMYYYY(new Date())}`,
        alignment: 'right',
        margin: [20, 20, 20, 20],
      } as Content)
    : null;

  const headerTitle: Content = title
    ? {
        text: title,
        style: {
          bold: true,
          alignment: 'center',
        },
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
