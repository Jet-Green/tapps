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
  theme.setBackgroundColor('#ffffff', '#ffffff')
  // theme.backgroundColor.value = '#ffffff';
}

let isMiniappCorrect = ref<boolean>(true)

onMounted(() => {
  tg.ready()
  setTheme()

  const initData = tg.initData
  console.log('initData', initData);
  
  const params = new URLSearchParams(initData)
  let miniappId = params.get("start_param")
  if (miniappId) {
    router.push(`miniapp/${miniappId}`)
  } else {
    isMiniappCorrect.value = false
  }
})
</script>
<template>
  <div class="wrong-miniapp" v-if="!isMiniappCorrect">
    <h1>
      Неверный miniapp 😭
    </h1>
  </div>
</template>
<style scoped lang="scss">
.wrong-miniapp {
  min-height: 80dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>