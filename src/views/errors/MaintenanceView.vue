<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <div class="m-auto px-5 py-5">
      <p class="text-xl font-semibold text-gray-900 dark:text-gray-300">Maintenance</p>
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
