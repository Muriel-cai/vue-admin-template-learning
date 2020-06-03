import request from '@/utils/request'
// 获取资源信息接口
export function getmanagment() {
  return request({
    url: '/menu/S003004',
    method: 'post'
  })
}
// 修改 资源信息接口
export function saveManag(data) {
  return request({
    url: '/menu/S003002',
    method: 'post',
    data
  })
}
// 添加资源子节点
export function addChildNodes(data) {
  return request({
    url: '/menu/S003001',
    method: 'post',
    data
  })
}

// 查询用户列表
export function getUserList(data) {
  return request({
    url: '/user/S001002',
    method: 'post',
    data
  })
}
// 新增用户信息
export function addUser(data) {
  return request({
    url: '/user/S001001',
    method: 'post',
    data
  })
}
// 修改用户信息
export function modifyUserInfo(data) {
  return request({
    url: '/user/S001003',
    method: 'post',
    data
  })
}
// 删除用户管理数据
export function deleteUserInfo(data) {
  return request({
    url: '/user/S001004',
    method: 'post',
    data
  })
}

// 查询角色列表
export function getroleList(data) {
  return request({
    url: '/role/S002001',
    method: 'post',
    data
  })
}

// 角色查询接口
export function getrightsM(data) {
  return request({
    url: '/user/S001007',
    method: 'post',
    data
  })
}
