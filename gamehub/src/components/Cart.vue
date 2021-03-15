<template>
  <div>
  <v-container class="container">
    <template>
      <div class="cont-progress">
        <v-btn class="progress" disabled text><strong class="active">Cart</strong></v-btn>
        <v-btn class="progress disabled"  disabled text>Delivery Information</v-btn>
        <v-btn class="progress disabled"  disabled text>Payment</v-btn>
      </div>
    </template>
    <h2 class="display-2 mb-4">Cart</h2>
    <v-divider></v-divider>
    <v-list two-line class="cont-products">
      <v-container v-for="product in this.$store.getters.showCart" :key="product.id" style="margin:0">
        <v-card class="d-flex flex-row">
          <v-container style="margin:0;width:20%" class="align-self-center">
            <v-img :src="product.images[0].url" :alt="product.description" width="100" height="100"></v-img>
          </v-container>
          <v-container style="margin:0; width: 40%" class="align-self-center">
            <v-card-title>{{product.name}}</v-card-title>
            <v-card-text v-if="product.description.length > 60">{{product.description.substr(0, 60) + '...'}}</v-card-text>
            <v-card-text v-else>{{product.description}}</v-card-text>
          </v-container>
          <v-container style="margin:0; width: 30%" class="align-self-center">
            <v-row>
              <v-card-text style="text-align: left">{{"Stock available: " + product.stock}}</v-card-text>
            </v-row>
            <v-row>
              <v-col md6>
                <v-card-text>Quantity: 1</v-card-text>
              </v-col>
            </v-row>
          </v-container>
          <v-container style="margin:0; width: 20%" class="align-self-center">
            <v-row>
              <v-card-title color="primary" style="margin:0 auto 0 auto;">{{product.price + "€"}}</v-card-title>
            </v-row>
          </v-container>
          <v-container style="margin:0;width:10%" class="align-self-center">
            <v-card-actions>
              <v-btn>Delete</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-container>
    </v-list>
    <v-divider></v-divider>
    <v-container>
      <v-card>
        <v-card-title style="float:right">Total amount: {{this.total + "€"}}</v-card-title>
      </v-card>
    </v-container>
    <v-container>
      <v-btn color="primary" @click.prevent="go" class="button" larger style="float: right;">Continue to payment</v-btn>
    </v-container>
  </v-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
  export default {
    data: () => ({
      total: -1,
    }),
    computed: mapGetters(["showCart"]),
    methods: {
      go() {
        this.$router.push({ name: "Recap"})
      }
    },
    created() {
      var cart = JSON.parse(localStorage.getItem('cart'))
      cart.forEach(item => {
        this.total += parseInt(item.price)
      })
    }
  }
  
</script>

<style scoped>

.progress {
  width: 33.33%;
  height: 150px; 
  border-radius: 0px;
  background-color:#F44335;
  font-size: 18px;
}
.disabled {
  background-color:#e4e4e4
}

.active {
  color:white!important;
}

.cont-progress {
  margin: 60px 0 60px 0;
}

.container {
  margin: 50px auto 50px auto;
}

.button {
  height: 50px;
}

</style>