<script setup lang="ts">

const emit = defineEmits(['uploadImage'])
let logoInput = ref<{
  files: File[]
}>({
  files: []
})
function uploadImage() {
  const file = logoInput.value.files[logoInput.value.files.length - 1]
  emit('uploadImage', file)
  console.log(file.name);
}
</script>
<template>
  <div>
    <!-- <input type="file" accept="image/*" ref="logoInput" id="uploadLogo" @change="uploadImage" style="display: none"> -->
    <label for="uploadLogo">
      <div class="file-input-label">
        <v-icon icon="mdi-camera" size="x-large" />
        <span class="explanation text-center">логотип курса</span>
      </div>
    </label>
  </div>
</template>
<style scoped lang="scss">
.file-input-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px dashed black;
  padding: 10px;
  border-radius: 5px;
  width: 100px;
  aspect-ratio: 1;
  margin: 10px;
}
</style>