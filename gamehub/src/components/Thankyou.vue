<template>
  <v-card
    class="mx-auto"
    max-width="1000"
  >
    <v-img
      src="https://media4.giphy.com/media/13qctMBrrgbwJi/source.gif"
      height="700px"
      width="1000"
    ></v-img>

    <v-card-title>
     Payment confirmed !
    </v-card-title>
    <v-card-title>
     GAME<span style="color:red">HUB</span> {{'\xa0'}}Thanks you {{'\xa0'}}<strong style="color:red">{{$store.state.showUser.name}}</strong>{{'\xa0'}}for your recent purchase !
    </v-card-title>

    <v-card-title>
    If you want to continue the adventure together Please click on "Homepage" button ! : )
    </v-card-title>

     
   
    <v-card class="">
      <v-btn
      href="/"
        color="red"
        text
        
      >
       <strong>Homepage</strong>
      </v-btn>

      <v-spacer></v-spacer>

      
    </v-card>

    
  </v-card>
</template>
<script>
  export default {
    data: () => ({
     
    }),
    created(){
            this.fetchUsers()
            this.$store.dispatch("getUser")
        }
  }
</script>