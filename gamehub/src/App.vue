<template>
  <v-app>
    <Navbar @logout="logout"/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: {
    Navbar,
    Footer,
  },

  created() {
    this.$store.dispatch("getCookie", "user_email")
    this.$store.dispatch("getCookie", "admin")
  },

   methods: {
    logout() {
      this.$store.state.user = ''
      this.$store.state.admin = -1
      this.$store.state.isLogin = false
      this.$store.state.cart = "[]"
      localStorage.removeItem('user_email')
      localStorage.removeItem('admin')
      localStorage.removeItem('name')
      localStorage.removeItem('userData')
    }
    },
    computed: {
    message: {
    get () {
      return this.$store.state.showUser.name
    }
      }
  }
  
};
</script>
