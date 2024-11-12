<script setup lang="ts">
import { toast } from "vue3-toastify"

const courseStore = useCourse()
const lessonStore = useLesson()
const route = useRoute()
const router = useRouter()

let form = ref<{ name: string; shortDescription: string }>({
  name: "",
  shortDescription: "",
})

let imagesFormData = new FormData()

let photoPreview = ref()
function uploadLogo(file: File) {
  // example filename: logo_216262666.jpg
  imagesFormData.set('logo', file, 'logo_' + String(Date.now()) + '.jpg')
  // make a preview
  let reader = new FileReader();
  reader.onloadend = function () {
    photoPreview.value = reader.result
  }
  reader.readAsDataURL(file);
}


let loading = ref(false)
async function submit() {
  loading.value = true
  let courseId = route.query.course_id?.toString()
  if (courseId) {
    let res = await courseStore.createLesson(form.value, courseId)
    if (res.status.value == "success") {
      let lessonsFromCourse = await courseStore.getLessonsByCourseId(courseId)
      if (lessonsFromCourse.status.value == "success") {
        let lesson_id = lessonsFromCourse.data.value.lessons.pop()._id
        let uplRes = await lessonStore.uploadImages(imagesFormData, lesson_id)
        if (uplRes.status.value == 'success') {
          loading.value = false
          toast("Урок создан", {
            type: "success",
            autoClose: 500,
            onClose: () => {
              router.back()
            },
          })
        } else {
          console.log(uplRes);
          toast("Ошибка при создании", {
            type: "error",
            autoClose: 2000,
            onClose: () => {
              window.location.reload()
            },
          })
        }
      }
    }
  }
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text-2xl font-semibold">Создать урок</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-text-field v-model="form.name" label="Название" variant="outlined"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea v-model="form.shortDescription" label="Описание" variant="outlined"></v-textarea>
      </v-col>
      <v-col cols="12">
        <ImageInput @uploadImage="uploadLogo" />
        <div class="logo" v-if="photoPreview">
          <img :src="photoPreview" alt="">
        </div>
      </v-col>
      <v-col cols="12">
        <i>videos are coming soon...</i>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn size="x-large" @click="submit" :loading="loading">создать</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
