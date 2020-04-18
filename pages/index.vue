<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card
        light
        class="mt-3"
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :href="restaurant.external_link"
        target="_blank"
      >
        <v-container class="pa-0">
          <v-layout
            wrap
          >
            <v-flex xs6 sm6 md6>
              <v-img
                :src="restaurant.image"
                height="100%"
              ></v-img>
            </v-flex>
            <v-flex xs6 sm6 md6
              class="pa-1"
            >
              <v-card-title class="pa-0">
                {{ restaurant.name }}
              </v-card-title>
              <v-card-text class="pa-0">
                <v-layout wrap>
                  <v-flex xs5 sm5 md5>
                    <v-chip color="#E3F2FD" x-small>最寄駅</v-chip>
                  </v-flex>
                  <v-flex xs6 sm6 md6>{{ restaurant.nearest_station }}</v-flex>
                  <v-flex xs5 sm5 md5>
                    <v-chip color="#E3F2FD" x-small>開店時間</v-chip>
                  </v-flex>
                  <v-flex xs6 sm6 md6>{{ timeFormat(restaurant.opening_hours) }}</v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-chip color="#F0F4C3" x-small>タグ</v-chip>
                    <v-chip color="#F0F4C3" x-small>駅近い</v-chip>
                    <v-chip color="#F0F4C3" x-small>駅近い</v-chip>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },

  data: () => ({
    restaurants: [],
    apiUrl: process.env.API_URL
  }),

  created () {
    this.fetchRestaurants()
    console.log(process.env.API_URL)
  },

  methods: {
    async fetchRestaurants () {
      try {
        const res = await this.$axios.get(`${this.apiUrl}/api/v1/restaurants`)
        this.restaurants = res.data
      } catch(e) {
        console.log(e)
      }
    },

    timeFormat (time) {
      let date = new Date(time)
      let hours = date.getHours() - 9
      let minutes = date.getMinutes()
      if (hours<10) { hours = '0' + hours}
      if (minutes<10) { minutes = '0' + minutes}
      return `${hours}:${minutes}`
    }
  }
}
</script>
