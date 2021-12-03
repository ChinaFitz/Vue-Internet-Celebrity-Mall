import axios from 'axios';
import nprogress from 'nprogress';
//引入进度条样式了
import 'nprogress/nprogress.css';
let requests = axios.create({
    //基础路径
    baseURL: '/mock',
    //请求不能超过5S
    timeout: 5000,
});

requests.interceptors.request.use(config => {
    nprogress.start();
    return config;
});

requests.interceptors.response.use(
    res => {
        nprogress.done();
        return res.data;
    },
    err => {
        alert('服务器响应数据失败', err);
    }
);
export default requests;
