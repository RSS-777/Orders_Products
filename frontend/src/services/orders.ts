import { ref } from 'vue';
import store from '../store/index';
import { getOrders } from '../api/ordersApi';
import type { IOrder } from '../types/order';

export const cachedOrders = ref<IOrder[]>([]);

const CACHE_LIFETIME = 60 * 5000;

export const fetchOrders = async (forceReload = false) => {
  const token = store.getters['auth/token'];
  if (!token) {
    console.error('Token not found. Please log in.');
    return [];
  }

  const lastFetch = store.getters['orders/lastFetch'];
  const isCacheValid = lastFetch && Date.now() - lastFetch < CACHE_LIFETIME;

  if (cachedOrders.value.length && isCacheValid && !forceReload) {
    return cachedOrders.value;
  }

  const res = await getOrders(token);

  if (!res.success) {
    console.error('Error loading orders:', res.error);
    return [];
  }

  cachedOrders.value = res.data ?? [];

  store.commit('orders/setOrdersMeta', {
    count: cachedOrders.value.length,
  });

  const currentOrder = store.getters['orders/currentOrder'];
  if (currentOrder) {
    chooseOrderById(currentOrder.id);
  }

  return cachedOrders.value;
};

export const chooseOrderById = (id: number) => {
  const order = cachedOrders.value.find((o) => o.id === id) ?? null;
  if (order) {
    store.commit('orders/setCurrentOrder', order);
  }
};
