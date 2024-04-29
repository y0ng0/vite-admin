import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import Router from '@/router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import '@/assets/style/reset.css';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const pinia = createPinia();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.provide('zhCnLocale', zhCn);

app
  .use(pinia)
  .use(Router)
  .mount('#app');
