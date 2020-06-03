import {
  asyncRoutes,
  constantRoutes
} from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) { // 这里传了router中匹配好的 asyncRoutes 数据  和接口中返回的路由数据
  const res = []
  routes.forEach(v => {
    if(roles){
      roles.forEach((item, index) => {
        if (item.name === v.name) {
          if (item.children && item.children.length > 0) {        
            v.children = filterAsyncRoutes(item.children, v.children)  
            res.push(v)
          } else {
            res.push(item)
          }
        }
      })
    }
    
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    console.log(routes, 'SET_ROUTES')
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions = { 
  generateRoutes({ // 在外层的permission.js文件中调用拿到了 动态的路由数据 
    commit
  }, data) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, data)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
