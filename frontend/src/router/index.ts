import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Arrival from '../views/Arrival.vue';
import Groups from '../views/Groups.vue';
import Products from '../views/Products.vue';
import Users from '../views/Users.vue';
import Settings from '../views/Settings.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/',
    redirect: '/arrival',
  },
  {
    path: '/arrival',
    name: 'Orders',
    component: Arrival,
    meta: { roles: ['admin', 'manager', 'viewer'] }
  },
  {
    path: '/groups',
    name: 'groups',
    component: Groups,
    meta: { roles: ['admin', 'manager', 'viewer'] }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: { roles: ['admin', 'manager', 'viewer'] }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: { roles: ['admin'] }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: { roles: ['admin'] }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const isAuth = store.getters['auth/isAuth'];
  const role = store.getters['auth/role'];
  const publicPages = ['/login', '/register'];

  if (!isAuth && !publicPages.includes(to.path)) {
    return next('/login');
  }

  if (Array.isArray(to.meta.roles) && !to.meta.roles.includes(role)) {
    return next('/');
  }

  next();
});

export default router;
