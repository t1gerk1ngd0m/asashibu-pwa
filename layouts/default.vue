<template>
  <v-app light>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      :color="$vuetify.theme.themes.light.primary"
    >
      <v-spacer />
      <v-toolbar-title
        v-text="title"
        class="grey--text text--lighten-5"
      />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Morning Spot'
    }
  }
}
</script>
