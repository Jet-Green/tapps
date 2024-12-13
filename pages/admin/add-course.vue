<script setup lang="ts">
definePageMeta({
  middleware: ["admin"],
})

import { toast } from "vue3-toastify"

const courseStore = useCourse()
const authStore = useAuth()

const router = useRouter()

import type { CourseToDb } from "~/types/course.to-db.interface";
import type { User } from "~/types/user.interface"

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
  reader.readAsDataURL(file)
  visibleCropperModal.value = false
}

function deletePreview() {
  imagesFormData.set('logo', ' ')
  photoPreview.value = null
}

let form = ref<{
  name: string
  shortDescription: string
  students: string[]
}>({
  name: "",
  shortDescription: "",
  students: [],
})
let users = ref<User[]>([])

async function addUserToCourse(userId: string) {
  form.value.students.push(userId)
}

function isUserInCourse(userId: string) {
  for (let studentId of form.value.students) {
    if (studentId == userId) {
      return true
    }
  }
  return false
}

let response = await authStore.getAllUsers()

if (response.status.value == "success") {
  users.value = response.data.value
}

let loading = ref(false)
async function submit() {
  if (!authStore.user?._id) return;
  
  loading.value = true
  let toSend: CourseToDb = {
    ...form.value,
    teacher: authStore.user?._id,
  }
  let res = await courseStore.createCourse(toSend)
  if (res.status.value == "success") {
    let uplRes = await courseStore.uploadImages(imagesFormData, res.data.value._id)
    if (uplRes.status.value == 'success') {
      loading.value = false
      toast("Курс создан", {
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
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mb-4">
        <p class="text-4xl font-semibold">Создание курса</p>
        <BackButton class="mt-4"></BackButton>
      </v-col>

      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-text-field variant="outlined" label="Название" v-model="form.name"></v-text-field>
            <v-textarea variant="outlined" label="Описание" v-model="form.shortDescription"></v-textarea>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="pb-8">
        <div @click="visibleCropperModal = true" class="h-100">
          <label for="uploadLogo">
            <div class="h-100 flex flex-col align-center justify-center border rounded">
              <v-icon icon="mdi mdi-cloud-upload-outline" class="icon" />
              <span class="explanation text-center">Загрузить обложку курса</span>
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
        <p class="text-1xl font-semibold">Добавить пользователя в курс</p>
      </v-col>
      <v-col cols="12">
        <v-row v-for="user of users">
          <v-col class="d-flex align-center">
            <v-icon icon="mdi-account"></v-icon>
            {{ user.name }}
            {{ user.surname }}
            <v-btn class="ml-6" size="small" @click="addUserToCourse(user._id)"
              :disabled="isUserInCourse(user._id)">добавить</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="flex justify-center">
        <v-btn size="x-large" @click="submit" :loading="loading">Создать</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
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
