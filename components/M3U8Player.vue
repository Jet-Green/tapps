<script setup lang="ts">
import videojs from "video.js"
import "video.js/dist/video-js.css"

let videoPlayer: any = ref()
let player: any = null
let { src } = defineProps<{ src: String }>()
console.log(src);

onMounted(() => {
  // player.value = videojs(videoPlayer.value, {
  //   controls: true,
  //   // autoplay: true,
  //   preload: true,
  // })
  // player.value.src({
  //   src: src,
  //   type: "application/x-mpegURL",
  // })
  player = videojs(
    videoPlayer.value,
    {
      autoplay: false,
      controls: true,
      sources: [
        {
          src: src,
          type: "application/x-mpegURL",
        },
      ],
    },
    function onPlayerReady() {
      console.log("Player is ready!")
    }
  )
})

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose()
  }
})
</script>
<template>
  <div>
    <link href="https://vjs.zencdn.net/7.15.4/video-js.css" rel="stylesheet" />
    <video ref="videoPlayer" class="video-js vjs-default-skin" controls width="640" height="264"></video>
  </div>
</template>
