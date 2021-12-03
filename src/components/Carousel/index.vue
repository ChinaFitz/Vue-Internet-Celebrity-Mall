<template>
    <div class="swiper-container" id="carousel">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>

        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    import Swiper from "swiper"
    export default {
        name: "Carousel", // 指定组件名
        data: function () {
            return {

            }
        },
        props: {
            carouselList: {
                require: true,
                type: Array,
            },
        },
        watch: {
            carouselList: {
                immediate: true,
                handler() {
                    // nextTick保证了数据更新  并且已经渲染完毕到真实DOM中
                    this.$nextTick(()=>{
                        new Swiper ('.swiper-container', {
                            loop: true, // 循环模式选项

                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                            },

                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },

                            // 如果需要滚动条
                            scrollbar: {
                                el: '.swiper-scrollbar',
                            },
                        })
                    })
                }
            },
        },
    }
</script>

<style lang="less" scoped></style>
