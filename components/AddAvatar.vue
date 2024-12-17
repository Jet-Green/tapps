<script setup>
import { ref, watch } from "vue"
import "cropperjs/dist/cropper.css"
import Cropper from "cropperjs"

let loadedImages = ref([])
let preview = ref({})
let previewImage = ref(null)
let imageInput = ref(null)
let cropper

let isAvatarHovered = ref(false)

const emit = defineEmits(["uploadImage"])

function uploadImage() {
  loadedImages.value = imageInput.value.files
  // console.log(loadedImages.value[0].originFileObj);
  if (loadedImages.value.length) {
    let reader = new FileReader()
    reader.onloadend = () => {
      preview.value = { img: reader.result, name: loadedImages.value[0].name }
      previewImage.value.src = preview.value.img
    }
    reader.readAsDataURL(loadedImages.value[0])
  } else {
    preview.value = null
  }
}
async function crop() {  
  if (cropper) {
    await cropper
      .getCroppedCanvas({
        fillColor: "#fff",
        width: 450,
        // height: 425,
        // imageSmoothingEnabled: false,
        // imageSmoothingQuality: 'low',
      })
      .toBlob(
        (blob) => {
          emit("uploadImage", blob)
          try {
            // loadedImages.value = []
          } catch (err) {
            console.log(err)
          }
        },
        "image/jpeg",
        0.95
        // quality is
        // 0.9,
      )
  }
}
watch(preview, () => {
  cropper = new Cropper(previewImage.value, {
    aspectRatio: 1,
    maxContainerWidth: 300,
    maxContainerHeight: 300,
    minContainerWidth: 300,
    minContainerHeight: 300,
    // minCanvasWidth: 300,
    // maxCanvasWidth: 300,
    // minCanvasHeight: 300,
    // maxCanvasHeight: 300,
    guides: true,
    center: true,
    cropend() {
      crop();
    }
    // ready: function () {
    //     console.log('ready');
    //     cropperReady.value = true;
    // },
  })
})
</script>
<template>
  <v-row>
    <v-col cols="12">
      <input type="file" accept="image/*" ref="imageInput" id="upload" @change="uploadImage" style="display: none" />

      <v-row>
        <v-col cols="12" class="pa-0">
          <img v-if="loadedImages.length" ref="previewImage" style="width: 50vw; height: 50vh" />

          <label for="upload">
            <div
              v-if="!loadedImages.length"
              class="d-flex justify-center align-center flex-column"
              style="height: 50vh; cursor: pointer"
            >
              <div class="circle" @mouseover="isAvatarHovered = true" @mouseleave="isAvatarHovered = false">
                <v-icon v-if="isAvatarHovered">mdi-cloud-upload</v-icon>
                <span v-else class="text-gray-600 dark:text-gray-300">
                  <v-icon>mdi-account</v-icon>
                </span>
              </div>
            </div>
          </label>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
.circle {
  height: 90%;
  aspect-ratio: 1;
  background-color: #4b5563;
  border-radius: 99999px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  transition: 0.2s ease;
}
.circle:hover {
  background-color: #2072e5;
}
</style>
