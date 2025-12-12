import type { Module } from 'vuex';
import type { IRootState } from '../index';
import type { IOrder } from '../../types/order';

export interface IOrdersState {
  count: number;
  lastFetch: number | null;
  currentOrder: IOrder | null;
  orderId: number | null;
}

const orders: Module<IOrdersState, IRootState> = {
  namespaced: true,

  state: (): IOrdersState => ({
    count: 0,
    lastFetch: null,
    currentOrder: null,
    orderId: null,
  }),

  mutations: {
    setOrdersMeta(state, payload: { count: number }) {
      state.count = payload.count;
      state.lastFetch = Date.now();
    },
    setCurrentOrder(state, order: IOrder) {
      state.currentOrder = order;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
    setOrderId(state, id: number) {
      state.orderId = id;
    },
    clearOrderId(state) {
      state.orderId = null;
    },
  },

  getters: {
    count: (state) => state.count,
    lastFetch: (state) => state.lastFetch,
    currentOrder: (state) => state.currentOrder,
    orderId: (state) => state.orderId,
  },
};

export default orders;
