import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      portfolios: [],
    },
    getters: {
      portfolioById: state => id => state.portfolios.find(_ => _.id === id),
    },
    mutations: {
      setPortfolios(state, payload) {
        state.portfolios = payload.portfolios;
      },
    },
  });
};

export default createStore;
