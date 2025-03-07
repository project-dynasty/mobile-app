<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-5 py-5">
      <div class="flex items-center justify-between ">
        <div class="flex justify-start">
          <p class="text-xl font-semibold text-gray-900 dark:text-gray-300">Profile</p>
        </div>
        <div class="flex justify-end">
          <RouterLink to="/profile/settings">
            <i class="fa fa-gear h-4 w-4 text-gray-900 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400" />
          </RouterLink>
        </div>
      </div>
      <div class="mt-4">
        <section aria-labelledby="profile-overview-title">
          <div class="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
            <div class="bg-white dark:bg-gray-800 p-6">
              <div v-if="user.imageUrl" class="flex-shrink-0">
                <img class="mx-auto h-20 w-20 rounded-full" :src="user.imageUrl" alt="profile-picture" />
              </div>
              <div v-else class="flex-shrink-0">
                <img class="mx-auto h-20 w-20 rounded-full" src="https://avatars.githubusercontent.com/u/57936?v=4" alt="profile-picture" />
              </div>
              <div class="mt-4 text-center sm:text-left">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ greeting }}</p>
                <p v-if="user.name" class="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">{{ user.name }}</p>
                <p v-else class="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">{{ user.name }}</p>
                <p v-if="user.permissions.role" class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ user.permissions.role }}</p>
              </div>
              <div class="mt-5 flex justify-center sm:mt-0">
                <span v-if="user.permissions.team.length > 0" class="flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-400 shadow-sm dark:hover:bg-gray-800 mr-2">{{ user.permissions.team }}</span>
                <span v-if="user.permissions.beta" class="flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-400 shadow-sm dark:hover:bg-gray-800">Beta</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>


<script>
import {store} from "@/main";

export default {
  name: "ProfileView",
  computed: {
    greeting() {
      const currentTime = new Date().getHours();

      if (currentTime >= 5 && currentTime < 12) {
        return "Good Morning,";
      } else if (currentTime >= 12 && currentTime < 17) {
        return "Hello,";
      } else if (currentTime >= 17 && currentTime < 22) {
        return "Good Evening,";
      } else {
        return "Good Night,";
      }
    },
  },
  async mounted() {
    const user = await store.get('user')
    this.user.name = user.account.firstName
    this.user.imageUrl = 'data:image/png;base64, '+user.account.avatarBase64
    const groups = await this.$device.getUserGroups()
    if(!(groups && groups.length > 0))
      return
    this.user.permissions.role = groups[0].displayName
    this.user.permissions.team = groups[0].team
    this.user.permissions.beta = await this.$auth.hasPermission("tcp.beta")
  },
  data() {
    return {
      user: {
        name: '',
        imageUrl: 'https://avatars.githubusercontent.com/u/50241630?v=4',
        permissions: {
          beta: false,
          team: '',
          role: ''
        }
      },
    }
  }
}
</script>
