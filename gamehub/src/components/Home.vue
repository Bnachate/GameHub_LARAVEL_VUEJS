<template>
  <v-container>
    <Carousel />
    <Searchbar @search="search" @disableSearch="disableSearch"/>
    <v-alert color="red" v-show="error" icon="close" v-on:click="error_close">
      please login to add your choice in the basket
    </v-alert>
    <!-----------------------------------CARD PRODUCTS --------------------------------------->
    <v-container class="d-flex flex-row flex-wrap justify-space-around">
      <v-flex id="filter" xs12 sm12 md3 xl2>
        <Filters @filter="filterProducts" @disable-filters="disableFilters" />
      </v-flex>
      <v-flex xs12 sm12 md9 xl10 class="flex-row justify-left">
        <v-row v-if="this.hasFiltered == false">
          <v-hover
            v-slot:default="{ hover }"
            v-for="product in this.$store.state.allProducts"
            :key="product.id"
          >
            <v-card
              class="mx-auto my-12"
              max-width="260"
              :elevation="hover ? 16 : 2"
            >
              <div>
                <v-img
                  @click="details(product.id)"
                  :src="product.images[0].url"
                  style="height:180"
                />
              </div>

              <div @click="details(product.id)">
                <v-img :src="product.images.url" style="height:250" />
              </div>

              <v-card-title style="font-size:24px;">{{
                product.name
              }}</v-card-title>

              <v-card-text style="font-size:16px;">
                <div>{{ substrDescription(product.description) }}</div>
              </v-card-text>
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

                  <div class="grey--text ml-4">
                    4.5 (413)
                  </div>
                </v-row>
              </v-card-text>
              <v-card-actions class="cart-action">
                <v-card-title style="color:red;font-size:22px;"
                  >{{ product.price }}€</v-card-title
                >
                <!-- ******************** -->
                <v-spacer></v-spacer>
                <!-- ******************** -->

                <v-btn
                  v-on:click="updateCart(product, 'add')"
                  v-if="$store.state.isLogin == true"
                  text
                  class="float-right"
                  style="margin-right: 10px;"
                >
                  <img
                    src="../assets/cart.png"
                    width="40"
                    height="auto"
                    alt="Add to cart"
                  />
                </v-btn>
                <v-btn
                  v-on:click="error_open"
                  v-if="$store.state.isLogin == false"
                  text
                  class="float-right"
                  style="margin-right: 10px;"
                >
                  <img
                    src="../assets/cart.png"
                    width="40"
                    height="auto"
                    alt="Add to cart"
                  />
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-row>
        <v-container v-if="this.hasFiltered">
          <v-row
            v-if="this.filteredProducts.length == 0 || this.noResultSearch == true"
            style="margin-bottom:400px"
          >
            <h3 class="mx-auto my-12">
              Sorry, we don't have products that match your filters. Please try
              again.
            </h3>
          </v-row>
          <v-row v-else>
            <!-----------------------------------FILTER CARDS --------------------------------------->
            <v-hover
             
              v-for="product in this.filteredProducts"
              :key="product.id"
            >
              <v-card
                class="mx-auto my-12 .d-none .d-sm-flex"
                max-width="260"
                :elevation="hover ? 16 : 2"
              >
                <div>
                  <v-img
                    @click="details(product.id)"
                    :src="product.images[0].url"
                    style="height:180px"
                  />
                </div>

                <v-card-title style="font-size:24px;">{{
                  product.name
                }}</v-card-title>

                <v-card-text style="font-size:16px;">
                  <div>{{ substrDescription(product.description) }}</div>
                </v-card-text>
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

                    <div class="grey--text ml-4">
                      4.5 (413)
                    </div>
                  </v-row>
                </v-card-text>
                <v-card-actions class="cart-action">
                  <v-card-title style="color:red;font-size:22px;"
                    >{{ product.price }}€</v-card-title
                  >
                  <v-spacer></v-spacer>
                  <v-btn
                    v-on:click="updateCart(product)"
                    text
                    class="float-right"
                    style="margin-right: 10px;"
                  >
                    <img
                      src="../assets/cart.png"
                      width="40"
                      height="auto"
                      alt="Add to cart"
                    />
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-row>
        </v-container>
      </v-flex>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Carousel from "@/components/Carousel";
