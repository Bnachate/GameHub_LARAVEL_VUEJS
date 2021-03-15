<template>
  
</template>

<script>


export default {
  name: "Comment",
  data() {
    return {
      router: "",
      product: "",
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
      this.$store.dispatch("addComments", { comment: this.comment });
    },
  },

  computed: mapGetters(["allProducts", "allCategories", "allComments"]),

  created() {
    this.fetchProducts();
    this.showProducts(this.$route.params.id);
    this.fetchComments();
    //this.$store.dispatch("showComments", { id: this.$route.params.id });
  },
};
</script>

<style scoped>





</style>
