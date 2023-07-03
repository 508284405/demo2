import axios from 'axios'

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
  baseURL: 'http://192.168.3.65:8080', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => config
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response;
  }
)
class Result {
  code: number;
  message: string;
  data: any;
  constructor(code: 0,message: '',data: any){
      this.code = code
      this.message =message
      this.data=data
  }
}
export {Result} 

export default service

 

