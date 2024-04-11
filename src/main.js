import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/index'

const app = createApp(App)

app.use(router)
app.use(VueAxios,axios)
app.use(store)
app.mount('#a')
