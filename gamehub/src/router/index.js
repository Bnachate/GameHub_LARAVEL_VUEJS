import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import Api from "@/components/Api.vue";
import Cart from "@/components/Cart.vue";
import Recap from "@/components/Recap.vue";
import Payment from "@/components/Payment.vue";
import Thankyou from "@/components/Thankyou.vue";
import Show from "@/components/Show.vue";
import Dashboard from "@/components/Dashboard.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/details/",
    name: "details",
    component: Show,
  },

  {
    path: "/api",
    name: "api",
    component: Api,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/password",
    name: "password",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/changePassword.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
  
  {
    path: "/recap",
    name: "Recap",
    component: Recap,
  },
  {
    path: "/thankyou",
    name: "Thankyou",
    component: Thankyou,
  },
  {
    path: "/forgot",
    name: "Forgot",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Forgot.vue"),
  },

  {
    path: "/admin-products",
    name: "Admin_product",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin_product.vue"),
    // beforeEnter: (to, from, next) => {
    //   store.dispatch("getCookie", "admin");
    //   console.log(store.state.admin);
    //   if (store.state.admin != 1) {
    //     next({ name: "Home" });
    //   } else {
    //     next();
    //   }
    // },
  },
  {
    path: "/admin-users",
    name: "Admin_User",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin_User.vue"),
    // beforeEnter: (to, from, next) => {
    //   store.dispatch("getCookie", "admin");
    //   console.log(store.state.admin);
    //   if (store.state.admin != 1) {
    //     next({ name: "Home" });
    //   } else {
    //     next();
    //   }
    // },
  },
  {
    path: "/admin-comments",
    name: "Admin_Comment",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin_Comment.vue"),
    // beforeEnter: (to, from, next) => {
    //   store.dispatch("getCookie", "admin");
    //   console.log(store.state.admin);
    //   if (store.state.admin != 1) {
    //     next({ name: "Home" });
    //   } else {
    //     next();
    //   }
    // },
  },

  {
    path: "/admin-images",
    name: "Admin_Image",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin_Image.vue"),
    // beforeEnter: (to, from, next) => {
    //   store.dispatch("getCookie", "admin");
    //   console.log(store.state.admin);
    //   if (store.state.admin != 1) {
    //     next({ name: "Home" });
    //   } else {
    //     next();
    //   }
    // },
  },
  {
    path: "/login",
    name: "CRUD_USER",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CRUD_USER.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("getCookie", "user_email");
  if (to.meta.requiresAuth) {
    console.log(store.getters.getUser);
    if (store.state.user == -1) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
