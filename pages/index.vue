<template>
  <v-container>
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
    ...mapFields(['weather']),

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
    setInterval(() => {
      this.weatherData()
    }, 1800000)
  },

  methods: {
    ...mapActions(['updateWeather']),

    weatherData () {
      this.$axios.get('/api/data').then((response) => {
        this.updateWeather(response.data)
      })
    }
  }
}
</script>
