<script setup lang="ts">
const route = useRoute()

const uploadStatus = ref<String>("")
const uploadProgress = ref<Number | null>(null)
const chunkSize = 1024 * 1024 * 5 // 1 MB
let mp4FileName = ""

const emit = defineEmits(["upload-finished"])

let loading = ref<boolean>(false)

const handleFileUpload = async (event: any) => {
  const file = event.target.files[0]
  if (file) {
    loading.value = true
    await uploadFileInChunks(file)
    await convertVideo()
    await uploadToYandexCloud()
    loading.value = false
  }
}

const uploadToYandexCloud = async () => {
  uploadStatus.value = "Загрузка в облако..."

  const response = await $fetch("/api/hls-to-yandex-cloud", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type
    },
    body: JSON.stringify({
      lessonId: route.query.lesson_id,
    }), // Convert the body to a JSON string
  })
  if (response.success) {
    // console.log(response);
    uploadStatus.value = "Загрузка завершена, можете продолжать работу"
    emit("upload-finished", `lesson-videos/${route.query.lesson_id}/playlist.m3u8`)
  }
}

const convertVideo = async () => {
  const lessonId = route.query.lesson_id
  const body = {
    mp4FileName,
    lessonId,
  }
  uploadStatus.value = "Конвертация! Пожалуйста, подождите"

  const response = await fetch("/api/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type
    },
    body: JSON.stringify(body), // Convert the body to a JSON string
  })

  if (response.ok) {
    uploadStatus.value = "Конвертация завершена!"
  }
}

const uploadFileInChunks = async (file: File) => {
  if (!route.query.lesson_id) return

  const totalChunks = Math.ceil(file.size / chunkSize)
  const fileName = route.query.lesson_id + "_" + file.name
  mp4FileName = fileName

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const chunk = file.slice(start, end)

    const formData = new FormData()
    formData.append("file", chunk, fileName)
    formData.append("chunkIndex", chunkIndex.toString())
    formData.append("totalChunks", totalChunks.toString())
    formData.append("fileName", fileName)
    formData.append("lessonId", route.query.lesson_id.toString())

    try {
      const response = await fetch("/api/upload-chunk", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        uploadProgress.value = Math.round(((chunkIndex + 1) / totalChunks) * 100)
        if (chunkIndex == totalChunks - 1) {
          // mp4Path = response;

          // emit('upload-finished', response)
          setTimeout(() => {
            uploadProgress.value = null
          }, 1000)
          return
        }
      } else {
        uploadStatus.value = "Ошибка при загрузке чанка!"
        break
      }
    } catch (error) {
      console.error("Error uploading chunk:", error)
      uploadStatus.value = "Возникла ошибка при загрузке чанка! Нажмите F12 и отправьте её разработчику"
      break
    }
  }

  uploadStatus.value = "Видео загружено!"
}
</script>

<template>
  <div>
    <!-- <v-file-input label="Видео" show-size variant="outlined" accept="video/*" v-model="videos"></v-file-input> -->

    <input type="file" accept="video/*" @change="handleFileUpload" />
    <div v-if="uploadProgress !== null">
      <p>Upload Progress: {{ uploadProgress }}%</p>
    </div>
    <div v-if="uploadStatus">{{ uploadStatus }}</div>
    <v-progress-circular indeterminate :size="40" v-if="loading"></v-progress-circular>
  </div>
</template>
