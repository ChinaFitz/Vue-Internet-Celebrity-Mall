import axios from 'axios';

// 网络请求进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

let requests = axios.create({
    //基础路径
    baseURL: '/api',
    //请求不能超过5S
    timeout: 5000,
});

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use(config => {
    // 网络请求进度条开始
    nprogress.start();

    let uuid = localStorage.getItem("UUID")
    let token = localStorage.getItem("TOKEN")
    if(uuid) config.headers.userTempId = uuid
    if(token) config.headers.token = token

    return config;
});

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
    res => {
        //// 网络请求进度条结束
        nprogress.done();
        return res.data;
    },
    err => {
        alert('服务器响应数据失败, 原因:', err);
    }
);

export default requests;
