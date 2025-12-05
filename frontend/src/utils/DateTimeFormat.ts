export const formatDate = (dateString?: string) => {
  if (!dateString) return '';

  const months = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = months[date.getMonth()]; 
  const year = date.getFullYear();

  return `${day} / ${month} / ${year}`;
};