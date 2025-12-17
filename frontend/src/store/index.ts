import { createStore } from 'vuex';
import type { IAuthState } from './mobules/auth';
import type { ISearchState } from './mobules/search';
import type { IProductsState } from './mobules/product';
import type { IOrdersState } from './mobules/orders';
import type { ISettingsState } from './mobules/settings';

import auth from './mobules/auth';
import search from './mobules/search';
import products from './mobules/product';
import orders from './mobules/orders';
import settings from './mobules/settings';

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
