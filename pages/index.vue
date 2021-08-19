<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex xs6 m3>
        <material-stats-card
          color="green"
          icon="mdi-weather-cloudy"
          title="Weather"
          :value="weatherText"
          sub-icon="mdi-calendar"
          sub-text="oddur.is"
        />
      </v-flex>
      <v-flex xs6 m3>
        <material-stats-card
          color="info"
          icon="mdi-cash-multiple"
          title="Spending"
          :value="spending.daily"
          sub-icon="mdi-finance"
          :sub-text="spending.projection"
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
    ...mapFields(['weather', 'spending']),

    weatherText () {
      if (this.weather.length > 0) {
        const item = this.weather[this.weather.length - 1]
        return item.temperature + ' - ' + item.wind + 'm/s'
      }
      return ''
    }
  },

  mounted () {
    this.weatherData()
    this.spendingData()
    setInterval(() => {
      this.weatherData()
    }, 1800000)
  },

  methods: {
    ...mapActions(['updateWeather', 'updateSpending']),

    weatherData () {
      this.$axios.get('/api/data').then((response) => {
        this.updateWeather(response.data)
      })
    },

    spendingData () {
      this.$axios.get('/api/spending').then((response) => {
        this.updateSpending(response.data)
      })
    }
  }
}
</script>
