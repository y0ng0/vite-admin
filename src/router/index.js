import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';

const modules = {
  ...import.meta.glob('../pages/**/*.vue'),
  ...import.meta.glob('../layout/**/*.vue')
};
function getComponent(webComponent) {
  return modules[webComponent]();
}

const routes = [
  {
    path: '/login',
    component: () => getComponent('../pages/LoginPage.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    component: () => getComponent('../layout/DefaultLayout.vue'),
    meta: {},
    children: [
      {
        path: 'user',
        name: 'UserManage',
        component: () => getComponent('../pages/UserManage.vue'),
        meta: {}
      },
      {
        path: 'order',
        name: 'OrderManage',
        component: () => getComponent('../pages/OrderManage.vue'),
        meta: {}
      },
      {
        path: 'product',
        name: 'ProductManage',
        component: () => getComponent('../pages/ProductManage.vue'),
        meta: {}
      },
      {
        path: 'category',
        name: 'CatalogManage',
        component: () => getComponent('../pages/CatalogManage.vue'),
      }
    ],
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // 获取用户 store 实例
  const { loginStatus } = storeToRefs(userStore); // 获取 isLogin 属性
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // 检查路由是否需要登录权限

  // 确保获取到最新的登录状态
  const isUserLoggedIn = loginStatus.value; // 获取最新的登录状态

  if (isUserLoggedIn) {
    // 如果路由需要登录权限且用户未登录，则重定向到登录页面
    next('/login');
  } else {
    next(); // 否则，继续路由跳转
  }
});

export default router;
