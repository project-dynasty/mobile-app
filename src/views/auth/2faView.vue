<template>
  <!--
    TODO: Add animation for the toast notification
    TODO: Add more feedback toast notifications
  -->
  <div class="flex h-screen dark:bg-gray-800">
    <div class="m-auto px-5 py-5">
      <div class="2fa">
        <label for="2facode" class="block text-sm font-medium text-gray-700 dark:text-gray-400">2FA Code</label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <input v-if="wrongInput" type="text" name="2facode" id="2facode" v-maska data-maska="### ###"
                 v-model="this.codeData" @keyup.enter="this.authenticate()"
                 class="block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                 placeholder="123 456" aria-invalid="true" aria-describedby="2facode-error"/>
          <input v-else type="text" name="2facode" id="2facode" v-maska data-maska="### ###" v-model="this.codeData"
                 @keyup.enter="this.authenticate()"
                 class="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                 placeholder="123 456" aria-describedby="2facode-description"/>
          <div v-if="wrongInput" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <i class="fa fa-circle-exclamation h-4 h-4 text-red-500" aria-hidden="true"></i>
          </div>
        </div>
        <p v-if="wrongInput" class="mt-2 text-sm text-red-600" id="2facode-error">Your code must be 6 characters long.
          Try this again.</p>
        <p v-else class="mt-2 text-sm text-gray-500" id="2facode-description">The code is in your Two Factor Authentication Mobile App.</p>

        <div class="flex items-center justify-start mt-4">
          <div class="text-base font-medium" @click="backToLogin()">
            <a class="font-medium text-cyan-600 hover:text-cyan-500 select-none cursor-pointer">
              <span aria-hidden="true"> &larr;</span>
              Back to the Login
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- BEGIN: Toast Notification -->
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <SimpleToast v-if="this.notificationVisibility" :title="this.notificationTitle" :icon="this.notificationIcon"
                   :description="this.notificationDescription"/>
    </div>
  </div>
  <!-- END: Toast Notification -->
</template>

<script>
import {vMaska} from "maska"
import SimpleToast from "@/components/notifications/toasts/SimpleToast";
import {store} from "@/main";

export default {
  name: "2faView",
  components: {SimpleToast},
  data() {
    return {
      codeData: '',
      disabled: false,
      wrongInput: false,
      notificationVisibility: false,
      notificationTitle: '',
      notificationIcon: '',
      notificationDescription: '',
      timeout: 0
    }
  },
  mounted() {
    this.timeout = setInterval(async () => {
      const token = await store.get('signin_token')
      const response = await this.$auth.checkConfirmStatus(token)
      if (response.status === 'ok'){
        clearInterval(this.timeout)
        await this.$auth.resetSignIn()
        await this.$auth.startRefreshInterval()
        this.$router.push('/')
      }
      if(response.status === 'error'){
        clearInterval(this.timeout)
        await this.$auth.resetSignIn()
        this.$router.push('/')
      }
    }, 5000)
  },
  directives: {maska: vMaska},
  watch: {
    codeData() {
      if (this.codeData.length >= 7) {
        if (this.disabled) {
          console.warn('disabled');
        } else {
          this.authenticate()
          this.disabled = true;
          setTimeout(() => {
            this.disabled = false;
          }, 3500)
        }
      }
    }
  },
  methods: {
    async backToLogin() {
      await this.$auth.resetSignIn()
      this.$router.push('/')
    },
    async authenticate() {
      this.disabled = true;
      if (this.codeData.length === 7) {
        const response = await this.$auth.confirm(this.codeData.replaceAll(' ', ''))
        alert(JSON.stringify(response))
      } else {
        this.wrongInput = true;
        this.notificationTitle = 'Invalid input length';
        this.notificationIcon = 'fa fa-xmark text-red-600';
        this.notificationDescription = 'Your entry has to be 6 characters long.';
        this.notificationVisibility = true;
        setTimeout(() => {
          this.disabled = false;
          this.notificationVisibility = false;
        }, 2500)
      }
    }
  }
}
</script>
