<script setup lang="ts">
import { toast } from "vue3-toastify"

const route = useRoute()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()

const solutionStore = useSolutions()

let solutionStatus = ref<string>("")
let teacherComment = ref<string>("")

function getPrettyDate(dateStr: string) {
  let res = new Date(dateStr)

  return (
    res.toLocaleDateString("ru-RU", {
      month: "long",
      day: "numeric",
    }) +
    ", " +
    res.toLocaleTimeString("ru-RU", {
      minute: "2-digit",
      hour: "2-digit",
    })
  )
}

let solution = ref<any>()

let solutionId = route.query._id?.toString()
// get from
if (solutionStore.solutions.length > 0) {
  solution.value = solutionStore.solutions.find((sol: any) => sol._id == solutionId)
  solutionStatus.value = solution.value.status
  teacherComment.value = solution.value.teacherComment
} else {
  // get from server
  if (solutionId) {
    let res = await solutionStore.getById(solutionId)
    if (res.status.value == "success") {
      solution.value = res.data.value
      solutionStatus.value = solution.value.status
      teacherComment.value = solution.value.teacherComment
    }
  }
}

function getFilename(path: string) {
  let spl = path.split("/")
  return spl[spl.length - 1]
}

async function submit() {
  if (!solutionId) return
  // console.log(newStatus.value, teacherComment.value);
  let res = await solutionStore.setTeacherResponse(solutionStatus.value, teacherComment.value, solutionId)
  if (res.status.value == "success") {
    toast("Успешно!", {
      type: "success",
      autoClose: 600,
      onClose: () => {
        router.back()
      },
    })
  }
}
</script>
<template>
  <v-container>
    <BackButton></BackButton>
    <v-row class="mt-2" v-if="solution?._id">
      <v-col cols="12">
        <p class="text-2xl font-semibold">{{ solution.lesson.name }} - {{ getPrettyDate(solution.date) }}</p>
      </v-col>
      <v-col cols="12" v-if="solution.links.length > 0">
        <p class="text-1xl font-semibold">Ссылки</p>
        {{ solution.links }}
      </v-col>
      <v-col cols="12" v-if="solution.notes.length > 0">
        <p class="text-1xl font-semibold">Примечания</p>
        {{ solution.notes }}
      </v-col>

      <v-col cols="12" v-if="solution.code.length > 0">
        <p class="text-1xl font-semibold">Код</p>
        <div v-for="(codePath, index) of solution.code" :key="index">
          <a :href="runtimeConfig.public.apiBase + '/static/' + codePath" download target="_blank">{{
            getFilename(codePath)
          }}</a>
        </div>
      </v-col>

      <v-col cols="12" v-if="solution.folderPath?.length > 0">
        <p class="text-1xl font-semibold">Папка</p>
        <a :href="runtimeConfig.public.apiBase + '/static/' + solution.folderPath" download target="_blank">{{
          runtimeConfig.public.apiBase + "/static/" + solution.folderPath
        }}</a>
      </v-col>

      <v-col cols="12" v-if="solution.archives.length > 0">
        <p class="text-1xl font-semibold">Архивы</p>
        <div v-for="(archivePath, index) of solution.archives" :key="index">
          <a :href="runtimeConfig.public.apiBase + '/static/' + archivePath" download target="_blank">{{
            getFilename(archivePath)
          }}</a>
        </div>
      </v-col>

      <v-col cols="12" v-if="solution.anyFiles.length > 0">
        <p class="text-1xl font-semibold">Прочие файлы</p>
        <div v-for="(file, index) of solution.anyFiles" :key="index">
          <a :href="runtimeConfig.public.apiBase + '/static/' + file" download target="_blank">{{
            getFilename(file)
          }}</a>
        </div>
      </v-col>

      <v-col cols="12" md="4" lg="3">
        <v-row>
          <!-- <v-col cols="12" md="4" class="flex flex-row">
            <p class="text-lg">{{ solution }}</p>
          </v-col> -->
          <v-col cols="12">
            <v-select
              density="compact"
              label="Статус"
              v-model="solutionStatus"
              :items="[
                { title: 'Отказано', value: 'declined' },
                { title: 'Принято', value: 'checked' },
                { title: 'Не проверено', value: 'not_checked' },
              ]"
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-textarea label="Комментарий" variant="outlined" v-model="teacherComment"></v-textarea>
      </v-col>

      <v-col cols="12" class="d-flex justify-center">
        <v-btn size="x-large" @click="submit">отправить</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
a {
  font-weight: 600;
}
</style>
