<template>
  <div class="relative bg-gray-50 dark:bg-gray-900 px-5 pt-5 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
    <div class="relative mx-auto max-w-7xl">
      <p class="text-xl font-semibold text-gray-900 dark:text-gray-300">Home</p>
      <div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3" @scroll="handleScroll">
        <div v-for="article in articles" :key="article.title"
             class="flex flex-col overflow-hidden rounded-lg shadow-lg" >
          <div class="flex-shrink-0">
            <img class="h-48 w-full object-cover" :src="article.imageUrl" alt=""/>
          </div>
          <div class="flex flex-1 flex-col justify-between bg-white dark:bg-gray-800 p-6">
            <div class="flex-1">
              <p class="text-sm font-medium text-cyan-600">
                <RouterLink :to="article.category.url" class="hover:underline">{{
                    article.category.name
                  }}
                </RouterLink>
              </p>
              <RouterLink :to="article.url" class="mt-2 block">
                <p class="text-xl font-semibold text-gray-900 dark:text-gray-300">{{ article.title }}</p>
                <p class="mt-3 text-base text-gray-500 dark:text-gray-300">{{ article.description }}</p>
              </RouterLink>
            </div>
            <div class="mt-6 flex items-center">
              <div class="flex-shrink-0">
                <RouterLink :to="article.author.url">
                  <span class="sr-only">{{ article.author.name }}</span>
                  <img class="h-10 w-10 rounded-full" :src="article.author.imageUrl" alt=""/>
                </RouterLink>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-300">
                  <RouterLink :to="article.author.url" class="hover:underline">{{ article.author.name }}</RouterLink>
                </p>
                <div class="flex space-x-1 text-sm text-gray-500 dark:text-gray-300">
                  <time :datetime="article.datetime">{{ article.date }}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{{ article.readingTime }} read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disable: false,
      articles: [
        {
          title: 'Please play my game',
          url: '#',
          category: {name: 'Article', url: '#'},
          description:
              'I promise you, it\'s really not even that bad',
          date: 'Dec 30, 2022',
          datetime: '2022-12-30',
          imageUrl:
              'https://cdn.shopify.com/s/files/1/2231/6843/products/TropicalScreenshot_10_740x.png?v=1664505757',
          readingTime: '15 min',
          author: {
            name: 'Nico Kempe',
            url: '#',
            imageUrl:
                'https://avatars.githubusercontent.com/u/50241630?v=4',
          },
        },
        {
          title: 'Why you should not buy his game',
          url: '#',
          category: {name: 'Video', url: '#'},
          description:
              'I promise you, it is.',
          date: 'Dec 24, 2022',
          datetime: '2022-12-24',
          imageUrl:
              'https://cdn.shopify.com/s/files/1/2231/6843/products/SwampScreenshot_05_740x.png?v=1664505420',
          readingTime: '3 min',
          author: {
            name: 'Alexander Wodarz',
            url: '#',
            imageUrl:
                'https://avatars.githubusercontent.com/u/47042746?v=4',
          },
        },
        {
          title: 'Juice boxes should rule the world',
          url: '#',
          category: {name: 'Maintenance', url: '#'},
          description:
              'Anyone want to buy my juice box?',
          date: 'Dec 6, 2022',
          datetime: '2022-12-06',
          imageUrl:
              'https://cdn.shopify.com/s/files/1/2231/6843/products/MeadowScreenshot_02_740x.png?v=1664505110',
          readingTime: '1 min',
          author: {
            name: 'Maximilian Wiegmann',
            url: '#',
            imageUrl:
                'https://avatars.githubusercontent.com/u/42848896?v=4',
          },
        },
      ]
    }
  },
  mounted() {
    //this.$news.load()
  }
}
</script>