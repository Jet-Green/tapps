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
  const hash = window.location.hash.slice(1);
  // alert(hash); // tgWebAppData=...&tgWebAppVersion=6.2&...

  const params = new URLSearchParams(tg.value.initData);
  alert(params.get('start_param'));
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