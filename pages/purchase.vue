<template>
  <v-container>
    <v-tabs
      v-model="tab"
      align-with-title
    >
      <v-tabs-slider color="yellow" />

      <v-tab>
        Quick
      </v-tab>
      <v-tab>
        Recent
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card v-for="item in favorites" :key="item._id">
          <v-flex lg6 md6 sm12 xs12>
            <material-stats-card
              v-if="!quick_item._id"
              color="green"
              icon="null"
              :title="item.Category"
              :value="item.Item"
              sub-icon="mdi-calendar"
              :sub-text="item.Source + ' - ' + item.Person"
              @click="quick_item=item"
            />
            <v-text-field
              v-else
              v-model="quick_item.Amount"
              name="Amount"
              label="Amount"
            />
          </v-flex>
        </v-card>
      </v-tab-item>
      <v-tab-item>
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
              <v-text-field v-model="amount" label="amount" type="tel" />
              <v-text-field v-model="description" label="description" />
              <v-card-actions>
                <v-btn color="green" block @click="send">
                  Send
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import materialStatsCard from '~/components/material/AppStatsCard'
export default {

  components: {
    materialStatsCard
  },

  data () {
    return {
      tab: 0,
      quick_item: { Amount: null },
      favorites: [],
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

  mounted () {
    this.$axios.get('/api/v1/purchase').then((response) => {
      console.log(response)
      this.favorites = response.data
    })
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
