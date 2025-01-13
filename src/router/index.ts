import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/homepage/home.vue'
import { usePermissStore } from '@/stores/permiss';
import { useUserStore } from '@/stores/userdata';
const routes= [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页',
          permiss: [0,1]
        },
        component: () => import('../views/homepage/dashboard.vue'),
      },
      {
        path: '/parking',
        name: 'parking',
        meta: {
          title: '停车场',
           permiss: [0,1]
        },
        component: () => import('../views/parking/parking.vue'),
      },
      {
        path: '/permiss',
        name: 'permiss',
        meta: {
          title: '权限管理',
          permiss: [0],
        },
        component: () => import('../views/adminOnly/permission.vue'),
      },
      {
        path: '/AITalk',
        name: 'AITalk',
        meta: {
          title: '智能AI管家',
           permiss: [0,1]
        },
        component: () => import('../views/AItalk/AItalk.vue'),
      },
      {
        path: '/myhelp',
        name: 'myhelp',
        meta: {
          title: '维护求助',
           permiss: [0,1]
        },
        component: () => import('../views/repare/myhelp.vue'),
      }
      ,
      {
        path: '/fees',
        name: 'fees',
        meta: {
          title: '生活费用',
           permiss: [0,1]
        },
        component: () => import('../views/fee/fee.vue'),
      },
      {
        path: '/notice',
        name: 'notice',
        meta: {
          title: '公告消息',
           permiss: [0,1]
        },
        component: () => import('../views/notice/notice.vue'),
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '信息填写',
           permiss: [0,1]
        },
        component: () => import('../views/userInfo/userInfo.vue'),
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: '注册',
    },
    component: () => import('../views/login/register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '没有权限',
    },
    component: () => import('../views/errorPages/403.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// 路由守卫
const whiteList = ["/register", "/login","/403","/404"];

router.beforeEach(async(to, from, next) => {
  // 如果是白名单的路由就不需要检查本地存储是否有用户数据，其他路由需要有用户数据，否则跳转登录
  if (whiteList.includes(to.path)) {
    next();
  } else {
    if (localStorage.getItem("Token")) {
      const userStore = useUserStore();
      const userRole = parseInt(userStore.personInfo.role);
      if (!(to.meta.permiss.includes(userRole))) {
        next('/403');
      } else { 
        const permissStore=usePermissStore()
        permissStore.getCurrentPermiss()
        next();
      }
    } else {
      next("/login");
    }
  }
});
export default router

