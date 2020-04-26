import Vuex from 'vuex'

export default () => (new Vuex.Store({
  state: {
    restaurants: [],
    restaurant: {},
  },

  getters: {
    restaurants: (state) => {
      return state.restaurants
    },
    restaurant: (state) => {
      return state.restaurant
    },
  },

  mutations: {
    setRestaurants (state, restaurants) {
      state.restaurants = restaurants
    },
    setRestaurant (state, restaurant) {
      state.restaurant = restaurant
    },
  },

  actions: {
    async fetchRestaurants ({ commit }) {
      try {
        let res = await this.$axios.get(`/api/v1/restaurants`)
        let restaurants = res.data
        commit('setRestaurants', restaurants)
      } catch(e) {
        console.log(e)
      }
    },
    async fetchRestaurant ({ commit }, id) {
      try {
        let res = await this.$axios.get(`/api/v1/restaurants/${id}`)
        let restaurant = res.data
        commit('setRestaurant', restaurant)
      } catch(e) {
        console.log(e)
      }
    },
  }
}))

// export const state = () => ({
//   restaurants: []
// })

// export const getters = () => ({
//   restaurants (state) {
//     return state.restaurants
//   }
// })

// export const mutations = () => ({
//   setRestaurants (state, payload) {
//     state.restaurants = payload
//     console.log(state)
//   }
// })

// export const actions = () => ({
//   async fetchRestaurants ({ commit }) {
//     let res = await this.$axios.get(`/api/v1/restaurants`)
//     let restaurants = res.data
//     commit('setRestaurants', restaurants)
//   }
// })
