<template>
    <div>
        <!-- 头部 -->
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>网红好物商城欢迎您！</p>
                        
                        <template v-if="userName">
                            <p>
                                <span>{{ userName }}</span>
                                <a class="register" @click.prevent="logout">退出登录</a>
                            </p>
                        </template>

                        <template v-else>
                            <p>
                                <span>请</span>
                                <router-link to="/login" href="###">登录</router-link>
                                <router-link to="/register" href="###" class="register">免费注册</router-link>
                            </p>
                        </template>

                    </div>
                    <div class="typeList">
                        <router-link to="/center/porder">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的网红好物</a>
                        <a href="###">网红好物会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注网红好物</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link to="/home" class="logo" title="网红好物" href="###" target="_self">
                        <img src="./images/logo.png" alt="" />
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="goods_name"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="searchGoods">搜索</button>
                    </form>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
    import lodash from "lodash"

    export default {
        name: "Header", // 指定组件名
        data: function () {
            return {
                goods_name: "",
            }
        },
        methods: {
            searchGoods() {

                let query = {
                    goods_name: this.goods_name,
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

                this.$router.push({
                    name: "Search",
                    query,
                    params,
                })

                this.goods_name = ""    // 搜索后重置清空掉输入框
            },

            logout() {
                if (localStorage.getItem("TOKEN")) {
                    this.$store.dispatch("logout").catch(e => alert(e))
                }
            },
        },
        computed: {
            userName() {
                return this.$store.state.login_register.userInfo.name
            },
        }
    }
</script>

<style lang="less" scoped>
        .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>
