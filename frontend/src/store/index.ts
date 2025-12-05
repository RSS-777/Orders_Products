import { createStore } from "vuex";
import auth from "./mobules/auth";
import search from "./mobules/search";

export default createStore({
  modules: {
    auth,
    search
  },
});
