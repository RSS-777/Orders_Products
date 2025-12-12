import { ref, onMounted, onBeforeUnmount } from 'vue';
import socket from '../services/socket';

export function useActiveSessions() {
  const activeSessions = ref<number>(0);

  const updateSessions = (count: number) => {
    console.log('updateSessions received from server:', count);
    activeSessions.value = count;
  };

  onMounted(() => {
    console.log('Socket connected?', socket.connected);
    socket.on('updateSessions', updateSessions);
  });

  onBeforeUnmount(() => {
    socket.off('updateSessions', updateSessions);
  });

  return { activeSessions };
}


