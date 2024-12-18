<script setup lang="ts">
import { toast } from "vue3-toastify"

definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
})

const courseStore = useCourse()
const authStore = useAuth()
const router = useRouter()

let form = reactive({
  name: "",
  surname: "",
  email: "",
})

if (authStore.user?._id) {
  const user = authStore.user

  form.name = user.name
  form.surname = user.surname
  form.email = user.email
}

let blobImageData: Blob | null = null
function uploadAvatar(imgData: Blob) {
  blobImageData = imgData
}
async function submit() {
  if (!authStore.user?._id) return

  let res = await authStore.updateUser(form, authStore.user._id)
  if (res.status.value == "success") {
    if (blobImageData != null) {
      let fd = new FormData()
      fd.append(`avatar_${authStore.user._id}.webp`, blobImageData, `avatar_${authStore.user._id}.webp`)

      let _res = await authStore.uploadAvatar(fd, authStore.user._id)
      if (_res?.status.value == "success") {
        toast("Пользователь обновлён!", {
          type: "success",
          autoClose: 600,
          onClose: () => {
            router.back()
          },
        })
      }
    } else {
      toast("Пользователь обновлён!", {
        type: "success",
        autoClose: 600,
        onClose: () => {
          router.back()
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
        <p class="text-4xl font-semibold">Настройки</p>
      </v-col>
      <v-col cols="12">
        <BackButton />
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <AddAvatar @upload-image="uploadAvatar" />
              </v-col>

              <v-col cols="12" md="8" class="d-flex align-center">
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="form.surname"
                      variant="outlined"
                      hide-details="auto"
                      label="Фамилия*"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="form.name"
                      variant="outlined"
                      hide-details="auto"
                      label="Имя*"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      disabled
                      variant="outlined"
                      hide-details="auto"
                      label="Отчество*"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.email"
                      variant="outlined"
                      hide-details="auto"
                      label="Почта*"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-end">
                    <v-btn class="submit-button" @click="submit">Принять изменения <v-icon>mdi-check</v-icon></v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
