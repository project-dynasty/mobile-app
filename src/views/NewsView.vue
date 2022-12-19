<template>
  <div>
    <h1>Hallo</h1>
    <button @click="register">REGISTRIEREN</button>
    <button @click="registerPush">PUSH REGISTRIEREN</button>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$news.load()
  },
  methods: {
    registerPush(){
      this.$device.registerPush()
    },
    register(){
      this.$device.registerDevice()
    }
  }
}
</script>
