import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from "@/components/http-common.js";

Vue.use(Vuex);

const bcrypt = require("bcrypt-nodejs");

export default new Vuex.Store({
  state: {
    allProducts: [],
    allUsers: [],
    showProducts: [],
    showUser: {},
    allImages: [],
    user: -1,
    admin: -1,
    name: "",
    isLogin: false,
    cart: "[]",
    allComments: [],
    showComments: [],
    userData: "",
    totalCart: 0,
  },
  getters: {
    showCart: (state) => {
      return JSON.parse(state.cart);
    },

    product: (state) => (id) => {
      return state.allProducts.find((product) => {
        product.id == id;
      });
    },
  },

  actions: {
    //*********************PRODUCTS******************************************/
    async fetchProducts({ commit }) {
      //je récupère une promesse Javascript = objet avec des infos
      const response = await HTTP.get("/api/products");
      //la requete axios va générer un objet avec data
      commit("setProducts", response.data);
    },

    async deleteProducts({ commit }, id) {
      await HTTP.delete(`api/products/${id}`);
      commit("removeProducts", id);
    },

    async addProducts({ commit }, newproduct) {
      newproduct.created_at = new Date().toISOString();
      newproduct.updated_at = new Date().toISOString();

      await HTTP.post(`/api/products`, newproduct);
      commit("addPdt", newproduct);
    },

    async updateProducts({ commit }, data) {
      console.log("newproduct", data);
      const response = await HTTP.put(`api/products/${data.item.id}`, data.item);
      console.log(response);
      /* (data.item.updated_at = new Date().toISOString()),
        (data.item.created_at = new Date().toISOString()), */
        commit("updPdt", data);
    },

    showProducts({ commit }, id) {
      console.log(id);
      //await HTTP.get(`/api/products/${id}`);
      commit("showpdt", id);
    },

    //*********************IMAGE******************************************/

    async fetchImages({ commit }) {
      const response = await HTTP.get("/api/images"); //je récupère une promesse Javascript = objet avec des infos
      commit("setImages", response.data);
    },

    async addImages({ commit }, newimage) {
      await HTTP.post(`/api/images`, newimage);
      commit("addImg", newimage);
    },

    async deleteImages({ commit }, id) {
      await HTTP.delete(`/api/images/${id}`);
      commit("removeImages", id);
    },

    async updateImages({ commit }, data) {
      console.log(data);
      data.item.updated_at = new Date().toISOString();
      await HTTP.put(`/api/images/${data.item.id}`, data.item);
      commit("updImg", data.item);
    },

    //*********************CATEGORIES*****************************************/

    async fetchCategories({ commit }) {
      const response = await HTTP.get("/api/categories"); //je récupère une promesse Javascript = objet avec des infos
      //la requete axios va générer un objet avec data
      commit("setCategories", response.data);
    },

    //*********************COMMENTS*****************************************/

    async fetchComments({ commit }) {
      const response = await HTTP.get("api/comments");

      commit("setComments", response.data);
    },

    async addComments({ commit }, newcomment) {
      console.log(newcomment);
      const response = await HTTP.post(`api/comments`, newcomment.comment);
      console.log(response);
      commit("addCmt", newcomment.comment);
    },

    async deleteComments({ commit }, id) {
      console.log(id);
      await HTTP.delete(`api/comments/${id}`);
      commit("deleteComt", id);
    },

    showComments({ commit }, id) {
      console.log(id.id);
      commit("showcmt", id.id);
    },

    //**********************USERS**************************************/
    async fetchUsers({ commit }) {
      const response = await HTTP.get("api/users");
      // const response = await axios.get(
      //   "http://localhost:8000/api/users" //je récupère une promesse Javascript = objet avec des infos
      // );
      //la requete axios va générer un objet avec data
      console.log(response.data);
      commit("setUsers", response.data);
      commit("showUser");
    },

    async deleteUsers({ commit }, id) {
      await HTTP.delete(`/api/users/${id}`);
      commit("removeUsers", id);
    },

    async addUsers({ commit }, newUser) {
      let hash = bcrypt.hashSync(newUser.password);
      newUser.password = hash;
      newUser.password_confirm = hash;
      newUser.created_at = new Date().toISOString();
      newUser.updated_at = new Date().toISOString();
      await HTTP.post(`/api/users`, newUser);

      commit("addUser", newUser);
    },

    async updateCartUsers({ commit }, data) {
      var id = data.id;
      delete data["id"];
      //data.item.updated_at = new Date().toISOString();
      await console.log(HTTP.put(`/api/users/${id}`, data));
      commit("updUser", data);
      data.id = id;
      commit("updShowUser", data);
      commit("showUser");
      console.log("OK",data)
      
    },

    async updateUsers({ commit }, data) {
      // console.log(data)
      // data.item.updated_at = new Date().toISOString();
      await HTTP.put(`/api/users/${data.item.id}`, data.item);
      commit("updUser", data.item);
    },

    async updaterecapUsers({ commit }, data) {
      // data.item.updated_at = new Date().toISOString();
      await HTTP.put(`/api/users/${data.id}`, data);
      commit("updUser", data);
    },
    getUser({ commit }) {
      commit("showUser");
    },

    async showUsers({ commit }, id) {
      await HTTP.get(`/api/users/${id}`);
      commit("showUser", id);
    },

    //**************************** COOKIES *************************************/
    setCookie(user, data) {
      user = data.user.email;
      var admin = data.user.admin;
      document.cookie = "admin=" + admin + ";SameSite=Lax;";
      document.cookie = "user_email=" + user + ";SameSite=Lax;";
    },

    getCookie({ commit }, cname) {
      if (cname == "user_email") {
        var user = localStorage.getItem("user_email");
        if (user != undefined) {
          commit("isLogin", true);
        }
        commit("user", user);
        commit("getUser");
        commit("showUser");
      } else if (cname == "admin") {
        var admin = localStorage.getItem("admin");
        commit("admin", admin);
      } else if (cname == "name") {
        var name = localStorage.getItem("name");
        commit("name", name);
      } else if (cname == "userdata") {
        var userData = localStorage.getItem("userData");
        commit("userData", userData);
      }
    },
    //**************************** END COOKIES *************************************/
    updateUser({ commit }, value) {
      console.log(value);
      commit("updateUser", value);
    },
    getTotal({ commit }) {
      commit("getTotal");
    },
  },

  mutations: {
    getTotal(state) {
      var cart = JSON.parse(state.cart);
      cart.forEach((item) => {
        state.getTotal += parseInt(item.price);
      });
    },
    updateUser({ commit }, state, user) {
      state.showUser.email = user;
      commit("showUser");
    },
    //mutations = computed
    setProducts(state, products) {
      //products c'est la data envoyée par response.data
      state.allProducts = products;
    },

    removeProducts: (state, id) =>
      (state.allProducts = state.allProducts.filter(
        (product) => product.id !== id
      )), //il va garder l'id différent de celui sélectionner

    addPdt: (state, newProduct) => state.allProducts.unshift(newProduct),
    //unshit() méthode qui insère les valeurs renseignées au début d'un objet ressemblant à un tableau.
    //*********************************USER***********************************************/
    //mutations = computed
    setUsers(state, users) {
      //products c'est la data envoyée par response.data
      state.allUsers = users;
    },

    removeUsers: (state, id) =>
      (state.allUsers = state.allUsers.filter((user) => user.id !== id)), //il va garder l'id différent de celui sélectionner

    addUser: (state, newUser) => state.allUsers.unshift(newUser),
    //unshit() méthode qui insère les valeurs renseignées au début d'un objet ressemblant à un tableau.
    //*********************************CATEGORIE***********************************************/

    setCategories(state, categories) {
      state.allCategories = categories;
    },

    updPdt: (state, newProduct) => {
      var id = newProduct.id;
      state.allProducts = state.allProducts.filter(
        (product) => product.id !== id
      );
      state.allProducts.unshift(newProduct);
    },
    //unshit() méthode qui insère les valeurs renseignées au début d'un objet ressemblant à un tableau.

    showpdt: (state, id) =>
      (state.showProducts = state.allProducts.find(
        (product) => product.id === id
      )),

    //*********************IMAGES*****************************************/

    setImages(state, image) {
      //products c'est la data envoyée par response.data
      state.allImages = image;
    },

    addImg: (state, newImage) => state.allImages.unshift(newImage),
    //unshit() méthode qui insère les valeurs renseignées au début d'un objet ressemblant à un tableau.

    removeImages: (state, id) =>
      (state.allImages = state.allImages.filter((image) => image.id !== id)), //il va garder l'id différent de celui sélectionner

    updImg: (state, newImg) => {
      var id = newImg.id;
      state.allImages = state.allImages.filter((Img) => Img.id !== id);
      state.allImages.unshift(newImg);
    },

    //*********************COMMENTS*****************************************/
    setComments(state, comments) {
      state.allComments = comments;
    },

    addCmt: (state, newComment) => state.allComments.unshift(newComment),

    deleteComt: (state, id) =>
      (state.allComments = state.allComments.filter(
        (comment) => comment.id !== id
      )),

    showcmt: (state, id) =>
      (state.showComments = state.allComments.find(
        (comment) => comment.product_id === id
      )),

    /**************************************USER********************************/
    updUser: (state, newUser) => {
      var id = newUser.id;
      state.allUsers = state.allUsers.filter((user) => user.id !== id);
      state.allUsers.unshift(newUser);
    },
    updShowUser: (state, newUser) => {
      state.showUser = newUser;
    },
    //unshit() méthode qui insère les valeurs renseignées au début d'un objet ressemblant à un tableau.

    showUser: (state) => {
      state.showUser = state.allUsers.find((user) => user.email == state.user);
      if (state.showUser != undefined) {
        if (state.showUser.cart != null) {
          if (state.showUser.cart instanceof Object) {
            state.showUser.cart = JSON.stringify(state.showUser.cart);
            localStorage.setItem("cart", JSON.stringify(state.showUser.cart));
          } else {
            state.cart = state.showUser.cart;
            localStorage.setItem("cart", state.showUser.cart);
          }
        } else {
          state.cart = "[]";
        }
      }
    },
    /**************************************USER********************************/

    /************************************** SESSION ****************************/

    isLogin: (state, val) => (state.isLogin = val),
    user: (state, user) => {
      state.user = user;
    },
    admin: (state, admin) => (state.admin = admin),
    name: (state, name) => (state.name = name),

    userData: (state, data) => (state.userData = data),
  },
  modules: {},
});
