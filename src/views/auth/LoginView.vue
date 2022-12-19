<template>
  <div class="shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div v-if="!status.status || status.status !== '2fa'" class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input v-model="username"
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="username" type="text" placeholder="Username">
    </div>
    <div v-if="!status.status || status.status !== '2fa'" class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>

      <input v-model="password"
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="password" type="password" placeholder="******">
      <!--input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
      <p class="text-red-500 text-xs italic">Please choose a password.</p-->
    </div>
    <div v-if="status.status && status.status === '2fa'" class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="2fa">
        Zwei Faktor Autorisierung
      </label>

      <input v-model="otp"
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="2fa" type="text" placeholder="XXX XXX">
      <!--input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
      <p class="text-red-500 text-xs italic">Please choose a password.</p-->
    </div>
    <div class="flex items-center justify-between">
      <button @click="login"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button">
        <template v-if="loading">LOADING</template>
        <template v-else>Sign In</template>
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginView',
  data() {
    return {
      loading: false,
      username: '',
      password: '',
      otp: '',
      status: {},
      twofa:{}
    }
  },
  methods: {
    async login() {
      this.loading = true
      if(this.status.status && this.status.status === '2fa'){
        this.twofa = await this.$auth.confirm(this.status.userid, this.otp)
        if(this.twofa.status === 'ok')
          this.$router.push('/')
        this.loading = false
        return
      }
      const login = await this.$auth.login(this.username, this.password)
      this.loading = false
      this.status = login
    }
  }
}
</script>
