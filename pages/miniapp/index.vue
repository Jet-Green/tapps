<script setup lang="ts">
definePageMeta({
  layout: "app-page",
})

useHead({
  script: [{
    src: 'https://telegram.org/js/telegram-web-app.js?56',
  }]
})
const w = window;
console.log();
</script>
<template>
  <ClientOnly>
    <div>
      {{ w?.Telegram }}
      Неверный miniapp
    </div>
  </ClientOnly>
</template>