import { ref, onMounted } from 'vue';
import { formatDate } from '../utils/dateTimeFormat';

export function useDate(format: 'slash' | 'space' = 'slash') {
  const formattedDate = ref('');
  const formattedDay = ref('');

  function updateDate() {
    const now = new Date();
    formattedDate.value = formatDate(now.toISOString(), format);

    const weekday = now.toLocaleDateString('ru-RU', { weekday: 'long' });
    formattedDay.value = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  }

  onMounted(() => {
    updateDate();
  });

  return { formattedDate, formattedDay, updateDate };
}
