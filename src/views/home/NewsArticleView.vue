<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-5 py-5">
      <p class="text-xl font-semibold text-gray-900 dark:text-gray-300">News Article</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsArticleView",
  data() {
    return {
      newsData: {
        id: 0,
        title: '',
        description: '',
        category: '',
        bannerImg: '',
        readingTime: '0min',
        publishedDate: '2022-12-27',
        author: {
          name: '',
          href: '',
          icon: ''
        },
        intern: false,
      },
    }
  }
}
</script>
