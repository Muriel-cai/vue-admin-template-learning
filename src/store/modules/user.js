import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'
// import {userPic} from './../../assets/user.jpg'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',   // 用户名
    avatar: '' // 头像
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
    // console.log('SET_TOKEN', name)
  },
  SET_AVATAR: (state, avatar) => {
    
    state.avatar = avatar || userPic
    // console.log(state.avatar ,'state.avatar ')
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    // console.log(userInfo, 'user.js')
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const data = response
        // Cookies.set('Token', response.accessToken) // 登录成功后将token存储在cookie之中
        commit('SET_TOKEN', data.accessToken)
        setToken(data.accessToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    console.log(commit, 'user.js-----getInfo', state)
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // console.log(response.resMsg, 'getInfo')
        const {
          data
        } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        // const {
        //   name,
        //   avatar
        // } = data
        // console.log(data.resMsg,"??????????????????")
        commit('SET_NAME', response.resMsg)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      // console.log(state.token, 'zhes')
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        commit('SET_NAME', '')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    // console.log(commit, ' 这是user.js 下的清除TOKEN')
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      // commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
