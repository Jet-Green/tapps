<script setup lang="ts">
definePageMeta({
  layout: "mini-app",
})
const router = useRouter();
let tg = ref<any>();

async function initTelegram() {
  tg.value = window?.Telegram?.WebApp;
  // console.log(tg);
  const hash = window.location.hash.slice(1);
  // alert(hash); // tgWebAppData=...&tgWebAppVersion=6.2&...

  const params = new URLSearchParams(tg.value.initData);
  let miniappId = params.get('start_param')
  if (miniappId) {
    router.push(`miniapp/${miniappId}`)
  }
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