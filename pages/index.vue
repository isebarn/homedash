<template>
  <v-container>
    {{ weather }}
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  mounted () {
    this.$axios.get('/api/data').then((response) => {
      this.updateWeather(response.data)
    })
  },

  computed: {
    ...mapFields(['weather'])
  },

  methods: {
    ...mapActions(['updateWeather'])
  }
}
</script>
