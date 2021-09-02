<template>
  <v-container>
    <v-text-field
      v-model="todo_item"
      outlined
      prepend-inner-icon="mdi-clipboard-text-outline"
      :append-icon="todo_item && !loading ? 'mdi-plus-circle-outline' : ''"
      @keydown.enter="send"
    >
      <template #append>
        <v-icon v-if="todo_item">
          mdi-plus-circle-outline
        </v-icon>
        <v-progress-circular
          v-else-if="loading"
          size="24"
          color="info"
          indeterminate
        />
      </template>
    </v-text-field>
    </v-text-field>
    <v-list>
      <v-list-item>
        <v-toolbar color="primary">
          <v-spacer />
          <v-btn text @click="complete_filter=false">
            TODO
          </v-btn>
          <v-btn text @click="complete_filter=true">
            Done
          </v-btn>
          <v-btn text @click="complete_filter=null">
            All
          </v-btn>
        </v-toolbar>
        </v-toolbar>
      </v-list-item>
      <draggable v-model="todo" @start="drag=true" @end="drag=false">
        <v-list-item v-for="item in todo" :key="item._id">
          <v-list-item-avatar>
            <v-icon v-if="item.complete" color="success" @click="set_complete(item)">
              mdi-check-all
            </v-icon>
            <v-icon v-else @click="set_complete(item)">
              mdi-check
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            {{ item.item }}
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="delete_item(item)">
              <v-icon color="red lighten-1">
                mdi-close-thick
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </draggable>
    </v-list>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {

  components: {
    draggable
  },

  data () {
    return {
      todo_item: null,
      loading: false,
      complete_filter: null
    }
  },

  computed: {
    todo: {
      get () {
        return this.$store.state.todo.filter(x =>
          this.complete_filter === null
            ? this.$store.state.todo
            : x.complete === this.complete_filter)
      },
      set (value) {
        const newList = []
        let counter = 0
        for (let i = 0; i < this.$store.state.todo.length; i++) {
          if (value.find(x => x === this.$store.state.todo[i])) {
            newList.push(value[counter])
            counter++
          } else {
            newList.push(this.$store.state.todo[i])
          }
        }
        // this.$store.commit('todo', newList)
        this.$axios.post('/api/todo/all', {
          items: newList
        })
        this.updateTodo(newList)
      }
    }
  },

  mounted () {
    this.$axios.get('/api/todo').then((response) => {
      this.updateTodo(response.data)
    })
  },

  methods: {
    ...mapActions(['updateTodo']),

    delete_item (item) {
      this.$axios.delete(`/api/todo/${item._id}`, {
      }).then((response) => {
        this.$axios.get('/api/todo').then((response) => {
          this.updateTodo(response.data)
        })
      })
    },

    set_complete (item) {
      this.$axios.patch('/api/todo', {
        query: { _id: item._id },
        set: { complete: !item.complete }
      }).then((response) => {
        this.$axios.get('/api/todo').then((response) => {
          this.updateTodo(response.data)
        })
      })
    },

    send () {
      if (this.todo_item === '') { return }
      this.loading = true
      this.$axios.post('/api/todo', {
        item: this.todo_item,
        complete: false
      }).then((response) => {
        this.$axios.get('/api/todo').then((response) => {
          this.updateTodo(response.data)
        })
      }).finally(() => {
        this.todo_item = null
        this.loading = false
      })
    }
  }
}
</script>
