import { createRouter, createWebHistory } from 'vue-router';
import Arrival from '../views/Arrival.vue';
import Groups from '../views/Groups.vue';
import Products from '../views/Products.vue';
import Users from '../views/Users.vue';
import Settings from '../views/Settings.vue';

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
