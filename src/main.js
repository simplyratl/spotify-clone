import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'

// Vue.prototype.$http = axios

axios.interceptors.request.use(
  function (config) {
    // Get the base URL from the environment variable
    config.baseURL = import.meta.env.VITE_API_BASE_URL

    // You can also add other headers or configuration here

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
