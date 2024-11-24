
<script setup>
const route = useRoute()

const uploadStatus = ref('');
const uploadProgress = ref(null);
const chunkSize = 1024 * 1024 * 5; // 1 MB

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
    
    try {
      const response = await fetch('/api/upload-chunk', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        uploadProgress.value = Math.round(((chunkIndex + 1) / totalChunks) * 100);
      } else {
        uploadStatus.value = 'Chunk upload failed!';
        break;
      }
    } catch (error) {
      console.error('Error uploading chunk:', error);
      uploadStatus.value = 'An error occurred during chunk upload.';
      break;
    }
  }

  uploadStatus.value = 'File uploaded successfully!';
};
</script>

<template>
  <div>
    <h1>Upload Video by Chunks</h1>
    <input type="file" accept="video/*" @change="handleFileUpload" />
    <div v-if="uploadProgress !== null">
      <p>Upload Progress: {{ uploadProgress }}%</p>
    </div>
    <div v-if="uploadStatus">{{ uploadStatus }}</div>
  </div>
</template>