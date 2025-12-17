import { ref } from 'vue';
import store from '../store/index';
import { getDefaultCurrency } from '../api/settingsApi';

export const cachedCurrency = ref<string | null>(null);

const CACHE_LIFETIME = 60 * 60 * 1000;

export const fetchCurrency = async (forceReload = false) => {
  const token = store.getters['auth/token'];
  if (!token) {
    console.error('Token not found. Please log in.');
    return null;
  }
  const lastFetch = store.getters['settings/lastFetchCurrency'];
  const isCacheValid = lastFetch && Date.now() - lastFetch < CACHE_LIFETIME;

  if (cachedCurrency.value && isCacheValid && !forceReload) {
    return cachedCurrency.value;
  }

  try {
    const res = await getDefaultCurrency(token);

    if (!res.success || !res.data?.defaultCurrency) {
      console.error('Error loading currency:', res.error || res.message);
      return null;
    }

    cachedCurrency.value = res.data.defaultCurrency;
    store.commit('settings/setDefaultCurrency', res.data.defaultCurrency);
    store.commit('settings/setLastFetchCurrency', Date.now());
    return cachedCurrency.value;
  } catch (err) {
    console.error('Error fetching currency:', err);
    return null;
  }
};
