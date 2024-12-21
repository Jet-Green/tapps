<script setup lang="ts">
import type Tapp from "../../types/tapp.interface"

let props = defineProps<{
  data: Tapp
}>()

const router = useRouter()

let data = ref(props.data)
</script>
<template>
  <div class="mobile-container">
    <div class="container">
      <div class="info">
        <h1 class="text-center">
          {{ data.name }}
        </h1>

        <img class="logo" v-if="data.logoLink.length > 0" :src="data.logoLink" alt="" />
      </div>
      <div class="buttons">
        <NuxtLink v-for="(btn, index) of data.buttons" :to="btn.link" target="_blank">
          <button class="button">
            {{ btn.name }}
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.mobile-container {
  aspect-ratio: calc(414 / 896);
  width: 414px;
  border: 1px solid black;
  overflow-y: scroll;
}
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
    /* font-family: "blisspro-medium"; */
    font-family: "Reforma Grotesk Demi", sans-serif;
    letter-spacing: 1px;
    color: #c05d00;
    border: 0px;
    border-radius: 20px;
    padding: 20px;
    background-color: #EFEFEF;
    margin-top: 26px;
  }
  .button:active {
    transform: scale(0.92);
  }
}
</style>
