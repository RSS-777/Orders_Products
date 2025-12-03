import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Arrival from '../views/Arrival.vue';
import Groups from '../views/Groups.vue';
import Products from '../views/Products.vue';
import Users from '../views/Users.vue';
import Settings from '../views/Settings.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: "/login", component: Login },
  {
    path: '/',
    redirect: '/arrival',
  },
  {
    path: '/arrival',
    name: 'Orders',
    component: Arrival,
  },
  {
    path: '/groups',
    name: 'groups',
    component: Groups,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
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
  const isAuth = store.getters["auth/isAuth"];

  if (!isAuth && to.path !== "/login") next("/login");
  else if (isAuth && to.path === "/login") next("/arrival");
  else next();
});

export default router;
