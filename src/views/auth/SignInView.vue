<template>
  <!-- TODO: Center the content -->
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 select-none">Username</label>
          <!-- TODO: Add input validation errors -->
          <div class="mt-1">
            <input v-model="username" :disabled="disabled" id="username" name="username" type="text"
                   autocomplete="username" required="" placeholder="johndoe"
                   class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 "/>
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 select-none">Password</label>
          <!-- TODO: Add input validation errors -->
          <div class="mt-1">
            <input v-model="password" :disabled="disabled" id="password" name="password" type="password"
                   autocomplete="current-password" required="" placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎"
                   class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 "/>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input v-model="remember" :disabled="disabled" id="remember-me" name="remember-me" type="checkbox"
                   class="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-transparent"/>
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 select-none">Remember me</label>
          </div>

          <div class="text-sm">
            <RouterLink to="/auth/forget-password" class="font-medium text-cyan-600 hover:text-cyan-500 select-none">
              Forgot your password?
            </RouterLink>
          </div>
        </div>

        <div>
          <!-- TODO: Add loading animation on loading -->
          <button @click.prevent="authenticate" :disabled="disabled"
                  class="flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:ring-transparent disabled:cursor-not-allowed disabled:bg-cyan-700">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignInView",
  data() {
    return {
      username: '',
      password: '',
      disabled: false,
      wrongInput: false,
      wrongData: false,
      remember: false,
    }
  },
  methods: {
    async authenticate() {
      // TODO: Add input validation
      // TODO: Send information toasts
      this.disabled = true;
      if (this.username && this.password) {
        const login = await this.$auth.login(this.username, this.password)
        this.disabled = false
        if (login.status === '2fa') {
          this.$router.push('/auth/2fa')
          return
        }
        if (login.status === 'ok') {
          this.$router.push('/')
          return
        }
        alert(JSON.stringify(login))
      } else {
        console.log('input please!')
        setTimeout(() => {
          this.loading = false
          this.disabled = false;
        }, 2000)
      }
    }
  }
}
</script>