<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
    </v-row>

    <div>
      <form>
        <input type="text" v-model="newproduct.name" placeholder="name" />
        <input
          type="text"
          v-model="newproduct.description"
          placeholder="description"
        />
        <input type="integer" v-model="newproduct.price" placeholder="prix" />
        <input type="integer" v-model="newproduct.stock" placeholder="stock" />
        <input
          type="integer"
          v-model="newproduct.categories_id"
          placeholder="categorie_ID"
        />

        <v-btn v-on:click="addProducts(newproduct)">Add</v-btn>
      </form>
    </div>
    ****************************IMAGE FORM**********************************************-

    <div>
      <form>
        <input type="text" v-model="newimage.url" placeholder="url" />
        <input
          type="text"
          v-model="newimage.product_id"
          placeholder="product_id"
        />

        <v-btn v-on:click="addImages(newimage)">Add</v-btn>
      </form>
    </div>

    *************************IMAGE DISPLAY**********************************************
    <ul>
      <ol v-for="(image, i) in this.$store.state.allImages" :key="i">
        <p><b>ID:</b>{{ image.id }}</p>
        <p><b>PRODUCT_ID:</b>{{ image.product_id }}</p>
        <p><b>URL:</b>{{ image.url }}</p>
            <v-btn small color="primary" v-on:click="deleteImages(image.id)"
          >supprimer</v-btn>

        <br />
        <br />
        <hr />
      </ol>
    </ul>
    *************************PRODUIT**********************************************

    <ul>
      <ol v-for="(product, i) in this.$store.state.allProducts" :key="i">
        <p><b>ID:</b>{{ product.id }}</p>
        <p><b>NAME:</b>{{ product.name }}</p>
        <v-input v-model="product.name">{{ product.name }}</v-input>

        <p><b>DESCRIPTION:</b> {{ product.description }}</p>
        <p><b>PRIX:</b>{{ product.price }}</p>
        <p><b>STOCK:</b>{{ product.stock }}</p>
        <p><b>CATEGORIE:</b>{{ product.categories_id }}</p>
        <p><b>DATE CREATION:</b>{{ product.created_at }}</p>
        <p><b>DATE PRODUCTION:</b>{{ product.updated_at }}</p>

        <v-btn small color="primary" v-on:click="deleteProducts(product.id)"
          >supprimer</v-btn
        >
        <br />
        <br />
        <hr />
      </ol>
    </ul>
    *************************CATEGORIE*****************************************************

    <ul>
      <ol v-for="(categorie, i) in this.$store.state.allCategories" :key="i">
        <p><b>ID: </b>{{ categorie.id }}</p>
        <p><b>NAME: </b>{{ categorie.name }}</p>

        <br />
      </ol>
    </ul>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Api",
  methods: {
    ...mapActions([
      "fetchProducts",
      "fetchCategories",
      "deleteProducts",
      "addProducts",
      "updateProducts",
      "fetchImages",
      "addImages",
      "deleteImages",
    ]),
  },

  data() {
    return {
      newproduct: {
        name: "",
        description: "",
        price: "",
        stock: "",
        categories_id: "",
      },
      newimage: {
        url: "",
        product_id: "",
      },
    };
  },

  computed: mapGetters(["allProducts", "allCategories", "allImages"]),
  created() {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchImages();
  },
};
</script>
