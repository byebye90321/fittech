import Vue from 'vue';
import axios from 'axios';
import router from '../router';

// axios 配置
axios.defaults.timeout = 30000;


axios.defaults.baseURL = 'https://020e-60-249-112-124.ngrok.io/api';
Vue.prototype.webURL = "https://020e-60-249-112-124.ngrok.io/api"


// create an axios instance
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout
// })

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (sessionStorage.token) { //判断token是否存在
            config.headers.Authorization = sessionStorage.token;  //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status) {
            sessionStorage.removeItem('manager')
            if(!sessionStorage.isAlert){
                window.sessionStorage["isAlert"] = true;
                setTimeout(()=>{
                    sessionStorage.removeItem('isAlert')
                },1000)
                if (error.response.data.code == 400) {
                    sessionStorage.removeItem('token')
                    alert(error.response.data.message)
                    router.replace('/index');
                    return
                } else if (error.response.data.code == 401) {
                    //alert("請先登入!")
                    alert(error.response.data.message)
                    sessionStorage.removeItem('token')
                    router.replace('/login');
                    return
                } else if (error.response.data.code == 403) {
                    alert(error.response.data.message)
                    router.replace('/page403');
                }
                else if (error.response.data.code == 404) {
                    alert(error.response.data.message)
                    router.replace('/page404');
                } else {
                    alert(error.response.data.message)
                    sessionStorage.removeItem('token')
                    router.replace('/login');
                    
                    return
                }
                
            }



            // if (error.response.data.code != 400) {
            //     if (error.response.data.code == 404) {
            //         router.replace('/404');
            //     }
            //     else {
            //         alert(error.response.data.message)
            //         sessionStorage.removeItem('token')
            //         router.replace('/login');
            //     }

            // }
            // alert("連線愈時，請重新登錄！")
            // sessionStorage.removeItem('token')
            // router.replace('/pages/login');

            return Promise.reject(error.response);
        }
    });
export default axios;