<template>
    <div class="orders">
        <table class="order-item" v-for="order in ordersInfo.records" :key="order.id">
            <thead>
                <tr>
                    <th colspan="5">
                        <span class="ordertitle"
                            >{{ order.createTime }}　订单编号：{{ order.outTradeNo }}
                            <span class="pull-right delete"><img src="../images/delete.png" /></span
                        ></span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(od, index) in order.orderDetailList" :key="od.id">
                    <td width="60%">
                        <div class="typographic">
                            <img style="width: 82px; height: 82px;" :src="od.imgUrl" />
                            <a href="#" class="block-text"
                                >{{ od.skuName }}</a
                            >
                            <span>x{{ od.skuNum }}</span>
                            <a href="#" class="service">售后申请</a>
                        </div>
                    </td>
                    <td v-if="index === 0" :rowspan="order.orderDetailList.length" width="8%" class="center">{{ order.consignee }}</td>
                    <td v-if="index === 0" :rowspan="order.orderDetailList.length" width="13%" class="center">
                        <ul class="unstyled">
                            <li>总金额¥{{ order.totalAmount }}</li>
                            <li>在线支付</li>
                        </ul>
                    </td>
                    <td v-if="index === 0" :rowspan="order.orderDetailList.length" width="8%" class="center">
                        <a href="#" class="btn">{{ order.orderStatusName }} </a>
                    </td>
                    <td v-if="index === 0" :rowspan="order.orderDetailList.length" width="13%" class="center">
                        <ul class="unstyled">
                            <li>
                                <a href="mycomment.html" target="_blank">评价|晒单</a>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>



        <!-- 分页器 -->
        <div class="choose-order">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="ordersInfo.size"
                :total="ordersInfo.total"
                :current-page="currentPage"
                @current-change="page"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { get_orders } from "@/api"

    export default {
        name: "Porder", // 指定组件名
        data: function () {
            return {
                ordersInfo: {},
                currentPage: 1,
                limit: 5,
            }
        },
        methods: {
            // 获取个人的所有历史订单
            async get_orders() {
                let r = await get_orders(this.currentPage, this.limit).catch(e => alert(e))
                if (r.code == 200) {
                    this.ordersInfo = r.data
                }else {
                    alert(r.message)
                }
            },
            // 当分页器的页数被人为改变时
            page(index) {
                this.currentPage = index
                this.get_orders()
            },
        },
        mounted() {
            this.get_orders()
        },
    }
</script>

<style lang="less" scoped></style>
