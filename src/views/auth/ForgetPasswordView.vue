<template>
  <!-- TODO: Center the content -->
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6">
        <div>
          <label for="resetMethodInput" class="block text-sm font-medium text-gray-700 select-none">Username or email</label>
          <!-- TODO: Add input validation errors -->
          <div class="mt-1">
            <input v-model="resetMethodInput" :disabled="disabled" id="resetMethodInput" name="resetMethodInput" type="text" autocomplete="resetMethodInput" required="" placeholder="johndoe@domain.com" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 " />
          </div>
        </div>

        <div class="flex items-center justify-end">

          <div class="text-sm">
            <RouterLink to="/auth/sign-in" class="font-medium text-cyan-600 hover:text-cyan-500 select-none">Remembered your password?</RouterLink>
          </div>
        </div>

        <div>
          <!-- TODO: Add loading animation on loading -->
          <!-- TODO: Add disabled state-->
          <button @click="sendVerification" class="flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:ring-transparent">Reset Password</button>
        </div>
      </form>
    </div>
  </div>
  <!-- TODO: Add toast error notifications -->
</template>

<script>
export default {
  name: "ForgetPasswordView",
  data() {
    return {
      disabled: false,
      resetMethodInput: ''
    }
  },
  methods: {
    async sendVerification() {
      // TODO: Add input validation
      // TODO: Add Password reset functionality
      // TODO: Send information toasts
      // TODO: Disable the disabled state again
      this.disabled = true;
      if(this.resetMethodInput) {
        console.log('the reset system is currently disabled')
      } else {
        console.log('you have to enter values')
      }
    }
  }
}
</script>