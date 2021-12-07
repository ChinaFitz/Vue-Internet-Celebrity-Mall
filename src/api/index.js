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
