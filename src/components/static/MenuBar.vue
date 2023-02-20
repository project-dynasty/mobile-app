<template>
  <footer id="footer" class="bg-gray-200 shadow-lg w-full dark:bg-gray-800 dark:text-gray-100 rounded-t-2xl opacity-90">
    <nav class="flex items-center justify-around p-4 dark:hover:text-gray-200">
      <!--TODO: hover color und light theme default color-->
      <RouterLink to="/home" :class="{ 'text-cyan-600 dark:text-cyan-300': $route.path === '/home' }" class="w-full md:w-1/4 px-2 py-1 text-center opacity-100">
        <div class="flex items-center justify-center my-2 text-xl">
          <i class="fas fa-home"></i>
        </div>
      </RouterLink>
      <RouterLink to="/explore" :class="{ 'text-cyan-600 dark:text-cyan-300': $route.path === '/explore' }" class="w-full md:w-1/4 px-2 py-1 text-center opacity-100">
        <div class="flex items-center justify-center my-2 text-xl">
          <i class="fas fa-magnifying-glass"></i>
        </div>
      </RouterLink>
      <RouterLink to="/notifications" :class="{ 'text-cyan-600 dark:text-cyan-300': $route.path === '/notifications' }" class="w-full md:w-1/4 px-2 py-1 text-center opacity-100">
        <div class="flex items-center justify-center my-2 text-xl">
          <i class="fas fa-bell"></i>
        </div>
      </RouterLink>
      <RouterLink to="/profile" :class="{ 'text-cyan-600 dark:text-cyan-300': $route.path === '/profile' }" class="w-full md:w-1/4 px-2 py-1 text-center opacity-100">
        <div class="flex items-center justify-center my-2 text-xl">
          <i class="fas fa-user-circle"></i>
        </div>
      </RouterLink>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'MenuBar',
  mounted() {
    console.log(this.$route.path)
  }
}
</script>