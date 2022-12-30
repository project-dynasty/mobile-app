<template>
  <div class="flex h-screen">
    <div class="m-auto px-5 py-5">
      <h1 class="font-bold">Maintenance</h1>
      <p v-if="fullPageDevelopment" class="font-semibold">This App is currently in maintenance.</p>
      <p v-else class="font-semibold">This page is currently under development.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MaintenanceView",
  data() {
    return {
      fullPageDevelopment: false,
    }
  }
}
</script>
