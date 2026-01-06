import { createStore } from 'vuex';
import type { IAuthState } from './modules/auth';
import type { ISearchState } from './modules/search';
import type { IProductsState } from './modules/product';
import type { IOrdersState } from './modules/orders';
import type { ISettingsState } from './modules/settings';

import auth from './modules/auth';
import search from './modules/search';
import products from './modules/product';
import orders from './modules/orders';
import settings from './modules/settings';

export interface IRootState {
  auth: IAuthState;
  search: ISearchState;
  products: IProductsState;
  orders: IOrdersState;
  settings: ISettingsState;
}

export default createStore<IRootState>({
  modules: {
    auth,
    search,
    products,
    orders,
    settings,
  },
});
