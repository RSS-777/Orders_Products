import type { Module } from "vuex";

export interface IAuthState {
    token: string | null;
    userId: number | null;
    photoUrl: string | null;
}

const auth: Module<IAuthState, any> = {
    namespaced: true,
    state: (): IAuthState => ({
        token: null,
        userId: null,
        photoUrl: null,
    }),
    mutations: {
        setAuth(
            state,
            payload: { token: string; userId: number; photoUrl: string | null }
        ) {
            state.token = payload.token;
            state.userId = payload.userId;
            state.photoUrl = payload.photoUrl;
        },
        setPhotoUrl(state, photoUrl: string | null) {
            state.photoUrl = photoUrl;
        },
        logout(state) {
            state.token = null;
            state.userId = null;
            state.photoUrl = null;
        },
    },
    getters: {
        isAuth: (state) => !!state.token,
        token: (state) => state.token,
        userId: (state) => state.userId,
        photoUrl: (state) => state.photoUrl,
    },
};

export default auth;
