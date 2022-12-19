import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { Storage } from '@ionic/storage'
export const store = new Storage();

import VueAxios from "vue-axios";
import axios from "axios";
import auth from "@/plugins/auth";

import { IonicVue } from '@ionic/vue';

/* TailwindCSS */
import "@/assets/styles/tailwind.css";

const app = createApp(App)
export default app
app.use(IonicVue)
app.use(router);
app.use(auth)
app.use(VueAxios, axios)

store.create().then(async () => {
  router.isReady().then(() => {
    app.mount('#app');
  });
})