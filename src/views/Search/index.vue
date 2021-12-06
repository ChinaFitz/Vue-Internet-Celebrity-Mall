<template>
    <div>
        <TripleNav />
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <li class="with-x" v-if="$route.query.categoryName">
                            {{ $route.query.categoryName }}
                            <i @click="removeBread('categoryName')">×</i>
                        </li>
                        <li class="with-x" v-if="$route.query.goods_name">
                            {{ $route.query.goods_name }}
                            <i @click="removeBread('goods_name')">×</i>
                        </li>
                        <li class="with-x" v-for="attr in $route.query.attrs_list" :key="attr.split(':')[0]">
                            {{ attr.split(':')[1] }}
                            <i @click="removeBread('attr', attr)">×</i>
                        </li>
                    </ul>
                </div>

                <!--selector-->
                <SearchSelector
                    @select_trademark_add_to_bread="select_trademark_add_to_bread"
                    @select_attrs_add_to_bread="select_attrs_add_to_bread"
                />

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li
                                    :class="{active: goods_sort[1]}"
                                    @click="change_sorting_basis('complex')"
                                >
                                    <a href="#">
                                        综合
                                        <i class="goods-sort sort-arrow" v-if="goods_sort[1] === 'asc'">&#xe840;</i>
                                        <i class="goods-sort sort-arrow" v-if="goods_sort[1] === 'desc'">&#xe83e;</i>
                                    </a>
                                </li>
                                <li
                                    :class="{active: goods_sort[2]}"
                                    @click="change_sorting_basis('sale_num')"
                                >
                                    <a href="#">
                                        销量
                                        <i class="goods-sort sort-arrow" v-if="goods_sort[2] === 'asc'">&#xe840;</i>
                                        <i class="goods-sort sort-arrow" v-if="goods_sort[2] === 'desc'">&#xe83e;</i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"> 新品 </a>
                                </li>
                                <li>
                                    <a href="#"> 评价 </a>
                                </li>
                                <li>
                                    <a href="#"> 价格 </a>
                                </li>
                                <li>
                                    <a href="#"> 价格 </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>{{ good.price }}.00</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a
                                            target="_blank"
                                            href="item.html"
                                            title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                                        >
                                            {{ good.title }}
                                        </a>
                                    </div>
                                    <div class="commit">
                                        <i class="command"
                                            >已有<span> {{ parseInt(Math.random() * 10000) }}</span
                                            >人评价</i
                                        >
                                    </div>
                                    <div class="operate">
                                        <a
                                            href="success-cart.html"
                                            target="_blank"
                                            class="sui-btn btn-bordered btn-danger"
                                            >加入购物车</a
                                        >
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="fr page">
                        <Pagenation 
                            :currentPage="$route.query.pageNo"
                            :pageSize="10"
                            :continuous="5"
                            :totalData="275"
                            @get_page="get_page"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, } from "vuex"
    import SearchSelector from './SearchSelector/SearchSelector'

    export default {
        name: 'Search',

        components: {
            SearchSelector
        },
        data() {
            return {
                // 商品根据综合还是价格排序, 排序分为升序和降序
                goods_sort: {
                    1: "asc", // 默认: 综合-升序(asc)
                    2: "", // 销量
                },
            }
        },
        mounted() {
            this.$route.query.attrs_list = []
            this.$route.query.order = `1:asc`   // 默认: 综合-升序(asc)
            this.$route.query.pageNo = 1
            this.getGoodsInfo()
        },
        computed: {
            ...mapGetters([
                "goodsList",
            ])
        },
        methods: {
            getGoodsInfo() {
                let {
                    categoryId1,
                    categoryId2,
                    categoryId3,
                    categoryName,
                    goods_name,
                    attrs_list,
                    order,
                    pageNo,
                } = this.$route.query

                let require_field = {
                    categoryId1,
                    categoryId2,
                    categoryId3,
                    categoryName,
                    keyword: goods_name,
                    order,
                    pageNo,
                    pageSize: 10,
                    props: attrs_list,
                    trademark: "",
                }
                this.$store.dispatch("getGoodsInfo", require_field)
            },
            // 移除面包屑
            removeBread(type, attr) {
                if (type === 'categoryName') {
                    this.$route.query.categoryName = undefined
                }else if (type === 'goods_name') {
                    this.$route.query.goods_name = undefined
                }else if (type === 'trademark') {
                    this.trademark = undefined
                }else if (type === 'attr') {
                    let index = this.$route.query.attrs_list.indexOf(attr)
                    if (index !== -1) {
                        this.$route.query.attrs_list.splice(index, 1)
                    }
                }
                this.getGoodsInfo()
            },
            select_trademark_add_to_bread(tmName) {
                this.$route.query.goods_name = tmName
                this.$nextTick(this.getGoodsInfo)
            },
            select_attrs_add_to_bread(goodAttrs_obj) {
                let goodAttrs = Object.values(goodAttrs_obj).join(":")

                // 保持商品属性的唯一性
                if (this.$route.query.attrs_list.indexOf(goodAttrs) === -1) {
                    this.$route.query.attrs_list.push(goodAttrs)
                }
                this.$nextTick(this.getGoodsInfo)
            },
            change_sorting_basis(basis) {
                if (basis === "complex") {
                    this.goods_sort[2] = "" // 重置对立的排序条件
                    this.goods_sort[1] =
                        this.goods_sort[1] === "asc" ?
                        "desc" :
                        "asc"
                }else if (basis === "sale_num") {
                    this.goods_sort[1] = "" // 重置对立的排序条件
                    this.goods_sort[2] =
                        this.goods_sort[2] === "asc" ?
                        "desc" :
                        "asc"
                }
            },
            // 得到子组件分页组件的点击页数
            get_page(page_num) {
                this.$route.query.pageNo = page_num
                this.$nextTick(this.getGoodsInfo)
            },
        },
        watch: {
            $route: {
                immediate: true,
                deep: true,
                handler() {
                    this.getGoodsInfo()
                },
            },
            goods_sort: {
                deep: true,
                handler(goods_sort) {
                    Object.keys(goods_sort).forEach(
                        key => {
                            if (goods_sort[key]) {
                                this.$route.query.order = `${key}:${goods_sort[key]}`
                            }
                        }
                    )
                    this.getGoodsInfo()
                },
            },
        },
    }
