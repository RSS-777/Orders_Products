import { ref, onMounted, onUnmounted } from 'vue';

export function useTime() {
    const formattedTime = ref('');

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        formattedTime.value = `${hours}:${minutes}`;
    }

    let timeoutId: number | undefined;
    let intervalId: number | undefined;

    onMounted(() => {
        updateTime();
        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000;

        timeoutId = window.setTimeout(() => {
            updateTime();
            intervalId = window.setInterval(updateTime, 60 * 1000);
        }, msUntilNextMinute);
    });

    onUnmounted(() => {
        if (timeoutId) clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
    });

    return { formattedTime };
}
