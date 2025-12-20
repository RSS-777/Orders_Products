import { ref } from 'vue';

export function useTooltip(timeout = 3000) {
  const activeTooltipId = ref<number | null>(null);
  const activeTooltipText = ref<string>('');
  const tooltipX = ref<number | null>(null);
  let tooltipTimeout: number | null = null;

  const toggleTooltip = (id: number, text: string, e?: MouseEvent) => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      tooltipTimeout = null;
    }

    if (activeTooltipId.value === id && activeTooltipText.value === text) {
      activeTooltipId.value = null;
      activeTooltipText.value = '';
      tooltipX.value = null;
      return;
    }

    activeTooltipId.value = id;
    activeTooltipText.value = text;

    if (e) {
      const target = e.currentTarget as HTMLElement;
      tooltipX.value = target.offsetLeft;
    } else {
      tooltipX.value = null;
    }

    tooltipTimeout = window.setTimeout(() => {
      activeTooltipId.value = null;
      activeTooltipText.value = '';
      tooltipX.value = null;
      tooltipTimeout = null;
    }, timeout);
  };

  return {
    activeTooltipId,
    activeTooltipText,
    tooltipX,
    toggleTooltip,
  };
}
