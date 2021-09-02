import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  weather: [],
  spending: {},
  todo: [],
  article: {
    _id: null,
    title: '',
    content: ''
  }
})

export const mutations = {
  updateField,

  weather: (state, payload) => {
    state.weather.push(payload)
  },

  spending: (state, payload) => {
    state.spending = payload
  },

  todo: (state, payload) => {
    state.todo = payload
  },
  article: (state, payload) => {
    if (payload) {
      state.article = payload
    }
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
  },
  updateTodo ({ commit }, data) {
    commit('todo', data)
  },
  setArticle ({ commit }, data) {
    commit('article', data)
  }
}
