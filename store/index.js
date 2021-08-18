import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  weather: []
})

export const mutations = {
  updateField,

  weather: (state, payload) => {
    state.weather.push(payload)
  }
}

export const getters = {
  getField
}

export const actions = {
  updateWeather ({ commit }, data) {
    commit('weather', data)
  }
}
