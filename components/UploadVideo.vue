<script setup>
const route = useRoute()

const uploadStatus = ref('');
const uploadProgress = ref(null);
const chunkSize = 1024 * 1024 * 5; // 1 MB
let mp4Path = '';

const emit = defineEmits(['upload-finished'])

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadFileInChunks(file);
  }
};

const uploadFileInChunks = async (file) => {
  const totalChunks = Math.ceil(file.size / chunkSize);
  const fileName = route.query.lesson_id + '_' + file.name;

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append('file', chunk, fileName);
    formData.append('chunkIndex', chunkIndex);
    formData.append('totalChunks', totalChunks);
    formData.append('fileName', fileName);
    formData.append('lessonId', route.query.lesson_id)
    
    try {
      const response = await fetch('/api/upload-chunk', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        uploadProgress.value = Math.round(((chunkIndex + 1) / totalChunks) * 100);
        if (chunkIndex == totalChunks - 1) {
          // mp4Path = response;
          // console.log(response);
          
          // emit('upload-finished', response)
          return
        }
      } else {
        uploadStatus.value = 'Ошибка при загрузке чанка!';
        break;
      }
    } catch (error) {
      console.error('Error uploading chunk:', error);
      uploadStatus.value = 'Возникла ошибка при загрузке чанка! Нажмите F12 и отправьте её разработчику';
      break;
    }
  }

  uploadStatus.value = 'Видео загружено!';
};
</script>

<template>
  <div>
    <!-- <v-file-input label="Видео" show-size variant="outlined" accept="video/*" v-model="videos"></v-file-input> -->

    <h1>Upload Video by Chunks</h1>
    <input type="file" accept="video/*" @change="handleFileUpload" />
    <div v-if="uploadProgress !== null">
      <p>Upload Progress: {{ uploadProgress }}%</p>
    </div>
    <div v-if="uploadStatus">{{ uploadStatus }}</div>
  </div>
</template>