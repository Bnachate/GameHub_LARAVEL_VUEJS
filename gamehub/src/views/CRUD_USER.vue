<template>
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
                      <h1 class="text-center display-2 red--text text--darken-3">Login</h1>
                        <v-alert
                          color="success"
                          v-bind:value="success"
                          icon="close"
                          v-on:click="close"
                          style="color:#FFFFFF"
                          >
                          {{mess}}
                          </v-alert>
                        <div class="text-center mt-4">
                          
                          <v-alert
                          color="error"
                           v-if="error"
                          icon="close"
                          v-on:click="close"
                          >
                          {{mess}}
                          </v-alert>
                          <v-btn class="mx-2" fab color="red" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="red" outlined>
                            <v-icon>fab fa-instagram</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="red" outlined>
                            <v-icon>fab fa-twitter</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mlt-4"></h4>
                        <v-form>
                          <v-text-field label="Email" name="Email" prepend-icon="email" type="text" color="red darken-3" v-model="logUser.email" />
                          <v-text-field id="password" label="password" name="Password" prepend-icon="lock" type="password" color="red darken-3" v-model="logUser.password" />
                        </v-form>
                        <p class=" forgot-password text-center display-0">
                          <router-link to="forgot">Forgot Password ?</router-link>
                        </p>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn @click="login" rounded color="red darken-3" dark>Submit</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="black darken-3">
                      <v-card-text class="red--text mt-12">
                        <h1 class="text-center display-1">Gaming is Life</h1>
                        <h4 class="text-center">Please enter your personal information and start the adventure with GameHub</h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined="" dark @click="step++">Registration</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                    <v-row class="fill-height">
                      <v-col cols="12" md="4" class="black darken-3">
                        <v-card-text class="red--text mt-12">
                          <h1 class="text-center display-1">Hello !</h1>
                          <h3 class="text-center">Already a member ?</h3>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn rounded outlined dark @click="step--">Login</v-btn>
                        </div>
                      </v-col>
                      <v-col cols="12" md="8">
                        <v-card-text class="mt-12">
                          <h1 class="text-center display-2 red--text text--darken-3">Registration</h1>
                          <v-alert
                          color="error"
                          v-if="error"
                          icon="close"
                          v-on:click="close"
                          >
                          {{message}}
                          </v-alert>
                          <div class="text-center mt-4">
                            <v-btn class="mx-2" fab color="red darken-3" outlined>
                              <v-icon>fab fa-facebook-f</v-icon>
                            </v-btn>
                          <v-btn class="mx-2" fab color="red darken-3" outlined>
                            <v-icon>fab fa-instagram</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="red" outlined>
                            <v-icon>fab fa-twitter</v-icon>
                          </v-btn>
                          </div>
                          <h4 class="text-center mt-4">Please complete your personal information to register</h4>
                          <v-form>
                            <v-text-field v-model="newUser.name" label="User Name" name="Name" prepend-icon="person" type="text" color="red darken-3" />
                            <v-text-field v-model="newUser.email" label="Email" name="Email" prepend-icon="email" type="text" color="red darken-3" />
                            <v-text-field v-model="newUser.password" label="Password" name="Password" prepend-icon="lock" type="password" color="red darken-3" />
                            <v-text-field v-model="newUser.password_confirm" label="Password confirmation" name="Password_confirm" prepend-icon="lock" type="password" color="red darken-3" />
                          </v-form>
                        </v-card-text>
                        <div class="text-center mt-3">
                        <v-btn @click="verify" rounded color="red darken-3" dark>Submit</v-btn>
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
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const bcrypt = require('bcrypt-nodejs');
export default {
  name: "Api",
  methods: {
    ...mapActions([
      "fetchUsers",
      "fetchCategories",
      "deleteUsers",
      "addUsers",
      "updateUsers",
      "fetchImages",
      "addImages",
      "setCookie",
      "getCookie"
    ]),
    
    close() {
      this.error = false;
      this.success = false;
    },
    verify() {
      if(this.newUser.name == '' || this.newUser.name.length < 2){
          this.error = true;
          return this.message = 'The username you enter is incorrect. Username must have minimum length of 8 characters'
      }
      else if(this.regex.test(this.newUser.email) == false){
          this.error = true;
         return this.message = 'Your email is incorrect.'
      }
      else if(this.newUser.password != this.newUser.password_confirm){
          this.error = true;
          return this.message = 'Your password doesn’t match the confirmation.'
      }
      else {
        this.addUsers(this.newUser)
        this.error = false;
        this.success = true;
        this.step = "0"
        return this.mess = "Your account has been created. Please login :)"
      }
    },
    login() {
      var exist = false
      if(this.regex.test(this.logUser.email) == false){
        this.error = true;
        return this.mess = 'Your email is incorrect.'
      } 
      else {
        this.$store.state.allUsers.forEach(user => {
          if(user.email === this.logUser.email) {
            
            exist = true
            
            if(bcrypt.compareSync(this.logUser.password, user.password) == false) {
              
              this.error = true;
              return this.mess = 'You enter a wrong password. Please try again.'
            } else {
                this.$store.dispatch("setCookie", {
                user: user
              })
              console.log(user)
              localStorage.setItem('user_email', user.email)
              localStorage.setItem('admin', user.admin)
              localStorage.setItem('name', user.name)
              this.getCookie("name")
              localStorage.setItem('userData', JSON.stringify(user))
              this.getCookie("user_email")
              this.getCookie("admin")
              this.getCookie("userData")
              this.$router.push('/')
            }
          } 
        })
      }
    if (exist == false) {
      this.error = true;
      return this.mess = 'Sorry we didn\'t found your credentials in our database.'
    }
  },
},

  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
        password_confirm: ""
      },
      logUser: {
        email:"",
        password: ""
      },
      error: false,
      success: false,
      mess: '',
      message: '',
      step: 1,
      regex: RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
    };
  },
  
  computed: mapGetters(["allUsers", "allCategories", "allImages"]),
  created() {
    this.fetchUsers();
    this.fetchCategories();
    this.fetchImages();
    
  },
};
</script>


