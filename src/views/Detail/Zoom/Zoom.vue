<template>
  <div class="spec-preview">
    <img :src="img || sku_img" />
    <div class="event" @mousemove="zoom"></div>
    <div class="big">
      <img :src="img || sku_img"  ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: [
        "sku_img",
    ],
    data() {
        return {
            img: "",
        }
    },
    mounted() {
        this.$bus.$on("get_small_img", (imgUrl) => {
            this.img = imgUrl
        })
    },
    methods: {
        zoom($e) {
            let left = $e.offsetX - (this.$refs.mask.offsetWidth / 2)
            let top = $e.offsetY - (this.$refs.mask.offsetHeight / 2)

            // 控制蒙版的活动范围
            if (left < 0) left = 0
            if (left > 200) left = 200
            if (top < 0) top = 0
            if (top > 200) top = 200
            // 控制蒙版的活动范围
            
            this.$refs.mask.style.left = `${left}px`
            this.$refs.mask.style.top = `${top}px`
            this.$refs.big.style.left = `${-left}px`
            this.$refs.big.style.top = `${-top}px`
        }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        height: 200%;
        max-width: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>