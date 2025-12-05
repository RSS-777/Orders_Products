import type { Module } from "vuex";

export interface ISearchState {
    text: string | null;
}

const search: Module<ISearchState, any> = {
    namespaced: true,

    state: (): ISearchState => ({
        text: null,
    }),

    mutations: {
        setSearch(state, payload: { text: string }) {
            state.text = payload.text;
        },
        clearSearch(state) {
            state.text = null;
        },
    },

    getters: {
        text: (state) => state.text,
    },
};

export default search;
