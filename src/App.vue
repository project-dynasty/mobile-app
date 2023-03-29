<!--
  TODO: Add Menu Bar
 -->
<template>
  <div class="flex flex-col h-screen">
    <ion-app>
      <router-view class="flex-grow" @open="open = true"/>
      <MenuBar class="fixed bottom-0" v-if="menuBarVisible"></MenuBar>
      <ModalDemo :open="open" @close="open = false"></ModalDemo>
      <ModalMultiFactorConfirm :open="multiFactorConfirm" :numbers="multiFactorNumbers" :token="multiFactorToken" @close="multiFactorConfirm = false"></ModalMultiFactorConfirm>
    </ion-app>
  </div>
</template>

<script>
import {IonApp} from '@ionic/vue';
import "@/assets/styles/tailwind.css";
import MenuBar from "@/components/static/MenuBar";
import {Capacitor} from "@capacitor/core";
import {Device} from "@capacitor/device";
import ModalDemo from "@/components/ModalDemo.vue";
import ModalMultiFactorConfirm from "@/components/ModalMultiFactorConfirm.vue";
import app from "@/main";
import {SplashScreen} from "@capacitor/splash-screen";

export default {
  name: 'App',
  data() {
    return {
      open: false,
      menuBar: true,
      multiFactorConfirm: false,
      multiFactorNumbers: [],
      multiFactorToken: ''
    }
  },
  created() {
    app._instance = this
  },
  async mounted() {
    await SplashScreen.hide()
    if(this.$auth.getSaved().confirm){
      this.multiFactorToken = this.$auth.getSaved().token
      this.multiFactorNumbers = this.$auth.getSaved().numbers
      this.multiFactorConfirm = this.$auth.getSaved().confirm
    }
    if (Capacitor.getPlatform() === 'ios') {
      const app = document.getElementById("app")
      const footer = document.getElementById("footer")
      const info = await Device.getInfo()
      if (info.model.toString().startsWith("iPhone")) {
        const model = info.model.toString().replaceAll("iPhone", "")
        if (model.split(",")[0] >= '15'){
          app.style = "padding-top: 50px"
          footer.style = "padding-bottom: 15px"
        }
        else if (model.split(",")[0] >= '10' && model !== '14,6' && model !== '12,8'){
          app.style = "padding-top: 40px"
          footer.style = "padding-bottom: 15px"
        }
        else
          app.style = "padding-top: 20px"
      }
    }
  },
  computed: {
    menuBarVisible() {
      if (!this.$route.meta) {
        return true
      }
      if (this.$route.meta.menubar === undefined) {
        return true
      }
      return this.$route.meta.menubar
    }
  },
  components: {
    ModalMultiFactorConfirm,
    ModalDemo,
    MenuBar,
    IonApp
  }
};
</script>

<style>
@font-face {
  font-family: 'SF Pro';
  src: url('@/assets/fonts/sf-pro-text-regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

body {
  font-family: 'SF Pro', sans-serif;
}

</style>