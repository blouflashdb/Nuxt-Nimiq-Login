<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()
</script>

<template>
  <div>
    <div v-if="loggedIn">
      <h1>Welcome {{ user?.address }}!</h1>
      <button @click="clear">
        Logout
      </button>
    </div>
    <div v-else>
      <h1>Not logged in</h1>
      <LoginButton />
    </div>
  </div>
</template>