</script>

<style lang="less" scoped>
    .main {
      margin: 10px 0;

      .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
          margin-bottom: 5px;
          overflow: hidden;

          .sui-breadcrumb {
            padding: 3px 15px;
            margin: 0;
            font-weight: 400;
            border-radius: 3px;
            float: left;

            li {
              display: inline-block;
              line-height: 18px;

              a {
                color: #666;
                text-decoration: none;

                &:hover {
                  color: #4cb9fc;
                }
              }
            }
          }

          .sui-tag {
            margin-top: -5px;
            list-style: none;
            font-size: 0;
            line-height: 0;
            padding: 5px 0 0;
            margin-bottom: 18px;
            float: left;

            .with-x {
              font-size: 12px;
              margin: 0 5px 5px 0;
              display: inline-block;
              overflow: hidden;
              color: #000;
              background: #f7f7f7;
              padding: 0 7px;
              height: 20px;
              line-height: 20px;
              border: 1px solid #dedede;
              white-space: nowrap;
              transition: color 400ms;
              cursor: pointer;

              i {
                margin-left: 10px;
                cursor: pointer;
                font: 400 14px tahoma;
                display: inline-block;
                height: 100%;
                vertical-align: middle;
              }

              &:hover {
                color: #28a3ef;
              }
            }
          }
        }

        .details {
          margin-bottom: 5px;

          .sui-navbar {
            overflow: visible;
            margin-bottom: 0;

            .filter {
              min-height: 40px;
              padding-right: 20px;
              background: #fbfbfb;
              border: 1px solid #e2e2e2;
              padding-left: 0;
              border-radius: 0;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

              .sui-nav {
                position: relative;
                left: 0;
                display: block;
                float: left;
                margin: 0 10px 0 0;

                li {
                  float: left;
                  line-height: 18px;

                  a {
                    display: block;
                    cursor: pointer;
                    padding: 11px 15px;
                    color: #777;
                    text-decoration: none;
                  }

                  &.active {
                    a {
                      background: #e1251b;
                      color: #fff;
                    }
                  }
                }
              }
            }
          }

          .goods-list {
            margin: 20px 0;

            ul {
              display: flex;
              flex-wrap: wrap;

              li {
                height: 100%;
                width: 20%;
                margin-top: 10px;
                line-height: 28px;

                .list-wrap {
                  .p-img {
                    padding-left: 15px;
                    width: 215px;
                    height: 255px;

                    a {
                      color: #666;

                      img {
                        max-width: 100%;
                        height: auto;
                        vertical-align: middle;
                      }
                    }
                  }

                  .price {
                    padding-left: 15px;
                    font-size: 18px;
                    color: #c81623;

                    strong {
                      font-weight: 700;

                      i {
                        margin-left: -5px;
                      }
                    }
                  }

                  .attr {
                    padding-left: 15px;
                    width: 85%;
                    overflow: hidden;
                    margin-bottom: 8px;
                    min-height: 38px;
                    cursor: pointer;
                    line-height: 1.8;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;

                    a {
                      color: #333;
                      text-decoration: none;
                    }
                  }

                  .commit {
                    padding-left: 15px;
                    height: 22px;
                    font-size: 13px;
                    color: #a7a7a7;

                    span {
                      font-weight: 700;
                      color: #646fb0;
                    }
                  }

                  .operate {
                    padding: 12px 15px;

                    .sui-btn {
                      display: inline-block;
                      padding: 2px 14px;
                      box-sizing: border-box;
                      margin-bottom: 0;
                      font-size: 12px;
                      line-height: 18px;
                      text-align: center;
                      vertical-align: middle;
                      cursor: pointer;
                      border-radius: 0;
                      background-color: transparent;
                      margin-right: 15px;
                    }

                    .btn-bordered {
                      min-width: 85px;
                      background-color: transparent;
                      border: 1px solid #8c8c8c;
                      color: #8c8c8c;

                      &:hover {
                        border: 1px solid #666;
                        color: #fff !important;
                        background-color: #666;
                        text-decoration: none;
                      }
                    }

                    .btn-danger {
                      border: 1px solid #e1251b;
                      color: #e1251b;

                      &:hover {
                        border: 1px solid #e1251b;
                        background-color: #e1251b;
                        color: white !important;
                        text-decoration: none;
                      }
                    }
                  }
                }
              }
            }
          }

          .page {
            width: 100%;
            height: 66px;
            overflow: hidden;
            transform: translateX(16%);
          }
        }
      }
    }

    @font-face {
        font-family: 'sort-arrow';
        src: url('font/iconfont.woff2?t=1638679346690') format('woff2'),
            url('font/iconfont.woff?t=1638679346690') format('woff'),
            url('font/iconfont.ttf?t=1638679346690') format('truetype');
    }

    .sort-arrow {
        font-family: "sort-arrow" !important;
        font-size: 12px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
