import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';

import store from './store';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');

if (import.meta.env.VITE_APP_MODE === 'development') {
  (window as any).store = store;
}
