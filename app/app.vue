<script setup lang="ts">
const { data } = useFetch("/api/auth/challange")
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    {{ data }}
  </div>
</template>
