<template>
  <ul>
    <li>
      <RouterLink to="/news">News</RouterLink>
      <i class="fa fa-newspaper w-4 h-4"></i>
    </li>
    <li>
      <RouterLink to="/explore">Explore</RouterLink>
      <i class="fa fa-magnifying-glass w-4 h-4"></i>
    </li>
    <li>
      <RouterLink to="/notifications">Notifications</RouterLink>
      <i class="fa fa-bell w-4 h-4"></i>
    </li>
    <li>
      <RouterLink to="/profile">Profile</RouterLink>
      <i class="fa fa-user w-4 h-4"></i>
    </li>
  </ul>
</template>

<script>
export default {
  name: "MenuBar"
}
</script>
