<script setup lang="ts">
onMounted(() => {
  console.log('Ооо, привет, я смотрю, ты заполз куда надо, у нас есть вакансии по адресу https://t.me/eternity_strange_man, будем ждать тебя, сладкий!')
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
/* .layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
} */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(2px);
}
</style>