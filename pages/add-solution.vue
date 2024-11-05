<script setup lang="ts">
import { toast } from "vue3-toastify"
import UploadApi from "../api/UploadApi"

const route = useRoute()
const router = useRouter()

const lessonStore = useLesson()

let form = ref({
  links: "",
  notes: "",
})
let folderData: any = ref<any>()
let folderDataLength = ref<number>(0)

async function handleFolderChange(event: any) {
  const files = event.target.files
  if (files.length <= 100) {
    folderData.value = files
  } else {
    toast("Максимум 100 файлов!", {
      type: "warning",
    })
    return
  }
  folderDataLength.value = files.length
  // formData.append('folder', this.folderData, this.folderData.name);
}

let archives = ref<any>()
let archivesLength = ref<number>(0)
async function onZipChange(event: any) {
  const files = event.target.files
  if (files.length <= 10) {
    archives.value = files
  } else {
    toast("Максимум 10 архивов!", {
      type: "warning",
    })
    return
  }
  archivesLength.value = files.length
}

let anyFiles = ref<any>()
let anyFilesLength = ref<number>(0)
async function onAnyFilesChange(event: any) {
  const files = event.target.files
  if (files.length <= 40) {
    anyFiles.value = files
  } else {
    toast("Максимум 40 файлов!", {
      type: "warning",
    })
    return
  }
  anyFilesLength.value = files.length
}

let codeFiles = ref<any>()
let codeFilesNames = ref<string>()
let codeFilesLength = ref<number>(0)
async function onCodeFilesChange(event: any) {
  const files = event.target.files
  if (files.length <= 40) {
    codeFiles.value = files
    let names: string[] = []
    for (let f of files) {
      names.push(f.name)
    }
    codeFilesNames.value = names.join(",")
  } else {
    toast("Максимум 40 файлов!", {
      type: "warning",
    })
    return
  }
  codeFilesLength.value = files.length
}
let loading = ref<boolean>(false)
async function submit() {
  loading.value = true
  let toSend = {
    homework: route.query.homework_id,
    course: route.query.course_id,
    lesson: route.query.lesson_id,
    links: form.value.links,
    notes: form.value.notes,
  }
  let res = await lessonStore.newSolution(toSend)
  if (res.status.value == "success") {
    function displayError(msg: string) {
      toast(msg, { type: "error" })
    }
    let solutionId = res.data.value._id
    let folderFD = new FormData()
    let archiveFD = new FormData()
    let anyFilesFD = new FormData()
    let codeFD = new FormData()

    // upload folder
    if (folderDataLength.value > 0) {
      folderFD.append("folder", folderData.value, `solution_folder_${solutionId}_${Date.now()}`)
      res = await UploadApi.uploadFolder(folderFD)
    }

    // upload archives
    if (res?.status.value == "success") {
      if (archivesLength.value > 0) {
        // there are many archives
        for (let arch of archives.value) {
          archiveFD.append("file", arch, `solution_archive_${solutionId}_${Date.now()}.zip`)
        }
        // upload archive to server
        res = await UploadApi.uploadArchive(archiveFD)
      }
    } else {
      displayError("Ошибка при загрузке папки! 😭")
      return
    }
    // upload any files
    if (res?.status?.value == "success") {
      if (anyFilesLength.value > 0) {
        for (let f of anyFiles.value) {
          // it can be main.production.cs
          let spl = f.split(".")
          let fType = spl[spl.length - 1] // .doc, .docx, .png etc.
          anyFilesFD.append("file", f, `solution_archive_${solutionId}_${Date.now()}.${fType}`)
        }
        res = await UploadApi.uploadAnyFiles(anyFilesFD)
      }
    } else {
      displayError("Ошибка при загрузке архивов! 😭")
      return
    }
    // upload code
    if (res?.status?.value == "success") {
      if (codeFilesLength.value > 0) {
        for (let f of codeFiles.value) {
          codeFD.append("file", f, `solution_code_${solutionId}_${Date.now()}.txt`)
        }
        res = await UploadApi.uploadCode(anyFilesFD)
      }
    } else {
      displayError("Ошибка при загрузке файлов! 😭")
      return
    }

    if (res?.status?.value == "success") {
      toast("Решение добавлено!", {
        type: "success",
        autoClose: 600,
        onClose: () => {
          router.back()
        },
      })
    } else {
      displayError("Ошибка при загрузке архивов! 😭")
      return
    }
  }
  loading.value = false
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text-2xl font-semibold">Добавить решение</p>
      </v-col>
      <v-col cols="12">
        <v-text-field label="Ссылки" v-model="form.links" variant="outlined"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea label="Заметки" variant="outlined" v-model="form.notes"></v-textarea>
      </v-col>

      <v-col cols="12">
        <p class="text-1xl font-semibold mb-4">Загрузка кода</p>
        <div class="folder-input-container border rounded-lg cursor-pointer">
          <input
            type="file"
            multiple
            @change="onCodeFilesChange"
            accept=".cs,.cpp,.js,.ts,.java,.json,.mvn,.xml,.pom,.sql,.sh,.bat,.env"
            class="cursor-pointer"
          />
          <v-icon class="centered" icon="upload-icon mdi-code-block-braces" v-if="codeFilesLength == 0"></v-icon>
          <div v-else class="centered">
            <b>
              {{ codeFilesNames }}
            </b>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <p class="text-1xl font-semibold mb-4">Загрузка любых файлов</p>
        <div class="folder-input-container border rounded-lg cursor-pointer">
          <input
            type="file"
            multiple
            @change="onAnyFilesChange"
            class="cursor-pointer"
            accept="image/*,audio/*,video/*,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          <v-icon class="centered" icon="upload-icon mdi-file-plus-outline" v-if="anyFilesLength == 0"></v-icon>
          <div v-else class="centered">
            <b> {{ anyFilesLength }} файлов</b>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <p class="text-1xl font-semibold mb-4">Загрузка архивов</p>
        <div class="folder-input-container border rounded-lg cursor-pointer">
          <input
            type="file"
            @change="onZipChange"
            class="cursor-pointer"
            accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
          />
          <v-icon
            class="centered"
            icon="upload-icon  mdi-archive-arrow-down-outline"
            v-if="archivesLength == 0"
          ></v-icon>
          <div v-else class="centered">
            <b> {{ archivesLength }} архивов</b>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <p class="text-1xl font-semibold mb-4">Загрузка папки</p>
        <div class="folder-input-container border rounded-lg cursor-pointer">
          <input type="file" webkitdirectory @change="handleFolderChange" class="cursor-pointer" />
          <v-icon
            class="centered"
            icon="upload-icon mdi-folder-arrow-down-outline"
            v-if="folderDataLength == 0"
          ></v-icon>
          <div v-else class="centered">
            <b> {{ folderDataLength }} файлов </b>
          </div>
        </div>
      </v-col>

      <v-col cols="12" class="d-flex justify-center my-7">
        <v-btn size="x-large" @click="submit">отправить</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
.folder-input-container {
  height: 100px;
  input {
    opacity: 0;
    // display: none;
    width: 100%;
    height: 100%;
  }
  position: relative;
  .upload-icon {
    font-size: 40px;
  }
  .centered {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
