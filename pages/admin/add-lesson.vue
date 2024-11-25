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
let visibleCropperModal = ref(false)
let dialog = ref(false);

let photoPreview = ref()
function uploadLogo(file: File) {
  imagesFormData.set('logo', file, 'logo_' + String(Date.now()) + '.jpg')
  let reader = new FileReader();
  reader.onloadend = function () {
    photoPreview.value = reader.result
  }
  reader.readAsDataURL(file);
  visibleCropperModal.value = false;
}

function deletePreview() {
  imagesFormData.set('logo', ' ')
  photoPreview.value = null
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
      <v-col cols="12" class="mb-4">
        <p class="text-4xl font-semibold">Создать урок</p>
        <BackButton class="mt-4"></BackButton>
      </v-col>

      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="form.name" label="Название" variant="outlined"></v-text-field>
            <v-textarea v-model="form.shortDescription" label="Описание" variant="outlined"></v-textarea>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="4" class="pb-8">
        <div @click="visibleCropperModal = true" class="h-100">
          <label for="uploadLogo">
            <div class="h-100 flex flex-col align-center justify-center border rounded">
              <v-icon icon="mdi mdi-cloud-upload-outline" class="icon" />
              <span class="explanation text-center">Загрузить обложку урока</span>
            </div>
          </label>
        </div>

        <v-dialog v-model="dialog" width="auto">
          <v-card max-width="400" title="Удалить фото">
            <template v-slot:actions>
              <v-btn text="нет" @click="dialog = false;"></v-btn>
              <v-btn text="да" @click="dialog = false; deletePreview()"></v-btn>
            </template>
          </v-card>
        </v-dialog>

        <v-dialog v-model="visibleCropperModal">
          <v-row class="justify-center">
            <v-col cols="12" md="8" lg="6">
              <v-card class="pa-4 rounded-lg">
                <ImageCropper @uploadImage="uploadLogo" />

                <v-card-actions>
                  <v-btn @click="visibleCropperModal = false" color="error" class="btn ml-auto">
                    закрыть
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-dialog>
      </v-col>

      <v-col cols="12">
        <v-img class="my-2 relative z-0 overflow-visible rounded" :src="photoPreview" width="200" v-if="photoPreview">
          <v-btn class="absolute -top-7 z-50 btn border" @click="dialog = true"
            icon="mdi mdi-trash-can-outline"></v-btn>
        </v-img>
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

<style>
.btn {
  background-color: white !important;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0)
}

.icon {
  font-size: 128px;
  font-weight: 100;
}

@media only screen and (max-width: 600px) {
  .icon {
    font-size: 32px;
    font-weight: 100;
  }
}

@media only screen and (max-width: 1000px) {
  .icon {
    font-size: 64px;
    font-weight: 100;
  }
}
</style>
