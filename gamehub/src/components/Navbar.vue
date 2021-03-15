<template>
  <v-app-bar d-flex app color="black" dark height="100">
    <div>
      <a href="/">
        <v-img alt="Vuetify Logo" class="shrink mr-2" height="150" width="150" src="../assets/new_logo-GH.png"
          transition="scale-transition" />
      </a>

    </div>

    <v-spacer></v-spacer>
    <div class="text-center">
      <v-btn href="/cart" text>
        <v-badge v-if="totalQuantity > 0" left color="red">
          <span slot="badge">{{totalQuantity}}</span>
          <v-icon class="mr-1 mb-3">mdi-cart</v-icon><span class=" mr-2" style="color: #FFFFFF">Cart</span>
        </v-badge>
      </v-btn>
      <v-btn disabled v-if="totalQuantity == 0" href="/cart" text>
        <v-icon class="mr-1 mb-3">mdi-cart</v-icon><span class=" mr-2" style="color: #FFFFFF">Cart</span>
      </v-btn>

    </div>

    <v-btn href="/login" target="_self" text v-if="this.$store.state.isLogin == false">
      <span class=" mr-2" style="color: #FFFFFF">Login</span>
    </v-btn>

    <!--test-->

    <v-menu offset-y v-model="message" v-if="this.$store.state.isLogin == true">

      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <strong>{{message}}</strong>
        </v-btn>
      </template>
      <v-list v-if="this.$store.state.admin == 1">

        <v-list-item-title>
          <v-btn href="/dashboard" target="_self" text v-if="this.$store.state.isLogin == true">
            <span class=" mr-2" style="color:red">Dashboard</span>
          </v-btn>
        </v-list-item-title>
        <v-list-item-title>
          <v-btn href="/admin-users" target="_self" text v-if="this.$store.state.admin == 1">
            <span class=" mr-2" style="color:red">Admin</span>
          </v-btn>
        </v-list-item-title>
        <v-list-item-title>
          <v-btn @click="logout" target="_self" text v-if="this.$store.state.isLogin == true">
            <span class=" mr-2" style="color:red">Logout</span>
          </v-btn>
        </v-list-item-title>


      </v-list>
      <v-list v-if="this.$store.state.admin == 0">

        <v-list-item-title>
          <v-btn href="/dashboard" target="_self" text v-if="this.$store.state.isLogin == true">
            <span class=" mr-2" style="color:red">Dashboard</span>
          </v-btn>
        </v-list-item-title>
        <v-list-item-title>
          <v-btn @click="logout" target="_self" text v-if="this.$store.state.isLogin == true">
            <span class=" mr-2" style="color:red">Logout</span>
          </v-btn>
        </v-list-item-title>
      </v-list>
    </v-menu>

    <!--test-->

  </v-app-bar>


</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  export default {
    name: 'Navbar',
    data: () => ({
      items: [{
          title: ''
        },
        {
          title: 'Admin'
        },
        {
          title: 'Dashb'
        },
        {
          title: 'Click Me 2'
        },
      ],
    }),
    methods: {
      ...mapActions([
        "fetchUsers",
        "showUsers",
        "deleteUsers",
        "addUsers",
        "updateCartUsers",
        "updaterecapUsers",
        "getUser"
      ]),
      logout() {
        /* this.$emit("logout") */
        localStorage.clear();
        this.$store.state.isLogin = false;
      }
    },
    computed: {
      ...mapGetters(["allUsers"]),
      totalQuantity() {
        this.$store.dispatch("getUser")
        return JSON.parse(this.$store.state.cart).length
      },
      message: {
        get() {
          return this.$store.state.showUser.name
        },
        set(data) {
          this.$store.commit('updateCartUsers', data)
        }
      }
    },
    created() {
      this.fetchUsers()
      this.$store.dispatch("getUser")
    }
  }
</script>