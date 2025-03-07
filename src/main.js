import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {Storage} from '@ionic/storage'
import VueAxios from "vue-axios";
import axios from "axios";
import auth from "@/plugins/auth";
import news from "@/plugins/news";
import infiniteScroll from 'vue-infinite-scroll'
import {App as t} from "@capacitor/app";
import {SplashScreen} from "@capacitor/splash-screen";

import {IonicVue} from '@ionic/vue';

/* TailwindCSS */
import "@/assets/styles/tailwind.css";
import device from "@/plugins/device";

export const store = new Storage();

axios.defaults.baseURL = 'https://tcp-api.project-dynasty.com'
axios.interceptors.request.use(async function (config) {
    const token = await store.get('token')
    if (token !== null) {
        config.headers["Authorization"] = "Bearer " + token;
    }
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

app.use(infiniteScroll)

t.addListener('appUrlOpen', (event) => {
    const slug = event.url.replace("https://app.project-dynasty.com", "")
    console.log(slug)
    console.log(slug.split("/"))
    if(slug.startsWith("/auth/qr")){
        router.push('/profile/settings?qr='+slug.split('/')[3])
    }
});

store.create().then(async () => {
    await SplashScreen.show({autoHide: false})
    const refresh = await store.get('refresh')
    let logout = false
    if (refresh != null && refresh.length > 0) {
        const renew = await app.$auth.getExpireDate() - Math.floor(new Date().getTime() / 1000)
        if (renew < 15) {
            const response = await app.$auth.refresh()
            if (!response)
                logout = true
        }
        await app.$auth.startRefreshInterval()
    }
    router.isReady().then(async () => {
        if (logout) {
            alert("Du wurdest ausgeloggt. Die App wurde zulange nicht geöffnet.")
            app.$auth.logout()
            window.location.reload()
        }
        app.$device.open()
        app.mount('#app');
    });
})
