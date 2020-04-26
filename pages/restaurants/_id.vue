<template>
  <div>
    <v-img
      :src="restaurant.image"
      aspect-ratio="1.7778"
    ></v-img>
    <v-layout justify-center class="mt-4 mb-4">
      <h3>{{ restaurant.name }}</h3>
    </v-layout>
    <v-layout
      column
      justify-center
    >
      <v-flex
        xs12
        sm12
        md12
      >
        <dl class="d-inline-block">
          <dt class="d-inline-block"><v-chip color="#E3F2FD" x-small>最寄駅</v-chip></dt>
          <dd class="d-inline-block">{{ restaurant.nearest_station }}</dd>
        </dl>
        <dl class="d-inline-block">
          <dt class="d-inline-block"><v-chip color="#E3F2FD" x-small>開店時間</v-chip></dt>
          <dd class="d-inline-block">{{ timeFormat(restaurant.opening_hours) }}</dd>
        </dl>
      </v-flex>
      <v-flex
        xs12
        sm12
        md12
      >
        <v-chip color="#FFF9C4" x-small>駅から近い</v-chip>
        <v-chip color="#FFF9C4" x-small>天井が高い</v-chip>
        <v-chip color="#FFF9C4" x-small>パンブュッフェあり</v-chip>
        <v-chip color="#FFF9C4" x-small>コーヒー美味しい</v-chip>
      </v-flex>
    </v-layout>
    <v-layout
      justify-center
      class="mt-4"
    >
      <v-btn
        color="#69F0AE"
        :href="restaurant.external_link"
      >最新の情報は食べログへ</v-btn>
    </v-layout>
    <v-layout
      justify-center
      class="mt-4"
    >
      <p>このお店での活動履歴</p>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    restaurantId: '',
  }),

  computed: {
    restaurant () {
      return this.$store.getters.restaurant
    }
  },

  created () {
    this.restaurantId = this.$route.params.id
    this.fetchRestaurant()
  },

  methods: {
    async fetchRestaurant () {
      try {
        this.$store.dispatch('fetchRestaurant', this.restaurantId)
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
