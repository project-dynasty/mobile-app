<template>
  <ion-app>
    <router-view/>
  </ion-app>
</template>

<script lang="js">
import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';
import "@/assets/styles/tailwind.css";

export default defineComponent({
  name: 'App',
  components: {
    IonApp
  }
});
</script>