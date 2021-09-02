<template>
  <v-container>
    <v-flex md12>
      <v-text-field
        v-model="title"
        label="Title"
      />
    </v-flex>
    <v-flex md12>
      <tiptap-vuetify
        v-model="content"
        :extensions="extensions"
        :toolbar-attributes="{ color: 'blue' }"
      />
    </v-flex>
    <v-btn block @click="save">
      Save
    </v-btn>
  </v-container>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
import { mapFields } from 'vuex-map-fields'
import sanitizeHtml from 'sanitize-html'

export default {
  components: {
    TiptapVuetify
  },

  data () {
    return {
      loading: false,
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
          options: {
            levels: [1, 2, 3]
          }
        }],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ]
    }
  },

  computed: {
    ...mapFields([
      'article._id',
      'article.title',
      'article.content'
    ])
  },

  mounted () {
    setInterval(() => {
      this.save()
    }, 30000)
  },

  methods: {
    save () {
      if (this.title === '') { return }
      this.loading = true

      if (this._id) {
        this.$axios.patch('/api/article', {
          query: { _id: this._id },
          set: {
            title: this.title,
            content: sanitizeHtml(this.content)
          }
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.$axios.post('/api/article', {
          title: this.title,
          content: this.content
        }).then((response) => {
          this._id = response.data.insertedId
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>
<style>
.v-tooltip__content {
  background: black !important;
  color: white !important;
}
</style>
