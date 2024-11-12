<script setup lang="ts">
import { toast } from "vue3-toastify"
import ImageInput from "~/components/ImageInput.vue";

const courseStore = useCourse()
const authStore = useAuth()

const router = useRouter()

import type { User } from "~/types/user.interface"

let imagesFormData = new FormData()

let photoPreview = ref()
function uploadLogo(file: File) {
  // example filename: logo_216262666_best-burger.jpg
  imagesFormData.set('logo', file, 'logo_' + String(Date.now()) + '.jpg')
  // make a preview
  let reader = new FileReader();
  reader.onloadend = function () {
    photoPreview.value = reader.result
  }
  reader.readAsDataURL(file);
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
  loading.value = true
  let res = await courseStore.createCourse(form.value)
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
      <v-col cols="12">
        <p class="text-2xl font-semibold">Создать курс</p>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-text-field variant="outlined" label="Название" v-model="form.name"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea variant="outlined" label="Описание" v-model="form.shortDescription"></v-textarea>
          </v-col>
          <v-col cols="12">
            <ImageInput @uploadImage="uploadLogo" />
            <div class="logo" v-if="photoPreview">
              <img :src="photoPreview" alt="">
            </div>
          </v-col>
        </v-row>

        <v-row>
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
      </v-col>
    </v-row>
  </v-container>
</template>
