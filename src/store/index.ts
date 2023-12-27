import { createStore } from 'vuex'
import VueCookies from 'vue-cookies'

const cookies = VueCookies

export default createStore({
  state: {
    isLoggedIn: cookies.get('todo_token'), // ログイン状態を管理する変数
  },
  mutations: {
    // ログイン状態を変更するためのミューテーション
    setLoggedIn(state, isLoggedIn: boolean) {
      state.isLoggedIn = isLoggedIn
    },
  },
  actions: {
    // ログイン状態を変更するアクション
    login({ commit }, token: string) {
      // ログイン処理が成功したと仮定
      cookies.set('todo_token', token)
      commit('setLoggedIn', true)
    },
    // ログアウト状態を変更するアクション
    logout({ commit }) {
      // ログアウト処理が成功したと仮定
      cookies.remove('todo_token')
      commit('setLoggedIn', false)
    },
    // // Cookieからログイン状態を取得してセットするアクション
    // initializeLoginState({ commit }) {
    //   const token = cookies.get('todo_token')
    //   const isLoggedIn = !!token // tokenが存在すればログイン済みと見なす

    //   commit('setLoggedIn', isLoggedIn)
    // },
  },
  getters: {
    // ログイン状態を取得するゲッター
    isLoggedIn: (state) => state.isLoggedIn,
  },
})
