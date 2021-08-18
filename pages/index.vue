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
    this.$axios.get('http://192.168.31.16:3000/api/data').then((response) => {
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
