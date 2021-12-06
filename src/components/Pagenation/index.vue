<template>
    <div class="sui-pagination clearfix">
        <ul @click.prevent="goto_page">
            <li class="prev" :disabled="curPage === 1">
                <a href="#">«上一页</a>
            </li>
            <li>
                <a href="#" :class="{curPageClass: curPage === 1}">1</a>
            </li>
            <li>
                <a href="#" :class="{curPageClass: curPage === 2}" v-if="totalPage >= 2">2</a>
            </li>
            <li class="dotted" v-if="totalPage > continuous && continuous_end <= totalPage - 1">
                <span>...</span>
            </li>
            <li v-for="(num, index) in gap" :key="index">
                <a href="#" :class="{curPageClass: curPage === continuous_start + index}"> {{ continuous_start + index }}</a>
            </li>
            <li class="dotted" v-if="totalPage > continuous && continuous_end < totalPage - 1">
                <span>...</span>
            </li>
            <li>
                <a href="#" :class="{curPageClass: curPage === totalPage}" v-if="totalPage > continuous + 2"> {{ totalPage }} </a>
            </li>
            <li class="next" :disabled="curPage === totalPage">
                <a href="#">下一页»</a>
            </li>
        </ul>
        <div id="totalPages">
            <span>共 {{ totalPage }} 页&nbsp;</span>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Pagenation", // 指定组件名
        data: function () {
            return {
               curPage: this.currentPage,
               gap: this.continuous,
               continuous_start: 3,
            }
        },
        props: [
            "totalData",
            "pageSize",
            "continuous",
            "currentPage",
        ],
        computed: {
            totalPage() {
                return Math.ceil(this.totalData / this.pageSize)
            },
            continuous_end() {
                return this.continuous_start + this.continuous - 1
            }
        },
        methods: {
            goto_page($e){
                let pageNum = $e.target.innerText
                if(pageNum !== '...') {
                    // 当点击上一页或下一页按钮时
                    if(/上一页/g.test(pageNum)) {
                        this.curPage--
                    }else if (/下一页/g.test(pageNum)) {
                        this.curPage++
                    }else {
                        // 当点击对应页数的按钮时
                        this.curPage = Number(pageNum)
                    }
                }
            },
        },
        watch: {
            curPage(page_num) {
                // console.log("当前页数为", page_num)
                this.$emit("get_page", page_num)

                // 如果点击的是间隔中的最后一页
                if (page_num === this.continuous_end) {
                    this.continuous_start = this.continuous_end - Math.floor(this.continuous / 2)
                }

                // 如何点击的页数是第1 或 2页, 刷新间隔的页数
                if (page_num <= 2) {
                    this.continuous_start = 3
                }

                if (page_num <= 0) {
                    this.curPage = 1
                }

                if (page_num > this.totalPage) {
                    this.curPage = this.totalPage
                }
            },
            continuous_end(num) {
                if (num >= this.totalPage) {
                    this.continuous_start = this.totalPage - this.continuous
                }
            },
            totalPage: {
                immediate: true,
                handler(val) {
                    if (val <= this.continuous + 1) {
                        if (val <= 2) {
                            this.gap = 0
                        }else if(val > 2) {
                            this.gap = this.totalPage - 2
                        }
                    }else {
                        this.gap = 5
                    }
                }
            },
            props: {
                immediate: true,
                deep: true,
                handler() {
                    this.$forceUpdate()
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .sui-pagination {
        margin: 18px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1 1 auto;

        ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 800px;
            float: left;

            li {
                line-height: 18px;
                display: inline-block;

                a {
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    border: 1px solid #e0e9ee;
                    margin-left: -1px;
                    font-size: 14px;
                    padding: 9px 18px;
                    color: #333;
                }

                &.active {
                    a {
                        background-color: #fff;
                        color: #e1251b;
                        border-color: #fff;
                        cursor: default;
                    }
                }

                &.prev {
                    a {
                        background-color: #fafafa;
                    }
                }

                &.disabled {
                    a {
                        color: #999;
                        cursor: default;
                    }
                }

                &.dotted {
                    span {
                        margin-left: -1px;
                        position: relative;
                        float: left;
                        line-height: 18px;
                        text-decoration: none;
                        background-color: #fff;
                        font-size: 14px;
                        border: 0;
                        padding: 9px 18px;
                        color: #333;
                    }
                }

                &.next {
                    a {
                        background-color: #fafafa;
                    }
                }
            }
        }

        div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
        }

        #totalPages {
            position: relative;
            left: -12%;

            & > span {
                margin-left: 20px;
            }
        }

        .curPageClass {
            background-color: rgba(216, 213, 213, 0.3);
            border-color: rgba(216, 213, 213, 0.3);
            color: red
        }
    }
</style>
