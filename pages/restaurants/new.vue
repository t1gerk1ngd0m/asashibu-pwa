<template>
  <div>
    <v-form>
      <v-text-field
        v-model="name"
        label="店舗名"
        required
      ></v-text-field>
      <v-text-field
        v-model="station"
        label="最寄駅"
        required
      ></v-text-field>
      <v-text-field
        v-model="externalLink"
        :rules="uriRules"
        label="食べログURL"
        required
      ></v-text-field>
      <!-- <v-file-input
        v-model="inputImages"
        multiple
        label="店舗画像"
        accept="image/*"
        prepend-icon="mdi-camera"
      ></v-file-input> -->
      <v-file-input
        v-model="uploadImage"
        ref="file"
        label="店舗画像"
        accept="image/*"
        prepend-icon="mdi-camera"
      ></v-file-input>
      <!-- <v-img
        :src="image"
        aspect-ratio="1.7778"
        height="100%"
      ></v-img> -->
      <!-- <v-btn
        flat
        icon
        @click="pickImage"
      >
        <v-icon class="primary--text">add_a_photo</v-icon>
      </v-btn>
      <input
        type="file"
        style="display: none;"
        ref="image"
        v-on:change="onFileChange" mulitple="multiple"
      > -->
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            v-model="openingHours"
            label="開店時間"
            required
          ></v-text-field>
        </template>
        <v-time-picker
          v-model="openingHours"
          :allowed-hours="allowedHours"
          :allowed-minutes="allowedMinutes"
        ></v-time-picker>
      </v-menu>
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            v-model="closingHours"
            label="閉店時間"
            required
          ></v-text-field>
        </template>
        <v-time-picker
          v-model="closingHours"
          :allowed-minutes="allowedMinutes"
        ></v-time-picker>
      </v-menu>
    </v-form>
    <v-row justify="center">
      <v-btn
        @click="submit()"
        color="#42A5F5"
      >店舗情報を送信する</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: '',
    station: '',
    externalLink: '',
    inputImages: [],
    uploadImage: {},
    uriRules: [
      value => !!value || '食べログURLは必須です',
      value => /^https:\/\/tabelog.com\/(.*)/.test(value) || '食べログURLを記入してください',
    ],
    openingHours: '07:30',
    closingHours: '22:00',
    allowedHours: v => v >= 5 && v <=12,
    allowedMinutes: v => v % 15 === 0,
  }),

  watch: {
    image () {
      console.log(this.image)
    }
  },

  methods: {
    async submit () {
      try {
        let headers = { 'Content-Type': 'application/json' }
        let formData = new FormData()
        formData.append("restaurant[name]", this.name)
        formData.append("restaurant[external_link]", this.externalLink)
        formData.append("restaurant[opening_hours]", this.openingHours)
        formData.append("restaurant[closing_hours]", this.closingHours)
        formData.append("restaurant[nearest_station]", this.station)
        formData.append("restaurant[image]", this.uploadImage)
        let res = await this.$axios.post(`/api/v1/restaurants`, formData, headers)
        if (res.status === 200) {
          window.location = '/'
        }
      } catch(e) {
        console.log(e)
      }
    },
  }
}
</script>
