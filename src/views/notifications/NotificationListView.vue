<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-5 py-5">
      <p class="text-xl font-semibold text-gray-900 dark:text-gray-300">Notifications</p>
      <div class="divide-y divide-gray-200 dark:divide-gray-800 mt-4 mb-4">
        <ul role="list">
          <li v-for="notification in notifications" :key="notification.id" class="relative bg-white dark:bg-gray-800 py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div class="flex justify-between space-x-3">
              <div class="min-w-0 flex-1">
                <RouterLink to="#" class="block focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <p class="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{{ notification.sender }}</p>
                  <p class="truncate text-sm text-gray-500 dark:text-gray-400 mt-1">{{ notification.subject }}</p>
                </RouterLink>
              </div>
              <time :datetime="notification.datetime" class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ notification.time }}</time>
            </div>
            <div class="mt-2">
              <p class="text-sm text-gray-600 dark:dark:text-gray-400 line-clamp-2">{{ notification.preview }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "NotificationListView",
  data() {
    return {
      notifications: [
        {
          id: 1,
            subject: 'Unknown device connected',
            sender: 'DYNASTY: Security Alert',
            time: '1d ago',
            datetime: '2022-12-29T12:00',
            preview: 'In Berlin, someone has just registered with your data. We have registered you as a user from Stuttgart. This change of location is unusual, is it really you?',
        },
        {
          id: 2,
            subject: 'Unknown device connected',
            sender: 'DYNASTY: Security Alert',
            time: '2d ago',
            datetime: '2022-12-28T13:00',
            preview: 'In Berlin, someone has just registered with your data. We have registered you as a user from Stuttgart. This change of location is unusual, is it really you?',
        },
      ]
    }
  }
}
</script>