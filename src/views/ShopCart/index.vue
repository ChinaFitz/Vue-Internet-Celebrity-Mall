<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul class="cart-list" v-for="(cart, index) in personal_cart_data" :key="cart.id">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" :checked="cart.isChecked" @click="chang_select(cart, index)"/>
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cart.imgUrl" />
                        <div class="item-msg">{{ cart.skuName }}</div>
                    </li>

                    <li class="cart-list-con4">
                        <span class="price">{{ cart.skuPrice }}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a href="javascript:void(0)" class="mins" @click.prevent="operate_skuNum('decrease', -1, cart)">-</a>
                        <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @blur.prevent="operate_skuNum('input', $event.target.value, cart)"/>
                        <a href="javascript:void(0)" class="plus" @click.prevent="operate_skuNum('plus', 1, cart)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{ cur_good_total_price(cart.skuPrice, cart.skuNum) }}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a href="#none" class="sindelet" @click.prevent="deleteGood(cart)">删除</a>
                        <br />
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" v-model="allSelected"/>
                <span>全选</span>
            </div>
            <div class="option">
                <a href="#none" @click.prevent="deleteAllChecked">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择 <span>{{ selected_num }}</span>件商品</div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney"> {{ total_price }}</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" href="###" target="_blank">结算</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { gen_uuid } from "@/utils/gen_uuid"
    import lodash from "lodash"
    
    export default {
        name: 'ShopCart',
        mounted() {
            this.$store.dispatch("getCart")
            // 当主动访问购物车时, 根据情况是否生成uuid
            gen_uuid()
        },
        computed: {
            ...mapState({
                personal_cart_data(rootState) {
                    return rootState.shopCart.personal_cart_data || []
                },
            }),

            cur_good_total_price() {
                return (price, skuNum) => {
                    return price * skuNum
                }
            },
            
            // 所有商品总价
            total_price() {
                let total = 0
                this.personal_cart_data.forEach(
                    item => {
                        let single_goods = item.skuNum * item.skuPrice
                        total += single_goods
                    }
                )
                return total
            },


            // 已选择商品数
            selected_num() {
                return this.personal_cart_data.reduce(
                    (pre, cur) => {
                        if (cur.isChecked === 1) pre++
                        return pre
                    },
                    0
                )
            },

            // 全选按钮
            allSelected: {
                get() {
                    if (this.personal_cart_data.length < 1) return false
                    return this.personal_cart_data.every(
                        item => item.isChecked === 1
                    )
                },

                async set(bool) {
                    await this.$store.dispatch("selectAll", bool).catch(e => alert(e))
                    this.$store.dispatch("getCart")
                }
            },

        },
        methods: {
            chang_select(cart) {
                cart.isChecked = 
                cart.isChecked === 1 ?
                0 :
                1
                this.$store.dispatch("changeSelect", {skuid: cart.skuId, isChecked: Number(cart.isChecked)})
            },
            operate_skuNum: lodash.throttle(async function(type, num, cart) {
                switch (type) {
                    case 'decrease':
                        if (cart.skuNum <= 1) num = 0
                        break;
                    
                    case 'input':
                        let input_num = parseInt(num)
                        if (Number.isNaN(input_num)) {
                            num = 0
                        }else {
                            num = num - cart.skuNum
                        }
                        break;
                    
                    case 'plus':
                        
                        break;
                }

                await this.$store.dispatch("addGoodToCar", {want_num: num, skuId: cart.skuId}).catch(()=>{alert("在购物车中修改某件商品数量失败...")})
                await this.$store.dispatch("getCart").catch(()=>{alert("在购物车中获取购物车中已加入商品的信息失败...")})
            }, 600),

            // 删除商品
            async deleteGood(cart) {
                let skuid = cart.skuId
                try {
                   await this.$store.dispatch("deleteGood", skuid) 
                   this.$store.dispatch("getCart")
                } catch (error) {
                    alert(error)
                }
            },

            // 删除所有选中的商品
            async deleteAllChecked() {
                try {
                   await this.$store.dispatch("deleteAllChecked") 
                   this.$store.dispatch("getCart")
                } catch (error) {
                    alert(error)
                }
            }
        },
        
    }
</script>

<style lang="less" scoped>
    .cart {
      width: 1200px;
      margin: 0 auto;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
      }

      .cart-main {
        .cart-th {
          background: #f5f5f5;
          border: 1px solid #ddd;
          padding: 10px;
          overflow: hidden;

          &>div {
            float: left;
          }

          .cart-th1 {
            width: 25%;

            input {
              vertical-align: middle;
            }

            span {
              vertical-align: middle;
            }
          }

          .cart-th2 {
            width: 25%;
          }

          .cart-th3,
          .cart-th4,
          .cart-th5,
          .cart-th6 {
            width: 12.5%;

          }
        }

        .cart-body {
          margin: 15px 0;
          border: 1px solid #ddd;

          .cart-list {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            overflow: hidden;

            &>li {
              float: left;
            }

            .cart-list-con1 {
              width: 15%;
            }

            .cart-list-con2 {
              width: 35%;

              img {
                width: 82px;
                height: 82px;
                float: left;
              }

              .item-msg {
                float: left;
                width: 150px;
                margin: 0 10px;
                line-height: 18px;
              }
            }

            .cart-list-con4 {
              width: 10%;

            }

            .cart-list-con5 {
              width: 17%;

              .mins {
                border: 1px solid #ddd;
                border-right: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }

              input {
                border: 1px solid #ddd;
                width: 40px;
                height: 33px;
                float: left;
                text-align: center;
                font-size: 14px;
              }

              .plus {
                border: 1px solid #ddd;
                border-left: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }
            }

            .cart-list-con6 {
              width: 10%;

              .sum {
                font-size: 16px;
              }
            }

            .cart-list-con7 {
              width: 13%;

              a {
                color: #666;
              }
            }
          }
        }
      }

      .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
          padding: 10px;
          overflow: hidden;
          float: left;

          span {
            vertical-align: middle;
          }

          input {
            vertical-align: middle;
          }
        }

        .option {
          padding: 10px;
          overflow: hidden;
          float: left;

          a {
            float: left;
            padding: 0 10px;
            color: #666;
          }
        }

        .money-box {
          float: right;

          .chosed {
            line-height: 26px;
            float: left;
            padding: 0 10px;
          }

          .sumprice {
            width: 200px;
            line-height: 22px;
            float: left;
            padding: 0 10px;

            .summoney {
              color: #c81623;
              font-size: 16px;
            }
          }

          .sumbtn {
            float: right;

            a {
              display: block;
              position: relative;
              width: 96px;
              height: 52px;
              line-height: 52px;
              color: #fff;
              text-align: center;
              font-size: 18px;
              font-family: "Microsoft YaHei";
              background: #e1251b;
              overflow: hidden;
            }
          }
        }
      }
    }
</style>
