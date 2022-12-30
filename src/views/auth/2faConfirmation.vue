<template>
  <div class="px-5 py-5">
    <a>Confirm Authentication</a>
    <div class="text-center mt-10">
      <a class="m-10 p-5 rounded bg-cyan-300 cursor-pointer" v-for="number in numbers" :key="number"
         @click="confirm(number)">{{ number }}</a>
    </div>
  </div>
</template>

<script>
import app from "@/main";

export default {
  data() {
    return {
      numbers: [],
      token: ''
    }
  },
  methods: {
    async confirm(number) {
      try {
        const response = await app.axios.post('/auth/mobile-auth?token=' + this.token + '&confirmCode=' + number);
        alert("Status: "+response.status)
      } catch (e) {
        alert("Fehler: "+e.response.status)
      }
      this.$router.push('/')
    }
  },
  async mounted() {
    if (!this.$route.query.token || !this.$route.query.numbers) {
      this.$router.push('/')
      return
    }
    const {status} = await this.$auth.checkConfirmStatus(this.$route.query.token)
    if (status === 'error') {
      this.$router.push('/')
      return
    }
    this.numbers = this.$route.query.numbers.split(",")
    this.token = this.$route.query.token
  }
}
</script>