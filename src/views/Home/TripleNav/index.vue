<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div
            class="container"
        >
            <h2 
                class="all"
                @mouseenter="showSortList"
                @mouseleave="hideSortList"
            >
            全部商品分类
            </h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">好物超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <transition
                name="sort-list"
                @enter="enter"
            >
                <div 
                    class="sort"
                    v-show="sort_list_show"
                    @mouseenter="showSortList"
                    @mouseleave="hideSortList"
                >
                    <div class="all-sort-list2">
                        <!-- 事件委派给所有商品查询用 -->
                        <div class="item" v-for="c in categoryList" :key="c.categoryId" @click.prevent="visitCategory">
                            <h3>
                                <!-- 表示所有商品分类, 并且能够进行商品查询后路由跳转 -->
                                <a
                                    href=""
                                    :data-category-name="c.categoryName"
                                    :data-category-id3="c.categoryId"
                                >
                                {{ c.categoryName }}
                                </a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore" v-for="child in c.categoryChild" :key="child.categoryId">
                                        <dt>
                                            <!-- 表示所有商品分类, 并且能够进行商品查询后路由跳转 -->
                                            <a
                                                href=""
                                                :data-category-name="child.categoryName"
                                                :data-category-id2="child.categoryId"
                                            >
                                            {{ child.categoryName }}
                                            </a>
                                        </dt>
                                        <dd>
                                            <em v-for="grandChild in child.categoryChild" :key="grandChild.categoryId">
                                                <!-- 表示所有商品分类, 并且能够进行商品查询后路由跳转 -->
                                                <a
                                                    href=""
                                                    :data-category-name="grandChild.categoryName"
                                                    :data-category-id1="grandChild.categoryId"
                                                >
                                                {{ grandChild.categoryName }}
                                                </a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import lodash from "lodash"
    
    export default {
        name: "TripleNav", // 指定组件名
        data: function () {
            return {
                sort_list_show: false,
            }
        },
        computed: {

            ...mapState({
                categoryList(rootState) {
                    return rootState.home.reqgetCategoryList
                }
            }),
            
        },
        mounted() {
            if (this.$route.path === "/home"){
                this.sort_list_show = true
            }
        },
        methods: {
            visitCategory($e) {
                // 获取到当前点击的商品分类
                const currentEle = $e.target
                let { categoryName, categoryId3, categoryId2, categoryId1 } = currentEle.dataset

                // 当点击的是商品分类本身时
                if (categoryId3 || categoryId2 || categoryId1) {
                    
                    let query = {
                        categoryId3,
                        categoryId2,
                        categoryId1,
                        categoryName,
                    }
                    let params = {}
                    // 与Header组件的search功能的查询参数进行合并
                    if (Object.keys(this.$route.query).length) {
                        let query_clone = lodash.cloneDeep(this.$route.query)
                        query = Object.assign(query_clone, query)
                    }
                    if (Object.keys(this.$route.params).length) {
                        let params_clone = lodash.cloneDeep(this.$route.params)
                        params = Object.assign(params_clone, params)
                    }

                    // 组合出需要跳转的target
                    const targetRoute = {
                        name: "Search",
                        query,
                        params,
                    }
                    this.$router.push(targetRoute)
                }
            },
            showSortList() {
                if (this.$route.path !== "/home") this.sort_list_show = true
            },
            hideSortList() {
                if (this.$route.path !== "/home") this.sort_list_show = false
            },
            // transition钩子, 用于解决home组件不需要过渡,但是在切换时仍然生效的问题
            enter(el, done) {
                if (this.$route.path === "/home") {
                    el.style.transitionDuration = "1ms"
                }else {
                    el.style.transitionDuration = "350ms"
                }
                done()
            },
        }
    }
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 476px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    // overflow: hidden;
                    .item {
                        cursor: pointer;
                        
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                                text-decoration: none;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            background-color: rgba(224, 224, 224, .6);
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }


    // 三级商品菜单(sort-list)的transition
    .sort-list-enter,
    .sort-list-leave-to {
        height: 0!important;
    }
    .sort-list-enter-active,
    .sort-list-leave-active {
        transition-property: all!important;
        transition-timing-function: ease-in!important;
        overflow: hidden!important;
        transition-duration: 350ms!important;
    }
    .sort-list-enter-to,
    .sort-list-leave {
        height: 476px!important;
    }
    
</style>
