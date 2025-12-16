import type { Module } from 'vuex';
import type { IRootState } from '..';

export type Currency = 'USD' | 'UAH';

export interface ISettingsState {
  defaultCurrency: Currency;
  lastFetchCurrency: number | null;
}

const settings: Module<ISettingsState, IRootState> = {
  namespaced: true,

  state: (): ISettingsState => ({
    defaultCurrency: 'UAH',
    lastFetchCurrency: null,
  }),

  mutations: {
    setDefaultCurrency(state, currency: Currency) {
      state.defaultCurrency = currency;
    },
    setLastFetchCurrency(state, timestamp: number) {
      state.lastFetchCurrency = timestamp;
    },
  },

  getters: {
    defaultCurrency: (state) => state.defaultCurrency,
    lastFetchCurrency: (state) => state.lastFetchCurrency,
  },
};

export default settings;
