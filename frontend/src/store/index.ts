import { createStore } from "vuex";
import auth from "./mobules/auth";
import search from "./search";

export default createStore({
  modules: {
    auth,
    search
  },
});
