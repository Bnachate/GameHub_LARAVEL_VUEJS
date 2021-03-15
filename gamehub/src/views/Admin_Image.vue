<template>
  <!-- *****************************BOUCLE ALL PRODUCTS*********************************************** -->
  <v-data-table
    :headers="headers"
    :items="$store.state.allImages"
    sort-by="calories"
    class="elevation-1"
  >
    <!-- ****************************POP UP NEW ITEM************************************* -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-btn text to="/admin-users">My CRUD USERS</v-btn>
        <v-btn text to="/admin-products">My CRUD PRODUCTS</v-btn>
        <v-btn text to="/admin-comments">My CRUD COMMENTS</v-btn>
        <v-btn text to="/admin-images">My CRUD IMAGES</v-btn>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newimage.id"
                      label="id"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newimage.product_id"
                      label="product_id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newimage.url"
                      label="url au format JPEG"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <!-- ******************boite dialogue validation************************** -->

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                v-if="formTitle === 'New Item'"
                @click="addImages(newimage)"
                @click.prevent="close"
              >
                Ajout image
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                v-if="formTitle == 'Edit Item'"
                @click="updateImage(newimage)"
                @click.prevent="close"
              >
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- ******************boite dialogue non utilisee************************** -->
        <!-- 
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click.prevent="deleteProducts(item.id)"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </v-toolbar>
    </template>

    <!-- ****************************TABLEAU************************************* -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteImages(item.id)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "id", value: "id" },
      { text: "product_id", value: "product_id" },
      { text: "url", value: "url" },
      { text: "created_at", value: "created_at" },
      { text: "updated_at", value: "updated_at" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    newimage: {
      product_id: "",
      url: "",
    },
    desserts: [],
    editedIndex: -1,

    defaultItem: {
      product_id: "",
      url: "",
    },
  }),

  computed: {
    ...mapGetters(["allImages"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchImages();
  },
  methods: {
    ...mapActions([
      "fetchProducts",
      "fetchCategories",
      "fetchImages",
      "deleteImages",
      "addImages",
      "updateImages",
    ]),
    updateImage(item) {
      this.$store.dispatch("updateImages", { item });
    },
    editItem(item) {
      this.editedIndex = this.$store.state.allImages.indexOf(item);
      this.newproduct = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.$store.state.allImages.indexOf(item);
      this.newproduct = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.state.allImages.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.newproduct = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.newproduct = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.$store.state.allImages[this.editedIndex],
          this.newproduct
        );
      } else {
        this.$store.state.allImages.push(this.newproduct);
      }
      this.close();
    },
  },
};
</script>
