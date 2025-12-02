import { createStore } from "vuex";
import auth from "./mobules/auth";

export default createStore({
  modules: {
    auth,
  },
});
