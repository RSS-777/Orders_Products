export const searchProductDate = (dateString: string, query: string): boolean => {
  if (!dateString || !query) {
    return false;
  }

  const months: Record<string, string> = {
    янв: '01',
    фев: '02',
    мар: '03',
    апр: '04',
    май: '05',
    июн: '06',
    июл: '07',
    июля: '07',
    авг: '08',
    сен: '09',
    окт: '10',
    ноя: '11',
    дек: '12',
  };

  const trimmedQuery = query.trim();
  let queryDate: Date;

  try {
    if (trimmedQuery.includes('/')) {
      const parts = trimmedQuery.split(/\s*\/\s*/);
      if (parts.length !== 3) {
        return false;
      }

      const day = parts[0] ? parts[0].padStart(2, '0') : '01';
      const monthKey = parts[1] ? parts[1].toLowerCase() : '';
      const month = months[monthKey] || (monthKey ? monthKey.padStart(2, '0') : '01');
      const year = parts[2] || '2000';

      queryDate = new Date(`${year}-${month}-${day}`);
    } else if (trimmedQuery.includes(' ')) {
      const parts = trimmedQuery.split(/\s+/);
      if (parts.length !== 3) {
        return false;
      }

      const day = parts[0] ? parts[0].padStart(2, '0') : '01';
      const monthKey = parts[1] ? parts[1].toLowerCase() : '';
      const month = months[monthKey] || (monthKey ? monthKey.padStart(2, '0') : '01');
      const year = parts[2] || '2000';

      queryDate = new Date(`${year}-${month}-${day}`);
    } else if (trimmedQuery.includes('.') || trimmedQuery.includes('-')) {
      const separator = trimmedQuery.includes('.') ? '.' : '-';
      const parts = trimmedQuery.split(separator);
      if (parts.length !== 3) {
        return false;
      }

      let year: string, month: string, day: string;
      if (parts[0] && parts[0].length === 4) {
        year = parts[0];
        month = parts[1] ? parts[1].padStart(2, '0') : '01';
        day = parts[2] ? parts[2].padStart(2, '0') : '01';
      } else {
        day = parts[0] ? parts[0].padStart(2, '0') : '01';
        month = parts[1] ? parts[1].padStart(2, '0') : '01';
        year = parts[2] || '2000';
      }

      queryDate = new Date(`${year}-${month}-${day}`);
    } else {
      return false;
    }
    const datePart = dateString.split(' ')[0];
    if (!datePart) {
      return false;
    }

    const date = new Date(datePart);

    return +queryDate === +date;
  } catch (error) {
    console.error('Error parsing date:', error);
    return false;
  }
};
