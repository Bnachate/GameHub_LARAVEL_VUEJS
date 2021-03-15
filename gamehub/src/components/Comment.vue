<template>
  <v-container>
    <v-card class="mx-auto" max-width="1000" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>
            <v-textarea
              required
              v-model="comment.comment"
              placeholder="Laissez un commentaire"
            ></v-textarea>
          </v-list-item-title>

          <v-list-item-title>
            Laissez une note sur

            <input v-model="comment.note" type="number" min="1" max="5" />
            /5
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn v-on:click="addComment()" outlined rounded text>
          Ajouter
        </v-btn>
      </v-card-actions>
    </v-card>

    <br />

    <!-- ************************** -->
    <v-card
      class="mx-auto"
      max-width="1000"
      outlined
      v-for="comment in this.product.comments"
      :key="comment.id"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Nom du User: {{ comment.user_id }}</div>
          <v-list-item-title> Note :{{ comment.note }} </v-list-item-title>
          <v-list-item-subtitle>{{ comment.comment }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <!-- <v-btn @click="addComments" outlined rounded text>
          ajouter
        </v-btn> -->

        <v-btn @click="deleteComments(comment.id)" outlined rounded text>
          supprimer
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- ********************************************************************************************************* -->
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Comment",
  data() {
    return {
      product: {},
      router: "",
      newComment: [],
      comment: {
        comment: "",
        note: "",
        product_id: this.$route.params.id,
        user_id: "1",
      },
    };
  },

  methods: {
    ...mapActions([
      "fetchProducts",
      "fetchCategories",
      "showProducts",
      "removeImages",
      "addComments",
      "deleteComments",
      "showComments",
      "fetchComments",
    ]),


    

    addComment() {
      (this.comment.product_id = this.product.id),
        this.$store.dispatch("addComments", { comment: this.comment });

    },
  },

  created() {
    this.product = JSON.parse(localStorage.getItem("productShow"));
  },
};
</script>

<style scoped></style>
