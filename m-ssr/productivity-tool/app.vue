<template>
  <NuxtLayout>
    <NuxtPage :key="route.path" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
