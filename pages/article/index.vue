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
        <v-card @click="edit(null)">
          <v-card-title class="text-h5">
            New
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex
        v-for="article in articles"
        :key="article._id"
        md12
      >
        <v-card>
          <v-card-subtitle style="float:right">
            {{ article._id | objectidDate | date }}
          </v-card-subtitle>
          <v-card-title class="text-h5" v-text="article.title" />
          <v-card-subtitle><div v-dompurify-html="article.content" class="three-lines" /></v-card-subtitle>
          <v-card-actions>
            <v-btn text color="green" @click="read(article)">
              Read
            </v-btn>
            <v-btn text color="green" @click="edit(article)">
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
// eslint-disable-next-line
import VueDOMPurifyHTML from 'vue-dompurify-html'
export default {

  components: {
    // eslint-disable-next-line
    VueDOMPurifyHTML
  },

  data () {
    return {
      articles: []
    }
  },

  mounted () {
    this.$axios.get('/api/article').then((response) => {
      this.articles = response.data.reverse()
    })
  },

  methods: {
    ...mapActions(['setArticle']),

    edit (article) {
      this.setArticle(article)
      this.$router.push('edit')
    },

    read (article) {
      this.setArticle(article)
      this.$router.push('read')
    }
  }
}
</script>
<style>
.three-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: normal;
}

</style>
