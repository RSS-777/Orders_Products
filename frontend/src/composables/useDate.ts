import { ref, onMounted } from 'vue';
import { formatDate } from '../utils/dateTimeFormat';

export function useDate(format: 'slash' | 'space' = 'slash') {
  const formattedDate = ref('');
  const formattedDay = ref('');

  function updateDate() {
    const now = new Date();
    const actualFormat: 'slash' | 'long' = format === 'space' ? 'long' : 'slash';

    formattedDate.value = formatDate(now.toISOString(), actualFormat);

    const weekday = now.toLocaleDateString('ru-RU', { weekday: 'long' });
    formattedDay.value = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  }

  onMounted(() => {
    updateDate();
  });

  return { formattedDate, formattedDay, updateDate };
}
