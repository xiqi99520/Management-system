import axios from 'axios'
import qs from 'qs'
// import router from '../router'
// import store from '../store'
// import {
//   LOGOUT
// } from '../store/mutation-types'

const env = process.env
const context = env.CONTEXT
axios.defaults.timeout = 30000 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
axios.defaults.baseURL = '' // 配置接口地址
if (process.env.NODE_ENV === 'production' && process.env.BASE_DIR === '/h5') {
  axios.defaults.baseURL = 'https://app.moledata.cn/' // 配置接口地址
}
axios.defaults.withCredentials = true // 跨域开关
// axios.default.paramsSerializer.use(
//   params => {
//     debugger
//     return qs.stringify(params, {arrayFormat: 'brackets'})
//   }
// )

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === 'post' &&
      config.url !== `${context}/loanApply/agencyPredictMoney` &&
      !config.url.startsWith(`${context}/entering/write`) &&
      config.url !== `${context}/user/addSingleUser` &&
      config.url !== `${context}/user/updateUser` &&
      config.url !== `${context}/public/getDict`) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    // _.toast("错误的传参", 'fail');
    return Promise.reject(error)
  })

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    // 对响应数据做些事
    return res
  },
  error => {
    // store.commit('LOG_OUT')
    // router.go(0)
    // _.toast("网络异常", 'fail');
    return Promise.reject(error)
  })

// 返回一个Promise
export function fetch (url, params = {}, method = 'get', config = {}) {
  return new Promise((resolve, reject) => {
    if (method === 'get' && Object.keys(params).length) {
      url += `?${qs.stringify(params, {arrayFormat: 'brackets'})}`
    }
    axios[method.toLocaleLowerCase()](url, params, config)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        })
      .catch((error) => {
        reject(error)
      })
  })
}

// 返回处理一堆的Promise
export function fetchAll (requests = []) {
  return axios.all(requests).then(
    axios.spread((...responses) => {
      return responses
    })
  )
}
