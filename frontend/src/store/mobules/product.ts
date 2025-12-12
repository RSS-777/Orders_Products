import type { Module } from 'vuex';
import type { IRootState } from '../index';
import type { IProduct } from '../../types/product';

export interface IProductsState {
  count: number;
  lastFetch: number | null;
  currentProduct: IProduct | null;
  idProduct: number | null;
  createProductFormOpen: boolean;
}

const products: Module<IProductsState, IRootState> = {
  namespaced: true,

  state: (): IProductsState => ({
    count: 0,
    lastFetch: null,
    currentProduct: null,
    idProduct: null,
    createProductFormOpen: false
  }),

  mutations: {
    setProductsMeta(state, payload: { count: number }) {
      state.count = payload.count;
      state.lastFetch = Date.now();
    },
    setCurrentProduct(state, product: IProduct) {
      state.currentProduct = product;
    },
    clearCurrentProduct(state) {
      state.currentProduct = null;
    },
    setProductId(state, id: number) {
      state.idProduct = id;
    },
    clearProductId(state) {
      state.idProduct = null
    },
    openCreateProductForm(state) {
      state.createProductFormOpen = true;
    },
    closeCreateProductForm(state) {
      state.createProductFormOpen = false;
    },
  },

  getters: {
    count: (state) => state.count,
    lastFetch: (state) => state.lastFetch,
    currentProduct: (state) => state.currentProduct,
    idProduct: (state) => state.idProduct,
    isCreateProductFormOpen: (state) => state.createProductFormOpen
  },
};

export default products;
