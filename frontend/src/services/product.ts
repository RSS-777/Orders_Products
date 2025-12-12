import { ref } from 'vue';
import store from '../store/index';
import { getProducts } from '../api/productsApi';
import type { IProduct } from '../types/product';

export const cachedProducts = ref<IProduct[]>([]);

const CACHE_LIFETIME = 60 * 5000;

export const fetchProducts = async (forceReload = false) => {
  const token = store.getters['auth/token'];
  if (!token) {
    console.error('Token not found. Please log in.');
    return [];
  }

  const lastFetch = store.getters['products/lastFetch'];
  const isCacheValid = lastFetch && Date.now() - lastFetch < CACHE_LIFETIME;

  if (cachedProducts.value.length && isCacheValid && !forceReload) {
    return cachedProducts.value;
  }

  const res = await getProducts(token);

  if (!res.success) {
    console.error('Error loading products:', res.error);
    return [];
  }

  cachedProducts.value = res.data ?? [];

  store.commit('products/setProductsMeta', {
    count: cachedProducts.value.length,
  });

  return cachedProducts.value;
};

export const chooseProductById = (id: number) => {
  const product = cachedProducts.value.find((o) => o.id === id) ?? null;
  if (product) {
    store.commit('products/setCurrentProduct', product);
  }
};
