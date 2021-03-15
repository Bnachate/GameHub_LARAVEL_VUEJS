<template>
    <div>
        <template>
        <v-toolbar>
        <v-btn text to="/dashboard">Personnal information</v-btn>
        <v-btn text to="/password">Change password</v-btn>
        <v-divider
           class="mx-4"
           inset
           vertical
        ></v-divider>
        </v-toolbar>
        </template>
            <v-container style="margin: 45px auto 60px auto">
                <h2 style="margin-bottom: 45px" class="display-2">Personnal information</h2>
                <v-alert
                    color="error"
                    v-if="this.error"
                    icon="close"
                    v-on:click="close"
                >
                    {{message}}
                </v-alert>
                <v-alert
                    color="success"
                    v-if="this.success"
                    icon="close"
                    v-on:click="close"
                >
                    {{mess}}
                </v-alert>
                <form action="">
                    <v-layout>
                        <v-flex x4>
                            <strong>Payment address</strong>
                            <v-text-field v-model="updateUser.name" label="Name"></v-text-field>
                            <v-text-field v-model="updateUser.email" label="E-mail"></v-text-field>
                            <v-text-field v-model="updateUser.phone_number" :maxlength="max"  label="Phone"></v-text-field>
                            <v-text-field v-model="updateUser.adress_invoice" label="Address invoice"></v-text-field>
                            <v-text-field v-model="updateUser.post_code_invoice" label="Post code invoice"></v-text-field>
                            <v-text-field v-model="updateUser.city_invoice" label="City invoice"></v-text-field> 
                        </v-flex>
                        <v-flex x3></v-flex>
                        <v-flex x4>
                            <strong>Delivery address</strong>
                            <div>
                                <v-text-field v-model="updateUser.adress_delivery" label="Address delivery"></v-text-field>
                                <v-text-field v-model="updateUser.post_code_delivery" label="Post Code delivery"></v-text-field>
                                <v-text-field v-model="updateUser.city_delivery"  label="City delivery"></v-text-field>
                            </div>
                            <v-btn @click="verify" color="red" lager style="margin-top: 30px;">
                                <strong style="color:#FFFFFF;">Save information</strong>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-container>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            max: 10,
            error: false,
            success: false,
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
        "updateUsers",
        "getUser"
        ]),
        close() {
            this.error = false;
            this.success = false;
        },
        verify() {
           if(this.regex.test(this.updateUser.email) == false) {
               this.error = true
               return this.message = "Your email is not valid."
           } else {
               this.error = false
               this.success = true
               var item = {
                    id: this.updateUser.id,
                    name: this.updateUser.name,
                    email: this.updateUser.email,
                    adress_invoice: this.updateUser.adress_invoice,
                    phone_number: this.updateUser.phone_number,
                    post_code_invoice: this.updateUser.post_code_invoice,
                    city_invoice: this.updateUser.city_invoice,
                    adress_delivery: this.updateUser.adress_delivery,
                    post_code_delivery: this.updateUser.post_code_delivery,
                    city_delivery: this.updateUser.city_delivery
               }
               this.$store.dispatch('updaterecapUsers', item)
               localStorage.removeItem('userData')
               localStorage.setItem('userData', JSON.stringify(item))
               //this.updateUser = JSON.parse(localStorage.getItem('userData'))
               return this.mess = "Your information has been updated successfully."
           }
        }
    },
    created() {
         this.updateUser = JSON.parse(localStorage.getItem('userData'))
    }
}
</script>