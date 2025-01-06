<script setup lang="ts">
onMounted(() => {
  window.Telegram?.WebApp?.ready();
})
</script>
<template>
  <!-- чистый layout для страницы самого mini app -->
  <div>
    <slot />
  </div>
</template>