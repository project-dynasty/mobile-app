<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-5 py-5">
      <p class="text-xl font-semibold text-gray-900 dark:text-gray-300">Profile Settings</p>
      <div class="buttons mt-4">
        <button @click="registerPush"
                class="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-cyan-700 focus:ring-transparent dark:bg-cyan-400 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-cyan-500 dark:focus:ring-transparent">
          Push Register
        </button>
        <br>
      </div>
      <button @click="register"
              class="mt-3 inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-cyan-700 focus:ring-transparent dark:bg-cyan-400 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-cyan-500 dark:focus:ring-transparent">
        Register
      </button>
      <br>
      <button @click="signInWithApple"
              class="mt-3 inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-cyan-700 focus:ring-transparent dark:bg-cyan-400 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-cyan-500 dark:focus:ring-transparent">
        Mit Apple anmelden
      </button>
      <div class="mt-3">

        <button @click="startScan"
                class="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-cyan-700 focus:ring-transparent dark:bg-cyan-400 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-cyan-500 dark:focus:ring-transparent">
          QR Code Scannen
        </button>

      </div>
    </div>
    <ModalConfirm :open="open" @reject="unclaim" @accept="solve"></ModalConfirm>
  </div>
</template>

<script>

import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {ASAuthorizationAppleIDRequest, SignInWithApple} from "@awesome-cordova-plugins/sign-in-with-apple";
import ModalConfirm from "@/components/ModalConfirm.vue";

export default {
  name: "ProfileSettingsView",
  components: {ModalConfirm},
  async mounted() {
    if (this.$route.query.qr) {
      this.open = true
      const result = await this.$auth.claimChallenge(this.$route.query.qr)
      if(!result){
        this.open = false
        return
      }
      this.challenge = this.$route.query.qr
    }
  },
  data() {
    return {
      open: false,
      challenge: ""
    }
  },
  methods: {
    openModal(){
      this.$auth.open()
      console.log(this.$open)
    },
    async startScan() {
      await BarcodeScanner.checkPermission({force: true});
      await BarcodeScanner.prepare()
      document.querySelector('body').style = "visibility: hidden;";
      let canceled = false
      const timeout = setTimeout(async () => {
        document.querySelector('body').style = "";
        await BarcodeScanner.stopScan();
        canceled = true
      }, 5 * 1000)

      const result = await BarcodeScanner.startScan();
      if(!canceled){
        clearTimeout(timeout)
        document.querySelector('body').style = "";
      }
      if (result.hasContent) {
        const challenge = JSON.parse(result.content)
        console.log(challenge)
        await this.$auth.claimChallenge(challenge.challenge)
        console.log("CLAIMED CHALLENGE")
        this.challenge = challenge.challenge
        this.open = true
      }
    },
    async unclaim() {
      await this.$auth.unclaim(this.challenge)
      this.challenge = ""
      this.open = false
    },
    async solve(){
      await this.$auth.solve(this.challenge)
      this.challenge = ""
      this.open = false
    },
    registerPush() {
      alert('Register Push!')
      this.$device.registerPush()
    },
    register() {
      alert('Register!')
      this.$device.registerDevice()
    },
    async signInWithApple() {
      const response = await SignInWithApple.signin([ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail])
      console.info(response.authorizationCode)
      console.log(response.email)
      console.log(response)
    }
  }
}
</script>