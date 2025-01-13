import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件
import permission from './utils/permission'
import { useUserStore } from './stores/userdata'
import useStore from 'element-plus/es/components/table/src/store/index.mjs'
const app = createApp(App)

const pinia = createPinia()
 
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(permission)
// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
