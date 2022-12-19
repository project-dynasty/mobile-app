<template>
  <div class="flex h-screen">
    <div class="m-auto">
      <h1 class="font-bold">Maintenance</h1>
      <p v-if="fullPageDevelopment" class="font-semibold">This App is currently in maintenance. Try again later.</p>
      <p v-else class="font-semibold">This page is currently under development. Try again later.</p>
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
