const getters = {
  sidebar: state => state.app.sidebar, 
  device: state => state.app.device, 
  token: state => state.user.token, // token 
  avatar: state => state.user.avatar,  // 用户头像
  name: state => state.user.name,   // 用户名
  permission_routes: state => state.permission.routes  // 导航数据 在components/Sidebar/index.vue中引入并将sidebar-item 中循环的数据改为permission.routes
}
export default getters
