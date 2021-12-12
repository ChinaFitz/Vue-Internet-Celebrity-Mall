//统一管理项目接口的模块

//引入二次封装的axios（带有请求、响应的拦截器）
import request from './ajax';
import Carousel_And_Floor_Mock_Request from './mockAjax'

//三级菜单的请求地址  /api/product/getBaseCategoryList   GET    没有任何参数
export const reqgetCategoryList = () => request.get(`/product/getBaseCategoryList`);

// 轮播图请求, 数据来自于mock模拟
export const Carousel = () => Carousel_And_Floor_Mock_Request.get(`/banner`);

// 底部烧水壶轮播图
export const Floor = () => Carousel_And_Floor_Mock_Request.get(`/floor`);


// 搜索商品接口
export const searchGoodsInfo = (params) => request.post(`/list`, params);


// 获取商品详情接口
export const getGoodDetail = (skuid) => request.get(`/item/${skuid}`);


// 添加到购物车(对已有物品进行数量改动)接口
export const addGoodToCar = (skuid, skuNum) => request.post(`/cart/addToCart/${skuid}/${skuNum}`);


// 获取购物车已加入商品接口
export const getCart = () => request.get(`/cart/cartList`);


// 删除购物车商品接口
export const deleteGood = (skuid) => request.delete(`/cart/deleteCart/${skuid}`);


// 改变商品的选中状态接口
export const changeSelect = (skuid, isChecked) => request.get(`/cart/checkCart/${skuid}/${isChecked}`);


// 获取手机验证码接口
export const getCaptcha = (phone) => request.get(`/user/passport/sendCode/${phone}`);


// 用户注册接口
export const register = (params) => request.post(`/user/passport/register`, params);


// 用户登录接口
export const login = (params) => request.post(`/user/passport/login`, params);


// 登录后获取用户信息接口
export const getUserInfo = () => request.get(`/user/passport/auth/getUserInfo`);


// 退出登录接口
export const logout = () => request.get(`/user/passport/logout`);


// 获取用户的常用地址接口
export const getUserAddress = () => request.get(`/user/userAddress/auth/findUserAddressList`);


// 获取用户登录后加入购物车的商品信息接口
export const getOrderInfo = () => request.get(`/order/auth/trade`);


// 用户订单提交接口
export const commit_order = (tradeNo, tradeInfo) => request.post(`/order/auth/submitOrder`, tradeInfo, {params: {tradeNo}});


// 用户支付接口
export const getPaymentInfo = (orderId) => request.get(`/payment/weixin/createNative/${orderId}`);


// 获取支付状态接口
export const get_pay_status = (orderId) => request.get(`/payment/weixin/queryPayStatus/${orderId}`);


// 获取个人订单接口
export const get_orders = (page, limit) => request.get(`/order/auth/${page}/${limit}`);
