import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {Storage} from '@ionic/storage'
import VueAxios from "vue-axios";
import axios from "axios";
import auth from "@/plugins/auth";
import news from "@/plugins/news";
import {IonicVue} from '@ionic/vue';


/* TailwindCSS */
import "@/assets/styles/tailwind.css";
import device from "@/plugins/device";

export const store = new Storage();

axios.defaults.baseURL = 'https://tcp-api.project-dynasty.com'
axios.interceptors.request.use(async function (config) {
    const token = await store.get('token')
    if (token !== null)
        config.headers["Authorization"] = "Bearer " + await store.get('token');
    return config;
});


const app = createApp(App)

export default app

app.use(IonicVue)
app.use(VueAxios, axios)
app.use(router)
app.use(auth)
app.use(device)
app.use(news)
store.create().then(async () => {
    router.isReady().then(async () => {
        app.mount('#app');
    });
})
