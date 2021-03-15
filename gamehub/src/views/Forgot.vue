<template>
 <form @submit.prevent="handleSubmit">
     
     <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step"> 
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                          <h1 class="text-center display-1 red--text text--darken-3">Réinitialiser votre mot de passe</h1>
    <v-form>
        <v-text-field id="password" label="Mot de passe" name="Password" prepend-icon="lock" type="password" color="red darken-3" />
        <v-text-field id="password_confirm" label="Confirmez votre Mot de passe" name="Password_confirm" prepend-icon="lock" type="password" color="red darken-3" />
    </v-form>
    <div class="text-center mt-3">
    <v-btn rounded color="red darken-3" dark>Valider</v-btn>
    </div>
 </v-card-text>
                      
                      </v-col>
                      <v-col cols="12" md="4" class="black darken-3">
                          <v-card-text class="red--text mt-12">
                        <h1 class="text-center display-1">Gaming is Life</h1>
                        <h4 class="text-center">Vous avez oublié votre mot de passe GameHub !</h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined="" dark @click="step++">Se connecter</v-btn>
                      </div>
                    </v-col>
                    </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
 </form>
</template>
<script>

import axios from 'axios'
export default {
    name: 'Forgot',
    data() {
        return {
        password: '',
        password_confirm: ''
    }
    },
    methods: {
        async handleSubmit () {
            const response = await axios.post('forgot', {
                password: this.password,
                password_confirm: this.password_confirm,
                token: this.$route.params.token
            });

            console.log(response);
            this.$router.push('/Home');
        }
    }
}
</script>
