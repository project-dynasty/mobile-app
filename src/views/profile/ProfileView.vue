<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-5 py-5 flex">
      <div class="flex-col">
        <p class="text-xl font-semibold text-gray-900 dark:text-gray-300">Profile</p>
      </div>
      <div class="flex-col">
        <RouterLink to="/profile/settings">
          <i class="fa fa-gear h-4 w-4 text-gray-900 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "ProfileView"
}
</script>
