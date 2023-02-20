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
        <div class="mt-3"></div>
      </div>
      <button @click="register"
              class="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-cyan-700 focus:ring-transparent dark:bg-cyan-400 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-cyan-500 dark:focus:ring-transparent">
        Register
      </button>
      <br>
      <div class="mt-3">

        <button @click="startScan"
                class="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-cyan-700 focus:ring-transparent dark:bg-cyan-400 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-cyan-500 dark:focus:ring-transparent">
          QR Code Scannen
        </button>

      </div>
    </div>
  </div>
</template>

<script>

import {BarcodeScanner} from '@capacitor-community/barcode-scanner';

export default {
  name: "ProfileSettingsView",
  mounted() {
    this.$news.load()
  },
  methods: {
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
      }
    },
    registerPush() {
      alert('Register Push!')
      this.$device.registerPush()
    },
    register() {
      alert('Register!')
      this.$device.registerDevice()
    }
  }
}
</script>