import Searchbar from "@/components/Searchbar";
import Filters from "@/components/Filter";

export default {
  components: { Carousel, Filters, Searchbar },
  name: "Home",
  props: ["user", "admin", "isLogin"],
  data: () => ({
    error: false,
    hasFiltered: false,
    filteredProducts: [],
    carts: []
  }),

  methods: {
    ...mapActions([
      "fetchProducts",
      "fetchCategories",
      "fetchUsers",
      "getUser",
      "showUser",
      "updateCartUsers"
    ]),
    substrDescription(description) {
      if (description.length > 40) {
        return description.substr(0, 120) + "...";
      } else {
        return description;
      }
    },
    search(results) {
      this.hasFiltered = true;
      if (results.length == 0) {
          this.noResult = true;
          this.filteredProducts = []
      } else {
        this.filteredProducts = results
      }
    },
    disableSearch() {
      this.hasFiltered = false
      this.filteredProducts = []
    },
    filterProducts(data) {
      this.hasFiltered = true;
      var filters = Object.values(data);
      if ((filters[1] == -1, filters[2] == "")) {
        // Seulement le prix a été entré par l'utilisateur
        this.filteredProducts = this.$store.state.allProducts.filter(
          (product) =>
            product.price > data.range[0] && product.price < data.range[1]
        );
      } else if ((filters[1] == -1, filters[2] != "")) {
        // Seulement le prix et la categorie ont été entrés par l'utilisateur
        console.log(data);
        if (data.category == "Games Console") {
          var cat = 1;
        } else if (data.category == "Games") {
          cat = 2;
        } else {
          cat = 3;
        }
        this.filteredProducts = this.$store.state.allProducts.filter(
          (product) =>
            product.price > data.range[0] &&
            product.price < data.range[1] &&
            product.categories_id == cat
        );
        if (this.filteredProducts.length == 0) {
          this.noResult = true;
        }
      } else if ((filters[1] != -1, filters[2] == "")) {
        console.log(data);
        // Seulement le prix et le ratings ont été entrés par l'utilisateur
      } else {
        // Les trois filtres ont été entrés
        var cat_id;
        if (data.category == "Games console") {
          cat_id = 1;
        } else if (data.category == "Games") {
          cat_id = 2;
        } else {
          cat_id = 3;
        }
        this.filteredProducts = this.$store.state.allProducts.filter(
          (product) =>
            product.price > data.range[0] &&
            product.price < data.range[1] &&
            product.categories_id == cat_id
        );
      }
    },
    error_open() {
      this.error = true;
    },
    error_close() {
      this.error = false;
    },
    disableFilters() {
      this.hasFiltered = false;
    },

    details: function(index) {
      var Product = this.$store.state.allProducts.find(
        (product) => product.id == index
      );
      console.log(Product);
      localStorage.setItem("productShow", JSON.stringify(Product));
      this.$router.push({ name: "details" });
    },
    updateCart(product) {
      for (let i = 0; i < this.$store.state.allProducts.length; i++) {
        if (this.$store.state.allProducts[i].id === product.id) {
          if (this.$store.state.allProducts[i].quantity < 1) {
            this.$store.state.allProducts[i].quantity++;
            // Add product to cart
            this.$store.dispatch("getUser");
            if (this.$store.state.showUser.cart === null) {
              this.$store.state.showUser.cart = [];
              this.$store.state.showUser.cart.push(product);
console.log("product", product)
console.log(("showUser", this.$store.state.showUser))
              var item = {
                id: this.$store.state.showUser.id,
                name: this.$store.state.showUser.name,
                email: this.$store.state.showUser.email,
                password: this.$store.state.showUser.password,
                adress_invoice: this.$store.state.showUser.adress_invoice,
                admin: this.$store.state.showUser.admin,
                password_confirm: this.$store.state.showUser.password_confirm,
                phone_number: this.$store.state.showUser.phone_number,
                post_code_invoice: this.$store.state.showUser.post_code_invoice,
                city_invoice: this.$store.state.showUser.city_invoice,
                adress_delivery: this.$store.state.showUser.adress_delivery,
                post_code_delivery: this.$store.state.showUser.post_code_delivery,
                city_delivery: this.$store.state.showUser.city_delivery,
                cart: JSON.stringify(this.$store.state.showUser.cart),
              };
              this.$store.state.cart = item.cart.replace("/", "%2F");
              console.log('yolo', typeof item.cart);
              this.$store.dispatch("updateCartUsers", item);
            } else if (this.$store.state.showUser.cart != null) {
              this.$store.state.showUser.cart = JSON.parse(
                this.$store.state.showUser.cart
              );
              var deleteItem = false;
              this.$store.state.showUser.cart.forEach((item) => {
                if (item.id == product.id) {
                  deleteItem = true;
                }
              });
              if (deleteItem == true) {
                this.$store.state.showUser.cart = this.$store.state.showUser.cart.filter(
                  (prod) => prod.id != product.id
                );
                deleteItem = false;
              } else {
                this.$store.state.showUser.cart.push(product);
              }
              item = {
                id: this.$store.state.showUser.id,
                name: this.$store.state.showUser.name,
                email: this.$store.state.showUser.email,
                password: this.$store.state.showUser.password,
                adress_invoice: this.$store.state.showUser.adress_invoice,
                admin: this.$store.state.showUser.admin,
                password_confirm: this.$store.state.showUser.password_confirm,
                phone_number: this.$store.state.showUser.phone_number,
                post_code_invoice: this.$store.state.showUser.post_code_invoice,
                city_invoice: this.$store.state.showUser.city_invoice,
                adress_delivery: this.$store.state.showUser.adress_delivery,
                post_code_delivery: this.$store.state.showUser
                  .post_code_delivery,
                city_delivery: this.$store.state.showUser.city_delivery,
                cart: JSON.stringify(this.$store.state.showUser.cart),
              };
              this.$store.state.cart = item.cart;
              this.$store.dispatch("updateCartUsers", item);
            }
          } else if (this.$store.state.allProducts[i].quantity >= 1) {
            this.$store.state.allProducts[i].quantity--;
            // Remove product to cart
            this.$store.state.showUser.cart = JSON.parse(
              this.$store.state.showUser.cart
            );
            this.$store.state.showUser.cart = this.$store.state.showUser.cart.filter(
              (prod) => prod.id != product.id
            );
            item = {
              id: this.$store.state.showUser.id,
              name: this.$store.state.showUser.name,
              email: this.$store.state.showUser.email,
              password: this.$store.state.showUser.password,
              adress_invoice: this.$store.state.showUser.adress_invoice,
              admin: this.$store.state.showUser.admin,
              password_confirm: this.$store.state.showUser.password_confirm,
              phone_number: this.$store.state.showUser.phone_number,
              post_code_invoice: this.$store.state.showUser.post_code_invoice,
              city_invoice: this.$store.state.showUser.city_invoice,
              adress_delivery: this.$store.state.showUser.adress_delivery,
              post_code_delivery: this.$store.state.showUser.post_code_delivery,
              city_delivery: this.$store.state.showUser.city_delivery,
              cart: JSON.stringify(this.$store.state.showUser.cart),
            };
            this.$store.state.cart = item.cart;
            console.log("je suis un cart", this.$store.state.cart)
            this.$store.dispatch("updateCartUsers", item);
          }
          break;
        }
      }
    },
  },
  save() {
    console.log(this.carts);
    this.product.push(this.carts);
  },

  computed: {},
  created() {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchUsers();
  },
};
</script>

<style>
.cart-action {
  margin: 0 0 15px 0;
}
</style>
