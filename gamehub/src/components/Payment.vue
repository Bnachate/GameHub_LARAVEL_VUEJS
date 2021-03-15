<template>
<v-container>
  <template>
    <div class="cont-progress">
      <v-btn class="progress disabled" disabled text>Cart</v-btn>
      <v-btn class="progress disabled"  disabled text>Delivery Information</v-btn>
      <v-btn class="progress" disabled text><strong class="active">Payment</strong></v-btn>
    </div>
  </template>
  <h2 class="display-2" style="margin-bottom:30px;">Payment</h2>
  <div class="wrapper">
    <v-card
    style="margin-top:30px"
 
>Name :<v-card-text class="d-flex justify-end " label="Name">{{$store.state.showUser.name}}</v-card-text></v-card>
<v-card
 
>Email<v-card-text class="d-flex justify-end " label="Email">{{$store.state.showUser.email}}</v-card-text></v-card>
<v-card

>Adress<v-card-text class="d-flex justify-end " label="Adress">{{$store.state.showUser.adress_delivery}}</v-card-text></v-card>
<v-card
 
>Post-Code<v-card-text class="d-flex justify-end " label="Post-Code">{{$store.state.showUser.post_code_delivery}}</v-card-text></v-card>
<v-card
  
>City<v-card-text class="d-flex justify-end " label="City">{{$store.state.showUser.city_delivery}}</v-card-text></v-card>

    <v-card
  
 
  d-flex
>
    <stripe-elements
    d-flex
      ref="elementsRef"
      :pk="publishableKey"
      :amount="amount"
      locale="en"
      @token="tokenCreated"
      @loading="loading = $event"
    >
    </stripe-elements>
    <v-btn
  color="red"
  elevation="2"
 @click="submit"><strong style="color:#FFFFFF">Pay {{this.total + "€"}}</strong></v-btn><br><br>
 <v-btn
  href="/recap"
  color="red"
  elevation="2"
 ><strong style="color:#FFFFFF">Change your informations</strong></v-btn>
  </v-card>
  </div>
  </v-container>
</template>
 
<script>
import {mapGetters} from 'vuex';
import { StripeElements } from 'vue-stripe-checkout';
export default {
  components: {
    StripeElements
  },
  data: () => ({
    total: -1,
    loading: false,
    amount: 1000,
    publishableKey: 'pk_test_51HwtoaHA7HA5X41Ddgmiz7rVSfUWDWUhnzFWwWZJRgK6nSyJycVxz4xZTt9Ca6sPNqY9FBMy9eUoB02t0Z1g7T6w00Ly82HUrZ', 
    token: null,
    charge: null
  }),
  computed: mapGetters(["showCart"]),
  methods: {
    submit () {
    
      this.$refs.elementsRef.submit()
      this.$router.push({ name: 'Thankyou' });
    },
    tokenCreated (token) {
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: this.description // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer () {
      // Send to charge to your backend server to be processed
      // Documentation here: https://stripe.com/docs/api/charges/create
  
    }
  },
  created(){
            
            var cart = JSON.parse(localStorage.getItem('cart'))
            console.log(cart)
             cart.forEach(item => {
             this.total += parseInt(item.price)
             })
  
  }
}
</script> 
<style>
.wrapper{
  width:600px;
  margin: 0 auto;
}
.button{
  height: 40px;
  padding: 0 14px
}

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