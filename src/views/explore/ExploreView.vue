<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <SearchBar></SearchBar>
    <div class="px-5 py-5">
      <div class="flex items-center justify-between">
        <div class="flex justify-start">
          <p class="text-xl font-semibold text-gray-900 dark:text-gray-300">Explore</p>
        </div>
        <div class="flex justify-end">
          <a @click="screen.max">
            <i class="fa fa-magnifying-glass h-4 w-4 text-gray-900 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400" />
          </a>
        </div>
      </div>
      <div>
        <p>Content</p>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "ExploreView",
  components: {SearchBar}
}
</script>

