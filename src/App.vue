<template>
    <div id="app">
        <Header/>
        <router-view></router-view>
        <Footer
            v-if="$route.meta.not_login_or_register"
        />
    </div>
</template>


<script>
    import Header from "@/components/Header"
    import Footer from "@/components/Footer"

    export default {
        name: "App",
        components: {
            Header,
            Footer,
        },
        // 由于App只会执行一次, 所以将Home和Search组件共同需要的数据都在这获取, 以减少服务器压力
        mounted() {
            this.$store.dispatch("getCategoryList")
        },
    }
</script>

<style lang="less">

</style>
