<script setup lang="ts">
useHead({
  script: [{
    src: 'https://telegram.org/js/telegram-web-app.js?56',
  }]
})

console.log(window.Telegram.initData);
</script>
<template>
  <div>
    Неверный miniapp
  </div>
</template>