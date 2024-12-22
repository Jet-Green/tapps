<script setup lang="ts">
import type Tapp from "../../types/tapp.interface"
import type Button from "../../types/tapp.button.interface"

import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import { toast } from "vue3-toastify"

const router = useRouter()
const tappStore = useTapp()
const authStore = useAuth()

let appPreviewData = ref<Tapp>({
  name: "",
  logoLink: "",
  buttons: [],
})

let buttons = ref<Button[]>([])

let addButtonDialog = ref<boolean>(false)
let editButtonDialog = ref<boolean>(false)
let buttonToEdit = ref<Button | null>(null)
let buttonIndexToEdit = -1

const schema = yup.object({
  name: yup.string().min(3, "Надпись должна содержать не менее 3 символов"),
  logoLink: yup.string().required("Ссылка обязательна").url("Ссылка должна быть действительной URL-адресом"),
})

// Создание формы с использованием useForm и схемы
const { handleSubmit } = useForm({
  validationSchema: schema,
})

// Связывание полей с формой
const { value: name, errorMessage: nameError, setValue: setName } = useField("name")
const { value: logoLink, errorMessage: logoLinkError, setValue: setLogoLink } = useField("logoLink")

function addButton(newButton: Button) {
  buttons.value.push(newButton)
  addButtonDialog.value = false
}

function startEditButton(index: number) {
  buttonIndexToEdit = index
  buttonToEdit.value = buttons.value[index]
  editButtonDialog.value = true
}

function clearEdit() {
  buttonIndexToEdit = -1
  buttonToEdit.value = null
}

function editButton(editedButton: Button) {
  buttons.value[buttonIndexToEdit].name = editedButton.name
  buttons.value[buttonIndexToEdit].link = editedButton.link

  editButtonDialog.value = false
  clearEdit()
}

function closeEdit() {
  editButtonDialog.value = false
  clearEdit()
}

watch(
  [name, logoLink, buttons],
  ([newName, newLogo, newButtons]) => {
    Object.assign(appPreviewData.value, { name: newName, logoLink: newLogo, buttons: newButtons })
  },
  { deep: true }
)
let loading = ref<boolean>(false)
// Функция для отправки формы
const submitForm = handleSubmit(async (values) => {
  if (!authStore.user?._id) return

  loading.value = true
  let toSend = { ...values, buttons: buttons.value, creator: authStore.user._id }
  let res = await tappStore.createTapp(toSend)
  if (res.status.value == "success") {
    toast("Miniapp создан!", {
      type: "success",
      autoClose: 600,
      onClose: () => {
        loading.value = false
        router.push("/")
      },
    })
  } else {
    toast("Ошибка при создании!", {
      type: "error",
      autoClose: 600,
      onClose: () => {
        loading.value = false
      },
    })
  }
})
</script>
<template>
  <v-row>
    <v-col cols="12" md="6">
      <form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12">
            <h2>Название</h2>
            <v-text-field v-model="name" :error-messages="nameError" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12">
            <h2>Ссылка на логотип</h2>
            <v-text-field v-model="logoLink" :error-messages="logoLinkError" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12">
            <h2 class="mb-5">Кнопки</h2>
            <v-row>
              <v-col cols="12" class="d-flex" v-for="(btn, index) of buttons" :key="index">
                <div>
                  Надпись: <b>{{ btn.name }}</b> <br />
                  Ссылка:
                  <a :href="btn.link" target="_blank"
                    ><b>{{ btn.link }}</b></a
                  >
                </div>
                <div class="ml-6">
                  <v-btn class="default-btn" variant="tonal" prepend-icon="mdi-pencil" @click="startEditButton(index)"
                    >Редактировать</v-btn
                  >
                </div>
              </v-col>
            </v-row>

            <v-btn class="default-btn mt-6" variant="tonal" prepend-icon="mdi-plus" @click="addButtonDialog = true"
              >Создать кнопку</v-btn
            >
          </v-col>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              class="submit-btn"
              variant="tonal"
              prepend-icon="mdi-send-variant-outline"
              type="submit"
              :loading="loading"
              >Отправить</v-btn
            >
          </v-col>
        </v-row>
      </form>
    </v-col>

    <v-col cols="12" md="6" class="d-flex justify-center align-start">
      <TappPreview :data="appPreviewData" />
    </v-col>

    <v-dialog v-model="addButtonDialog" max-width="600">
      <CreateTappButton @close="addButtonDialog = false" @add-button="addButton" />
    </v-dialog>

    <v-dialog v-model="editButtonDialog" max-width="600">
      <CreateTappEditButton :data="buttonToEdit" @edit-button="editButton" @close="closeEdit" />
    </v-dialog>
  </v-row>
</template>
