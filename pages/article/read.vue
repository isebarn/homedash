<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md12
      >
        <v-card>
          <v-card-title class="text-h5" v-text="title" />
          <v-card-subtitle><div v-dompurify-html="content" /></v-card-subtitle>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
// eslint-disable-next-line
import VueDOMPurifyHTML from 'vue-dompurify-html'
export default {
  components: {
    // eslint-disable-next-line
    VueDOMPurifyHTML
  },

  computed: {
    ...mapFields([
      'article.title',
      'article.content'
    ])
  }
}
</script>
