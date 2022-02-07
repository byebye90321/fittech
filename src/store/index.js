import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test:0,
    pageCount:80,
    
  },
  actions:{
    
  },
  mutations: {

    test(state,newVal)
    {
      state.test = newVal
    },
    
    
  },
  actions: {
    setLang ({ commit }, payload) {
      commit('changeLang', payload)
    }
  },

})