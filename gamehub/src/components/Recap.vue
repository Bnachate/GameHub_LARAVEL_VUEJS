<template>
    <v-container>
        <template>
            <div class="cont-progress">
                <v-btn class="progress disabled" disabled text>Cart</v-btn>
                <v-btn class="progress"  disabled text><strong class="active">Delivery Information</strong></v-btn>
                <v-btn class="progress disabled"  disabled text>Payment</v-btn>
            </div>
        </template>
        <h2 class="display-2" style="margin-bottom:30px;">Delivery Information</h2>
            <v-alert
                color="error"
                v-if="error"
                icon="close"
                v-on:click="close"
            >
                {{message}}
            </v-alert>
        <form action="">
            <v-layout>
                <v-flex x5>
                    <strong>Delivery address</strong>
                    <v-text-field v-model="updateUser.name" label="Name"></v-text-field>
                    <v-text-field v-model="updateUser.email" label="E-mail"></v-text-field>
                    <v-text-field :maxlength="max" v-model="updateUser.phone_number" label="Phone"></v-text-field>
                    <v-text-field v-model="updateUser.adress_delivery" label="Address"></v-text-field>
                    <v-text-field v-model="updateUser.post_code_delivery" label="Post code"></v-text-field>
                    <v-text-field v-model="updateUser.city_delivery" label="City"></v-text-field>
            
                </v-flex>
                <v-flex x2></v-flex>
                <v-flex x5>
                    <strong>Payment address</strong>
                    <div>
                        <v-text-field v-model="updateUser.adress_invoice" required label="Address invoice"></v-text-field>
                        <v-text-field v-model="updateUser.post_code_invoice" required label="Post Code invoice"></v-text-field>
                        <v-text-field v-model="updateUser.city_invoice" required label="City invoice"></v-text-field>
                    </div>
                    
                </v-flex>
            </v-layout>
        </form>

        <v-btn @click="verify" color="red" lager style="float: right;">
            <strong style="color:#FFFFFF">Continue to Payment</strong>
        </v-btn>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
    export default {
        name: "Recap",
        data () {
            return {
                max: 10,
                error: false,
                success: false,
                message: '',
                step: 1,
                regex: RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"),
                updateUser: {}
            }
                },
       
        methods: {
    ...mapActions([
      "fetchUsers",
      "showUsers",
      "deleteUsers",
      "addUsers",
      "updaterecapUsers",
      "getUser"
    ]),
     verify() {
      
     if(this.updateUser.name == '' || this.updateUser.name.length < 2){
          this.error = true;
          return this.message = 'The username you enter is incorrect. Username must have minimum length of 8 characters'
      }
      else if(this.regex.test(this.updateUser.email) == false){
          this.error = true;
         return this.message = 'Your email is incorrect.'
      }
      else if(this.updateUser.phone_number == '' || this.updateUser.phone_number == null){
          this.error = true;
          return this.message = 'you Phone Number is empty or invalid. Warning that must be numbers'
      }
      else if(this.updateUser.adress_delivery == '' || this.updateUser.adress_delivery == null){
          this.error = true;
          return this.message = 'you Adress is empty or invalid.'
      }
       else if(this.updateUser.post_code_delivery == '' || this.updateUser.post_code_delivery == null){
          this.error = true;
          return this.message = 'you postal code is empty or invalid. Warning that must be numbers'
      }
       else if(this.updateUser.city_delivery == '' || this.updateUser.city_delivery == null ){
          this.error = true;
          return this.message = 'your city is empty or invalid.'
      }
      else if(this.updateUser.adress_invoice == '' || this.updateUser.adress_invoice == null){
          this.error = true;
         return this.message = 'Your Address Invoice is incorrect.'
      }
      else if(this.updateUser.post_code_invoice == '' || this.updateUser.post_code_invoice == null){
          this.error = true;
          return this.message = 'you Postal Code Invoice is empty or invalid. Warning that must be numbers'
      }
      else if(this.updateUser.city_invoice == ''|| this.updateUser.city_invoice== null){
          this.error = true;
          return this.message = 'your City Invoice is empty or invalid.'
      }
     
     else {
        this.$store.dispatch('updaterecapUsers', this.updateUser) 
        localStorage.setItem('userData', JSON.stringify(this.updateUser))
        this.error = false;
        this.success = true;
        this.step = "0"
        this.$router.push({ name: 'Payment' })
        
      }
       
    },
    /* verify() {
        console.log(this.updateUser)
        this.$store.dispatch('updaterecapUsers', this.updateUser) 
        
    }, */
    
    close() {
      this.error = false;
      this.success = false;
    },
},
        created(){
            this.updateUser = JSON.parse(localStorage.getItem('userData'))
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