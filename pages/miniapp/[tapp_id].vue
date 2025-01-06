<script setup lang="ts">
definePageMeta({
  layout: "mini-app",
})

const route = useRoute()
const tappStore = useTapp()

let tapp = ref<any>()

let tappId = String(route.params?.tapp_id)

if (tappId) {
  let res = await tappStore.getById(tappId)
  if (res.status.value == "success") {
    tapp.value = res.data.value
  } else {

  }
}
</script>
<template>
  <div class="container" v-if="tapp._id">
    <div class="info">
      <h1 class="text-center">
        {{ tapp.name }}
      </h1>

      <img class="logo" v-if="tapp.logoLink?.length > 0" :src="tapp.logoLink" alt="" />
    </div>
    <div class="buttons">
      <NuxtLink v-for="(btn, index) of tapp.buttons" :to="btn.link">
        <button class="button">
          {{ btn.name }}
        </button>
      </NuxtLink>
    </div>
  </div>
  <div v-else class="error">
    <h1>Неверная ссылка на Miniapp</h1>
    <img class="error-img" src="../../public/images/loudly-crying-face.webp" alt="">
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.logo {
  max-width: 65%;
}
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  .button {
    text-decoration: none;
    /* color: #c05d00; */
    /* font-weight: 600; */
    font-size: 25px;
    transition: 0.2s ease;
    color: #c05d00;
    border: 0px;
    border-radius: 20px;
    padding: 20px;
    background-color: #efefef;
    margin-top: 26px;
  }
  .button:active {
    transform: scale(0.92);
  }
}

.error {
  height: 100vh;
  padding-top: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.error-img {
  max-width: 70vw;
  min-width: 30vw;
}
</style>
