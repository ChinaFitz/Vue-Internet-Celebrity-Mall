<template>
    <div>
        <TripleNav/>
        <List/>
        <Recommend/>
        <Rank/>
        <Favourite/>
        <ThemeFloor/>
        <ThemeFloor/>
        <ThemeFloor/>
        <Brands/>
    </div>
</template>


<script>
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
    }
</script>

<style lang="less">

</style>
