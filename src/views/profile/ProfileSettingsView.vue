<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-5 py-5">
      <p class="text-xl font-semibold text-gray-900 dark:text-gray-300">Profile Settings</p>
      <div class="buttons mt-4">
        <button @click="registerPush" class="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-cyan-700 focus:ring-transparent dark:bg-cyan-400 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-cyan-500 dark:focus:ring-transparent">Push Register</button>
        <br>
        <div class="mt-3"></div></div>
        <button @click="register" class="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-cyan-700 focus:ring-transparent dark:bg-cyan-400 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-cyan-500 dark:focus:ring-transparent">Register</button>
      <div class="mt-5 flex justify-center sm:mt-0">
        <a href="#" class="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">View profile</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileSettingsView",
  mounted() {
    this.$news.load()
  },
  methods: {
    registerPush(){
      alert('Register Push!')
      this.$device.registerPush()
    },
    register(){
      alert('Register!')
      this.$device.registerDevice()
    }
  }
}
</script>