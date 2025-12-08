import { createStore } from 'vuex';
import type { IAuthState } from './mobules/auth';
import type { ISearchState } from './mobules/search';
import auth from './mobules/auth';
import search from './mobules/search';

export interface IRootState {
  auth: IAuthState;
  search: ISearchState;
}

export default createStore<IRootState>({
  modules: {
    auth,
    search
  },
});
