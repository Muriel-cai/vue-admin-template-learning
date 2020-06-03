import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// import index1 from '@/views/form/index'
// import index2 from '@/views/form/index2'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/userManag',
  name: 'Managment',
  meta: {
    title: '系统管理',
    icon: 'example'
  },
  children: [{
    path: 'userManag',
    name: 'UserManag',
    component: () => import('@/views/management/userManag'),
    meta: {
      title: '用户管理'

    }
  },
  {
    path: 'resourceManag',
    name: 'ResourceManag',
    component: () => import('@/views/management/resourceManag'),
    meta: {
      title: '资源管理'

    }
  },
  {
    path: 'roleManag',
    name: 'RoleManag',
    component: () => import('@/views/management/roleManag'),
    meta: {
      title: '角色管理'

    }
  },
  {
    path: 'rightsManag',
    name: 'RightsManag',
    component: () => import('@/views/management/rightsManag'),
    meta: {
      title: '权限管理'

    }
  }
  ]
},

{
  path: 'external-link',
  component: Layout,
  children: [{
    path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    meta: {
      title: 'External Link',
      icon: 'link'
    }
  }]
},


]
export const asyncRoutes = [{
  path: '/form',
  component: Layout,
  redirect: '/form/index1',
  meta: {
    title: 'form',
    icon: 'form'
  },
  children: [{
    path: 'index1',
    name: 'a',
    component: () => import('@/views/form/index'),
    meta: {
      title: '子菜单一',
      icon: 'form'
    }
  }, {
    path: 'index2',
    name: 'b',
    component: () => import('@/views/form/index2'),
    meta: {
      title: '子菜单二',
      icon: 'form'
    }
  }]
}, {
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: {
    title: 'Example',
    icon: 'example'
  },
  children: [{
    path: 'table',
    name: 'Table',
    component: () => import('@/views/table/index'),
    meta: {
      title: 'Table',
      icon: 'table'
    }
  },
  {
    path: 'tree',
    name: 'Tree',
    component: () => import('@/views/tree/index'),
    meta: {
      title: 'Tree',
      icon: 'tree'
    }
  }
  ]
},
// 404 page页面必须放在最后 切记 （防止addRoutes动态添加路由 刷新页面跳转404路由）!!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
