<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img, index) in skuImageList" :key="img.id">
                <img :src="img.imgUrl" 
                    :class="{current_img: current_img === index}"
                    @click="watch_img(img.imgUrl, index)"
                />
            </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    export default {
        name: "ImageList",
        props: [
            "skuImageList",
        ],
        data() {
            return {
                current_img: 0,
            }
        },
        watch: {
            skuImageList: {
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
                            slidesPerView: 2,
                        })
                    })
                }
            },
        },
        methods: {
            watch_img(imgUrl, index) {
                this.current_img = index
                this.$bus.$emit("get_small_img", imgUrl)
            },
        }
    }
</script>

<style lang="less" scoped>
    .swiper-container {
      height: 56px;
      width: 412px;
      box-sizing: border-box;
      padding: 0 12px;

      .swiper-slide {
        width: 56px;
        height: 56px;

        img {
          width: 100%;
          height: 100%;
          border: 1px solid #ccc;
          padding: 2px;
          width: 50px;
          height: 50px;
          display: block;

          &.active {
            border: 2px solid #f60;
            padding: 1px;
          }

          &:hover {
            border: 2px solid #f60;
            padding: 1px;
          }
        }
      }

      .swiper-button-next {
        left: auto;
        right: 0;
      }

      .swiper-button-prev {
        left: 0;
        right: auto;
      }

      .swiper-button-next,
      .swiper-button-prev {
        box-sizing: border-box;
        width: 12px;
        height: 56px;
        background: rgb(235, 235, 235);
        border: 1px solid rgb(204, 204, 204);
        top: 0;
        margin-top: 0;
        &::after {
          font-size: 12px;
        }
      }
    }

    .current_img {
        border: 2px solid red!important;
        padding: 1px!important;
    }
</style>
