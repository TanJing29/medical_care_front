import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
installElementPlus(app)
app
    .use(store)
	.use(VueAxios, axios)
    .use(router)
    .mount('#app')