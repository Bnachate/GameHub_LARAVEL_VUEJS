<template>
    <div>
        <v-carousel hide-delimiters id="carousel">
            <v-carousel-item src="../assets/carousel/image1.jpg"></v-carousel-item>
            <v-carousel-item src="../assets/carousel/image1.jpg"></v-carousel-item>
            <v-carousel-item src="../assets/carousel/image1.jpg"></v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
// const path = require('path');
// const fs = require('fs');
export default {
    data() {
        return {
            imagesDir: `../src/assets/carousel`,
            images: []
        }
    },
    created() {

    },
    methods: {
        importAll(r) {
            var imgs = {}
            r.keys().forEach(key => (imgs[key] = r(key)))
            this.images = imgs
        }
    }
}
</script>