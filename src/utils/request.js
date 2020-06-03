import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({   // 设置自己的后台地址 
  baseURL: 'http://10.9.1.179:9101', // url = base url + request url process.env.VUE_APP_BASE_API
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // console.log(getToken(), config, 'config')
      config.headers['Token'] = getToken()  // 将Token 定义到headers中
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error, '0') // for debug
    return Promise.reject(error)
  }
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
    const res = response.data

    // 根据后台返回的code（后台返回状态值）作为判断 ，如果不是则判断为错误
    if (res.code !== 200) {
      Message({
        message: res.message  || 'Error01',
        type: 'error',
        duration: 5 * 1000000000000000
      })
      if (res.code === 101) {
        console.log('这里是到 清除resetToken')
        store.dispatch('user/resetToken').then(() => {
          // removeToken()
          location.reload()
        })
      }  
      // 如果有更多返回状态要判断 可以在下面继续写方法
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   console.log(res.code)
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     console.log('这里是到 清除resetToken')
      //     store.dispatch('user/resetToken').then(() => {
      //       // removeToken()
      //       location.reload()
      //     })
      //   })
      // }

      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message ,
      type: 'error',
      duration: 5 * 1000000000
    })
    return Promise.reject(error)
  }
)

export default service
