export const formatDate = (dateString?: string, format?: 'slash' | 'long') => {
  if (!dateString) return '';

  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const monthNum = String(date.getMonth() + 1).padStart(2, '0'); 
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  if (format === 'slash') return `${day}/${monthNum}`;   
  if (format === 'long') return `${day}/${monthName}/${year}`; 

  return dateString;
};

