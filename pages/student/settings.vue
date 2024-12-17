<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
})

const courseStore = useCourse()
const authStore = useAuth()

let form = reactive({
  name: '',
  surname: '',
  email: '',
  password: '',
})
let passwordAgain = ref<string>('')

let blobImageData: Blob | null = null
function uploadAvatar(imgData: Blob) {
  blobImageData = imgData
}
async function submit() {
  // let res = await authStore.updateUser(form)
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
                    <v-text-field v-model="form.surname" variant="outlined" hide-details="auto" label="Фамилия*" clearable></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="form.name" variant="outlined" hide-details="auto" label="Имя*" clearable></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field disabled variant="outlined" hide-details="auto" label="Отчество*" clearable></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="form.email" variant="outlined" hide-details="auto" label="Почта*" clearable></v-text-field>
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
