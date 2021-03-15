<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.allUsers"
    sort-by="calories"
    class="elevation-1"
  >
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
                      v-model="newUser.id"
                      label="id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newUser.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newUser.admin"
                      label="Admin"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newUser.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newUser.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newUser.password_confirm"
                      label="Password_confirm"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newUser.adress_delivery"
                      label="Adress"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newUser.city_delivery"
                      label="City"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newUser.post_code_delivery"
                      label="Post-Code"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                v-if="formTitle == 'New Item'"
                @click="addUsers(newUser)"
                @click.prevent="close"
              >
                Add
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                v-if="formTitle === 'Edit Item'"
                @click="updateUser(newUser)"
                @click.prevent="close"
              >
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click.prevent="deleteUsers(item.id)"
                @click="closeDelete"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteUsers(item.id)">
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
      { text: "admin", value: "admin" },
      { text: "email", value: "email" },
      { text: "Post-Code", value: "post_code_delivery" },
      { text: "Adresses", value: "adress_delivery" },
      { text: "City", value: "city_delivery" },
      { text: "created", value: "created_at" },
      { text: "updated", value: "updated_at" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    newUser: {
      name: "",
      admin: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    desserts: [],
    editedIndex: -1,

    defaultItem: {
      name: "",
      email: "",
      password: "",
    },
  }),

  computed: {
    ...mapGetters(["allUsers"]),
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
    this.fetchUsers();
    this.fetchCategories();
  },

  methods: {
    ...mapActions([
      "fetchUsers",
      "fetchCategories",
      "deleteUsers",
      "addUsers",
      "updateUsers",
    ]),

    updateUser(item) {
      console.log(item);
      this.$store.dispatch("updateUsers", { item });
    },

    editItem(item) {
      this.editedIndex = this.$store.state.allUsers.indexOf(item);
      this.newUser = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.$store.state.allUsers.indexOf(item);
      this.newUser = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.state.allUsers.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.newUser = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.newUser = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.$store.state.allUsers[this.editedIndex],
          this.newUser
        );
      } else {
        this.$store.state.allUsers.push(this.newUser);
      }
      this.close();
    },
  },
};
</script>
