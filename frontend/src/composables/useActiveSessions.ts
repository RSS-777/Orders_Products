import { ref, onMounted, onBeforeUnmount } from 'vue';
import socket from '../services/socket';

export function useActiveSessions() {
  const activeSessions = ref<number>(0);

  const updateSessions = (count: number) => {
    activeSessions.value = count;
  };

  onMounted(() => {
    socket.on('updateSessions', updateSessions);
  });

  onBeforeUnmount(() => {
    socket.off('updateSessions', updateSessions);
  });

  return { activeSessions };
}


