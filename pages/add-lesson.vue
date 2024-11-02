<script setup lang="ts">
import { toast } from "vue3-toastify"

const courseStore = useCourse()
const route = useRoute()
const router = useRouter()

let form = ref<{ name: string; shortDescription: string }>({
  name: "",
  shortDescription: "",
})

let loading = ref(false)
async function submit() {
  loading.value = true
  let courseId = route.query.course_id?.toString()
  if (courseId) {
    let res = await courseStore.createLesson(form.value, courseId)
    if (res.status.value == "success") {
      loading.value = false
      toast("Урок создан", {
        type: "success",
        autoClose: 500,
        onClose: () => {
          router.back()
        },
      })
    } else {
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
        <i>videos are coming soon...</i>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn size="x-large" @click="submit" :loading="loading">создать</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
