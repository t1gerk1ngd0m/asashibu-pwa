<template>
  <div>
    <v-form>
      <v-text-field
        v-model="externalLink"
        :rules="uriRules"
        label="食べログURL"
        required
      ></v-text-field>
    </v-form>
    <v-btn
      @click="submit()"
      color="#42A5F5"
    >URLを送信する</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    externalLink: '',
    uriRules: [
      value => !!value || '食べログURLは必須です',
      value => /^https:\/\/tabelog.com\/(.*)/.test(value) || '食べログURLを記入してください',
    ]
  }),

  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        try {
          let payload = { restaurant: { external_url: this.externalLink } }
          let res = await this.$axios.post(`/api/v1/restaurants`, payload)
        } catch(e) {
          console.log(e)
        }
      }
    }
  }
}
</script>
