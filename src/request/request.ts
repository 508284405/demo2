import axios from 'axios'
import whiteList from './whitelist'
import {refresh} from '../api/login/login'
import common from './common'
//允许发送cookie
axios.defaults.withCredentials = true
// declare module "axios" {
//   interface AxiosResponse<T = any> {
//     Result: null;
//     // 这里追加你的参数
//   }
//   export function create(config?: AxiosRequestConfig): AxiosInstance;
// }


// create an axios instance
const service = axios.create({
  // baseURL: 'http://chenyp.top:8008', // url = base url + request url
  baseURL: common.baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(function (config) {
  if(config.url && whiteList.includes(config.url)){
      return config
  }
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  const token = sessionStorage.getItem("token")
  if (token != "null") {
    config.headers.Authorization = token
  }else{
    window.location.href='/login'
  }
  return config
}, function (error) {
  window.location.href='/login'
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // console.log("eeee")
  // 对响应错误做点什么
  if (error.response) {
    switch (error.response.status) {
      case 401:
        window.location.href='/login'
      case 402:
        //续费token
        const uid = sessionStorage.getItem("uid")
        if(uid){
          refresh(uid as unknown as number).then(res=>{
            if(res.data.code==0){
              const token = sessionStorage.setItem("token",res.data.data)
            }
          })
        }
        window.location.href='/login'
    }
  }
  return Promise.reject(error)
})
class Result {
  code: number;
  message: string;
  data: any;
  constructor(code: 0, message: '', data: any) {
    this.code = code
    this.message = message
    this.data = data
  }
}
export { Result }

export default service



