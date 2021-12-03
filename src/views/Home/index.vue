<template>
    <div>
        <TripleNav/>
        <List/>
        <Recommend/>
        <Rank/>
        <Favourite/>
        <ThemeFloor v-for="floor in floor_list" :key="floor.id" :floor="floor"/>
        <Brands/>
    </div>
</template>


<script>
    import { mapState } from "vuex"

    import List from "./List"
    import Recommend from "./Recommend"
    import Rank from "./Rank"
    import Favourite from "./Favourite"
    import ThemeFloor from "./ThemeFloor"
    import Brands from "./Brands"

    export default {
        name: "Home",
        components: {
            List,
            Recommend,
            Rank,
            Favourite,
            ThemeFloor,
            Brands,
        },
        mounted() {
            this.$store.dispatch("getFloorList")
        },
        computed: {
            ...mapState({
                floor_list(rootState) {
                    return rootState.home.floor_list
                }
            })
        }
    }
</script>

<style lang="less">

</style>
