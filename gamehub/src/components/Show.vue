<template>
  <v-container>
    <v-layout class="main justify-center" row wrap >
      <v-flex xs12 sm4 md5 ml-5>
        <v-carousel hide-delimiters>
          <v-carousel-item v-for="image in this.product.images" :key="image.id">
            <v-img :src="image.url" style="width:max;height:500px" />
          </v-carousel-item>
        </v-carousel>
      </v-flex>

      <v-flex xs12 sm4 md5 mb-5>
        <v-card style="height:500px">
          <v-row>
            <v-card-title>
             
              <span style="font-size:40px">{{ this.product.name }}</span>
              
            </v-card-title>
          </v-row>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              

              <div class="grey--text ml-4"></div>
            </v-row>

            <v-divider class="mx-4"></v-divider>
            <div></div>

            <div class="my-4 subtitle-1">
              Stock diponible : {{ this.product.stock }}
            </div>

            <p>
              {{ this.product.description }}
            </p>

            <v-row>
              <v-card-title style="color:blue;font-size:30px;"
                >{{ this.product.price }}€</v-card-title
              >

              <v-btn text class="float-right" style="margin-right: px;">
                <img
                  src="../assets/cart.png"
                  width="40"
                  height="auto"
                  alt="Add to cart"
                />
              </v-btn>
            </v-row>
          </v-card-text>

          <!-- <v-card-text>
            <ul v-for="notes in this.$store.state.allComments" :key="notes.id">
                <li>{{notes}}</li>
            </ul>
          </v-card-text> -->

          <v-card-actions>
            <v-btn to="/">Accueil</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-flex id="comment" xs12 sm12 md12 xl12>
      <Comment />
    </v-flex>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Comment from "@/components/Comment";

export default {
  components: { Comment },
  name: "Show",
  data() {
    return {
      router: "",
      product: {}, //objet vide
      listNotes: [],
      idProduct: this.$route.params.id,
    };
  },

  methods: {
    ...mapActions([
      "fetchProducts",
      "fetchCategories",
      "showProducts",
      "removeImages",
    ]),

    Moyenne() {},
    // moyenneNote(array){

    //   array.forEach()
    // <v-for="notes in this.$store.state.allComments":key="notes.id">,

    // },
  },

  computed: mapGetters(["product"]),

  created() {
    this.product = JSON.parse(localStorage.getItem("productShow"));
  },
};
</script>

<style scoped>
.main {
  margin-top: 1%;
}

.description {
  margin-top: 2%;
  font-size: 30px;
  font: "Fira Sans", serif;
}

.titre {
  font-size: 50px;
}
</style>
