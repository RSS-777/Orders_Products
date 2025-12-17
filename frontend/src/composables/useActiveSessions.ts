import { ref, onMounted, onBeforeUnmount } from 'vue';
import socket from '../services/socket';

export function useActiveSessions() {
  const activeSessions = ref<number>(0);

  const updateSessions = (count: number) => {
    activeSessions.value = count;
  };

  const setupSocket = () => {
    socket.on('updateSessions', updateSessions);
    socket.emit('requestSessions');
  };

  onMounted(() => {
    if (socket.connected) {
      setupSocket();
    } else {
      socket.once('connect', setupSocket);
    }
  });

  onBeforeUnmount(() => {
    socket.off('updateSessions', updateSessions);
  });

  return { activeSessions };
}
