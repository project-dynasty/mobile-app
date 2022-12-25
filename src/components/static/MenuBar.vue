<template>
  <footer class="bg-white shadow-lg w-full dark:bg-gray-800 dark:text-gray-100">
    <nav class="flex items-center justify-around p-4 dark:hover:text-gray-200">
      <RouterLink to="/home" class="text-gray-600 dark:text-gray-100 dark:hover:text-gray-200 w-full md:w-1/4 px-2 py-1 text-center">
        <div class="flex items-center justify-center my-2 text-xl">
          <i class="fas fa-home"></i>
        </div>
        <!-- <span class="text-base ml-2">Homepage</span> -->
      </RouterLink>
      <RouterLink to="/explore" class="text-gray-600 dark:text-gray-100 dark:hover:text-gray-200 w-full md:w-1/4 px-2 py-1 text-center">
        <div class="flex items-center justify-center my-2 text-xl">
          <i class="fas fa-magnifying-glass"></i>
        </div>
        <!-- <span class="text-base ml-2">Explore</span> -->
      </RouterLink>
      <RouterLink to="/notifications" class="text-gray-600 dark:text-gray-100 dark:hover:text-gray-200 w-full md:w-1/4 px-2 py-1 text-center">
        <div class="flex items-center justify-center my-2 text-xl">
          <i class="fas fa-bell"></i>
        </div>
        <!-- <span class="text-base ml-2">Notifications</span> -->
      </RouterLink>
      <RouterLink to="/profile" class="text-gray-600 dark:text-gray-100 dark:hover:text-gray-200 w-full md:w-1/4 px-2 py-1 text-center">
        <div class="flex items-center justify-center my-2 text-xl">
          <i class="fas fa-user-circle"></i>
        </div>
        <!-- <span class="text-base ml-2">Your Profile</span> -->
      </RouterLink>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'MenuBar',
}
</script>