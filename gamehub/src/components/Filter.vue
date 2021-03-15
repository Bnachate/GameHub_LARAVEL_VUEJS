<template>
    <div id="filter-container">
    <v-container style="max-height:700px;" class="mx-auto my-12 d-flex flex-row" v-scroll="onScroll" id="scroll-target" width="4">
      <v-card dense style="padding: 10px 10px;width:100%;">
        <h2 style="text-align:center;">Filter <img src="../assets/filter.png" width="20" height="auto"/></h2>
        <form @submit.prevent="filter">
            <h3 style="margin-bottom:10px;">Price range:</h3>
            <div class="middle">
                <v-range-slider
                    v-model="range"
                    :max="max"
                    :min="min"
                    color="red"
                >
                </v-range-slider>
                <v-container class="d-flex row justify-space-between" style="padding: 0 12px;margin:0">
                    <p>{{ this.range[0] }}€</p>
                    <p>{{ this.range[1] }}€</p>
                </v-container>
            </div>
            <h3 style="margin-bottom:10px;">Product category:</h3>
            <v-select
            :items="items"
            v-model="category"
            label="Select category"
            ></v-select>
            <h3>Ratings:</h3>
                <v-container class="d-flex flex-row justify-center align-center">
                    <v-rating
                    v-model="ratings"
                    background-color="red lighten-3"
                    color="red"
                    size="20"
                    ></v-rating>
                    <p style="margin-top: 12px;">&more</p>
                </v-container>
            <div style="text-align:center; margin: 15px 0;">
                <v-btn type="submit" style="margin-right:10px;">
                Filter
                </v-btn>
                <v-btn v-on:click="disableFilters" style="margin-left:10px;">
                    <img src="../assets/disable_filter.png" width="20" height="auto" alt="">
                </v-btn>
            </div>
        </form>
      </v-card>
    </v-container>
    </div>
</template>

<script>
export default {
    props: ['noResult'],
    data() {
        return {
            min: 0,
            max: 600,
            range: [0, 500],
            items: ['Games Console', 'Games', 'Accessories'],
            category: '',
            ratings: -1
        }
    },
    methods: {
        onScroll() {
            var filter = document.querySelector('#scroll-target');
            var container = document.querySelector('#filter-container');
            var parent = document.querySelector('#filter');
            var sticky = container.offsetTop;
            window.addEventListener('scroll', () => {
                if (window.scrollY > sticky) {
                    filter.style.width = parent.offsetWidth + "px";
                    filter.classList.add('sticky');
                } else if (window.scrollY < sticky) {
                    filter.classList.remove('sticky')
                }
            })
        },
        filter() {
            var data = {
                range: this.range,
                ratings: this.ratings,
                category: this.category
            }
            this.$emit("filter", data)
        },
        disableFilters() {
            this.range = [0, 500]
            this.ratings = -1
            this.category = ''
            this.$emit('disable-filters');
        }
    }
}
</script>
<style>
    .sticky {
        position:fixed;
        top:80px;
    }
    .middle {
        width:100%;
    }
    .v-slider__track-container {
        background-color: red!important;
    }
    @media (max-width: 800px) {
        .sticky {
            position: relative;
            top:80px;
        }
    }
</style>