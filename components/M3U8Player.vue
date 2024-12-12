<script setup lang="ts">
import videojs from "video.js"
import "video.js/dist/video-js.css"

let videoPlayer: any = ref()
let player: any = null
let { src } = defineProps<{ src: String }>()

onMounted(() => {
  player = videojs(
    videoPlayer.value,
    {
      playbackRates: [0.5, 1, 1.5, 2],
      userActions: {
        doubleClick: myDoubleClickHandler
      },
      sources: [
        {
          src: src,
          type: "application/x-mpegURL",
        },
      ],
      autoplay: false,
      noUITitleAttributes: true,
      controls: true,
      responsive: true,
      experimentalSvgIcons: true,
      controlBar: {
        skipButtons: {
          forward: 10,
          backward: 10,
        },
      }
    },
  )

  function myDoubleClickHandler() {
    if (player.isFullscreen()) {
      player.exitFullscreen();
    } else {
      player.requestFullscreen();
    }
  };
  player.on('click', function () {
    if (!player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  });
})

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose()
  }
})
</script>
<template>
  <div class="w-full h-100">
    <link href="https://unpkg.com/video.js/dist/video-js.min.css" rel="stylesheet">
    <video ref="videoPlayer" class="video-js vjs-fluid" preload="auto"></video>
  </div>
</template>

<style>
.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-left: -1.5em;
  margin-top: -1em;
}

.video-js .vjs-big-play-button {
  /* background: linear-gradient(#7C3AED, #AB31B2, #DB2777) !important; */
  font-size: 2.5em !important;
  border-radius: 50% !important;
  height: 2em !important;
  line-height: 2em !important;
  margin-top: -1em !important;
  width: 2em !important;
  border: 0.1em solid #fff !important;
}

.video-js .vjs-control-bar {
  background: linear-gradient(to top, rgba(0, 0, 0, .75), transparent) !important;
  background-color: transparent;
  aspect-ratio: 6 / 1 !important;
}
</style>