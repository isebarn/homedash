<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex lg6 md6 sm12>
        <material-stats-card
          color="green"
          icon="mdi-weather-cloudy"
          title="Weather"
          :value="weatherText"
          sub-icon="mdi-calendar"
          sub-text="oddur.is"
        />
      </v-flex>
      <v-flex lg6 md6 sm12>
        <material-stats-card
          color="info"
          icon="mdi-cash-multiple"
          title="Spending"
          :value="spending.daily"
          sub-icon="mdi-finance"
          :sub-text="spending.projection"
          @click="$router.push('purchase')"
        />
      </v-flex>
      <v-flex lg6 md6 sm12>
        <material-stats-card
          color="blue"
          icon="mdi-format-list-checks"
          title="Todo"
          :value="todo_items[0] ? todo_items[0].item : 'All done'"
          sub-icon="mdi-format-list-bulleted"
          :sub-text="todo_items.length"
          @click="$router.push('todo')"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import materialStatsCard from '~/components/material/AppStatsCard'

export default {
  components: {
    materialStatsCard
  },

  computed: {
    ...mapFields(['weather', 'spending', 'todo']),

    weatherText () {
      if (this.weather.length > 0) {
        const item = this.weather[this.weather.length - 1]
        return item.temperature + ' - ' + item.wind + 'm/s'
      }
      return ''
    },

    todo_items () {
      return this.todo.filter(x => !x.complete)
    }
  },

  mounted () {
    this.weatherData()
    setInterval(() => {
      this.weatherData()
    }, 1800000)

    this.spendingData()
    setInterval(() => {
      this.spendingData()
    }, 1800000)

    this.todoData()
    setInterval(() => {
      this.todoData()
    }, 1800000)
  },

  methods: {
    ...mapActions(['updateWeather', 'updateSpending', 'updateTodo']),

    weatherData () {
      this.$axios.get('/api/data').then((response) => {
        this.updateWeather(response.data)
      })
    },

    spendingData () {
      this.$axios.get('/api/spending').then((response) => {
        this.updateSpending(response.data)
      })
    },
    todoData () {
      this.$axios.get('/api/todo').then((response) => {
        this.updateTodo(response.data)
      })
    }
  }
}
</script>
