<!--
  TODO: Add Menu Bar
 -->
<template>
  <ion-app>
    <router-view/>
    <MenuBar v-if="menuBarVisible"></MenuBar>
  </ion-app>
</template>

<script lang="js">
import {IonApp} from '@ionic/vue';
import {defineComponent} from 'vue';
import "@/assets/styles/tailwind.css";
import MenuBar from "@/components/static/MenuBar";

export default defineComponent({
  name: 'App',
  data() {
    return {
      menuBar: true
    }
  },
  computed: {
    menuBarVisible() {
      if (!this.$route.meta) {
        console.log("first", !this.$route.meta)
        return true
      }
      if (this.$route.meta.menubar === undefined) {
        console.log("second", !this.$route.meta.menuBar)
        return true
      }
      return this.$route.meta.menubar
    }
  },
  components: {
    MenuBar,
    IonApp
  }
});
</script>
