<template>
    <div class="register-container">
        <!-- 注册内容 -->
        <div class="register">
            <h3>
                注册新用户
                <span class="go">我有账号，去 <router-link to="/login">登陆</router-link> </span>
            </h3>
            <div class="content">
                <label>手机号:</label>
                <input
                    placeholder="请输入你的手机号"
                    v-model="your_phone"
                    name="phone"
                    v-validate="{ required: true, regex: /^1\d{10}$/ }"
                    :class="{ invalid: errors.has('phone') }"
                />
                <span class="error-msg">{{ errors.first("phone") }}</span>
            </div>
            <div class="content">
                <label>验证码:</label>
                <input
                    placeholder="请输入你的验证码"
                    v-model="your_captcha"
                    name="code"
                    v-validate="{ required: true, regex: /^\d{6}$/ }"
                    :class="{ invalid: errors.has('code') }"
                />
                <button id="getCaptcha" @click="getCaptcha">获取验证码</button>
                <span class="error-msg">{{ errors.first("code") }}</span>
            </div>
            <div class="content">
                <label>登录密码:</label>
                <input
                    placeholder="请输入你的密码"
                    v-model="your_pwd"
                    name="password"
                    v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
                    :class="{ invalid: errors.has('password') }"
                />
                <span class="error-msg">{{ errors.first("password") }}</span>
            </div>
            <div class="content">
                <label>确认密码:</label>
                <input
                    placeholder="请输入确认密码"
                    v-model="your_pwd_again"
                    name="password1"
                    v-validate="{ required: true, is: password }"
                    :class="{ invalid: errors.has('password1') }"
                />
                <span class="error-msg">{{ errors.first("password1") }}</span>
            </div>
            <div class="controls">
                <input
                    type="checkbox"
                    v-model="read_protocol"
                    name="agree"
                    v-validate="{ required: true, agree: true }"
                    :class="{ invalid: errors.has('agree') }"
                />
                <span>同意协议并注册《好物商城用户协议》</span>
                <span class="error-msg">{{ errors.first("agree") }}</span>
            </div>
            <div class="btn">
                <button @click="register">完成注册</button>
            </div>
        </div>

        <!-- 底部 -->
        <div class="copyright">
            <ul>
                <li>关于我们</li>
                <li>联系我们</li>
                <li>联系客服</li>
                <li>商家入驻</li>
                <li>营销中心</li>
                <li>手机好物</li>
                <li>销售联盟</li>
                <li>好物社区</li>
            </ul>
            <div class="address">地址：广东省中山市东区街道</div>
            <div class="beian">
                <a href="https://beian.miit.gov.cn/" target="_blank">备案号: 粤ICP备2021178257号</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                your_phone: "",
                your_captcha: "",
                your_pwd: "",
                your_pwd_again: "",
                read_protocol: "",
            }
        },
        methods: {
            async getCaptcha() {
                if (this.your_phone) {
                    let captcha = await this.$store.dispatch("getCaptcha", {phone: this.your_phone})
                    .catch(e => alert(e))
                    // 获取到来自服务器的验证码后直接自动输入到 页面中
                    this.your_captcha = captcha
                }else {
                    alert("没有填写正确的手机号...")
                }
            },
            async register() {
                const allValided = await this.$validator.validateAll()
                if (allValided) {
                    let {your_phone, your_captcha, your_pwd, your_pwd_again, read_protocol} = this
                    if (your_phone && your_captcha && your_pwd && your_pwd_again && read_protocol) {
                        if (your_pwd === your_pwd_again) {
                            const register_params = {
                                phone: your_phone,
                                password: your_pwd,
                                code: your_captcha,
                            }
                            let r = await this.$store.dispatch("register", register_params).catch(e=>alert(e))
                            alert("用户注册成功...")
                            this.$router.push({name: "Login"})
                        }else {
                            alert("请确认两次密码输入是否一致...")
                        }
                    }else {
                        alert("请完整填写所有需要的注册信息...")
                    }
                }
            }
        },
        computed: {

        },
    }
</script>

<style lang="less" scoped>
    a {
        text-decoration: none;
    }
    .register-container {
      .register {
        width: 1200px;
        height: 445px;
        border: 1px solid rgb(223, 223, 223);
        margin: 0 auto;

        h3 {
          background: #ececec;
          margin: 0;
          padding: 6px 15px;
          color: #333;
          border-bottom: 1px solid #dfdfdf;
          font-size: 20.04px;
          line-height: 30.06px;

          span {
            font-size: 14px;
            float: right;

            a {
              color: #e1251b;
            }
          }
        }

        div:nth-of-type(1) {
          margin-top: 40px;
        }

        .content {
          padding-left: 390px;
          margin-bottom: 18px;
          position: relative;

          label {
            font-size: 14px;
            width: 96px;
            text-align: right;
            display: inline-block;
          }

          input {
            width: 270px;
            height: 38px;
            padding-left: 8px;
            box-sizing: border-box;
            margin-left: 5px;
            outline: none;
            border: 1px solid #999;
          }

          img {
            vertical-align: sub;
          }

          .error-msg {
            position: absolute;
            top: 100%;
            left: 495px;
            color: red;
          }
        }

        .controls {
          text-align: center;
          position: relative;

          input {
            vertical-align: middle;
          }

          .error-msg {
            position: absolute;
            top: 100%;
            left: 495px;
            color: red;
          }
        }

        .btn {
          text-align: center;
          line-height: 36px;
          margin: 17px 0 0 55px;

          button {
            outline: none;
            width: 270px;
            height: 36px;
            background: #e1251b;
            color: #fff !important;
            display: inline-block;
            font-size: 16px;
          }
        }
      }

      .copyright {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;

        a {
            cursor: default;
            &:hover {
                text-decoration: none;
            }
        }

        ul {
          li {
            display: inline-block;
            border-right: 1px solid #e4e4e4;
            padding: 0 20px;
            margin: 15px 0;
          }
        }
      }

      #getCaptcha {
          width: 100px;
          height: 37px;
          font-size: 14px;
          margin-left: 15px;
      }
    }
</style>
