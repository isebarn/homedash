<template>
  <v-container>
    <v-stepper
      v-model="step"
      vertical
    >
      <v-stepper-step
        :complete="step > 1"
        step="1"
      >
        Pick Category
      </v-stepper-step>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card
          class="mx-auto"
          flat
        >
          <v-list>
            <v-list-item-group
              v-model="category"
              color="indigo"
            >
              <v-list-item
                v-for="(item, i) in categories"
                :key="i"
                @click="step+=1"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-stepper-content>
      <v-stepper-step
        :complete="step > 2"
        step="2"
      >
        Person
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-card
          class="mx-auto"
          flat
        >
          <v-list>
            <v-list-item-group
              v-model="person"
              color="indigo"
            >
              <v-list-item
                v-for="(item, i) in persons"
                :key="i"
                @click="step+=1"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-stepper-content>
      <v-stepper-step
        :complete="step > 3"
        step="3"
      >
        Source
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-card
          class="mx-auto"
          flat
        >
          <v-list>
            <v-list-item-group
              v-model="source"
              color="indigo"
            >
              <v-list-item
                v-for="(item, i) in sources"
                :key="i"
                @click="step+=1"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-stepper-content>
      <v-stepper-step
        :complete="step > 4"
        step="4"
      >
        Amount
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-card
          class="mx-auto"
          flat
        >
          <v-text-field v-model="amount" label="amount" />
          <v-text-field v-model="description" label="description" />
          <v-card-actions>
            <v-btn color="green" block @click="send">
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>

export default {

  data () {
    return {
      step: 1,
      categories: [
        'Groceries',
        'Fun food',
        'Transport',
        'Partying',
        'Home',
        'Recreation',
        'Bowie',
        'Clothes',
        'Subscriptions',
        'Health & beauty',
        'Tryggingar',
        'Bank charges',
        'Miscellaneous'
      ],
      category: null,
      persons: [
        'Rakel',
        'Davíð',
        'Samó'
      ],
      person: null,
      sources: [
        'Rakel cc',
        'Davíð cc'
      ],
      source: null,
      amount: null,
      description: ''
    }
  },

  methods: {
    send () {
      this.$axios.post('/api/spending/purchase', {
        Date: new Date().toISOString().slice(0, 10),
        Item: this.description,
        Amount: this.amount,
        Category: this.categories[this.category],
        Person: this.persons[this.person],
        Source: this.sources[this.source]
      }).then((response) => {
        this.$router.push('/')
      })
    }
  }
}
</script>
