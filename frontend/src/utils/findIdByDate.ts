type ProductWithDate = {
  id: number;
  date?: string;
  [key: string]: any;
};

const months: Record<string, string> = {
  янв: '01', фев: '02', мар: '03', апр: '04', май: '05', июн: '06',
  июл: '07', июля: '07', авг: '08', сен: '09', окт: '10', ноя: '11', дек: '12'
};

const parseDateString = (str?: string): Date | null => {
  if (!str) return null;

  let normalizedStr = str.trim().toLowerCase();

  for (const [key, value] of Object.entries(months)) {
    if (normalizedStr.includes(key)) {
      normalizedStr = normalizedStr.replace(key, value);
      break;
    }
  }

  normalizedStr = normalizedStr
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s*\.\s*/g, '/')
    .replace(/\s*-\s*/g, '/')
    .replace(/\s+/g, '/');

  let separator = '/';
  if (normalizedStr.includes('.')) separator = '.';
  else if (normalizedStr.includes('-')) separator = '-';

  const parts = normalizedStr.split(separator);
  const [p0, p1, p2] = parts;
  if (!p0 || !p1 || !p2) return null;

  let day: string, month: string, year: string;

  if (p0.length === 4) {
    year = p0;
    month = p1.padStart(2, '0');
    day = p2.padStart(2, '0');
  } else {
    day = p0.padStart(2, '0');
    month = p1.padStart(2, '0');
    year = p2;
  }

  const date = new Date(`${year}-${month}-${day}`);
  return isNaN(date.getTime()) ? null : date;
};

export const findIdByDate = (items: ProductWithDate[], query: string): number | undefined => {
  if (!items || !query) return undefined;

  const queryDate = parseDateString(query);
  if (!queryDate) return undefined;

  for (const item of items) {
    if (!item.date) continue;
    
     const itemDate = new Date(item.date);
    if (isNaN(itemDate.getTime())) continue;

    if (
      itemDate.getFullYear() === queryDate.getFullYear() &&
      itemDate.getMonth() === queryDate.getMonth() &&
      itemDate.getDate() === queryDate.getDate()
    ) {
      console.log('Match found:', item);
      return item.id;
    }
  }
  return undefined;
};

