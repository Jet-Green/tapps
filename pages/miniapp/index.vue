<script setup lang="ts">
definePageMeta({
  layout: "app-page",
})

// useHead({
//   script: [{
//     src: 'https://telegram.org/js/telegram-web-app.js?56',
//     tagPosition: "head",
//     type: "text/javascript",
//     async: true
//   }]
// })

let tg = ref<any>();

function initTelegram() {
  tg.value = window?.Telegram?.WebApp;
  // console.log(tg);
  alert(JSON.stringify(tg.value.initData))
}
onMounted(() => {
  initTelegram();
})
</script>
<template>
  <div>
    <div>
      <!-- {{ tg }} -->
      Неверный miniapp
    </div>
  </div>
</template>