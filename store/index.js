import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  weather: [],
  spending: {}
})

export const mutations = {
  updateField,

  weather: (state, payload) => {
    state.weather.push(payload)
  },

  spending: (state, payload) => {
    state.spending = payload
  }
}

export const getters = {
  getField
}

export const actions = {
  updateWeather ({ commit }, data) {
    commit('weather', data)
  },
  updateSpending ({ commit }, data) {
    commit('spending', data)
  }
}
