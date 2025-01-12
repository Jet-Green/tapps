<script setup lang="ts">
definePageMeta({
  layout: "mini-app",
})
import { useWebApp } from "vue-tg"
import { useWebAppTheme } from "vue-tg"

const tg = useWebApp()
const theme = useWebAppTheme()
const router = useRouter()

function setTheme() {
  // theme.setBackgroundColor("", '#ffffff', "")
}

// let tg = ref<any>()

// async function initTelegram() {
//   tg.value = window?.Telegram?.WebApp
//   // console.log(tg);
//   const hash = window.location.hash.slice(1)
//   // alert(hash); // tgWebAppData=...&tgWebAppVersion=6.2&...

//   const params = new URLSearchParams(tg.value.initData)
//   let miniappId = params.get("start_param")
//   if (miniappId) {
//     router.push(`miniapp/${miniappId}`)
//   }
// }

onMounted(() => {
  tg.ready()
  setTheme()

  const initData = tg.initData
  console.log('initData', initData);
  
  const params = new URLSearchParams(initData)
  let miniappId = params.get("start_param")
  if (miniappId) {
    router.push(`miniapp/${miniappId}`)
  }
})
</script>
<template>
  <div>asdfdf</div>
</template>
