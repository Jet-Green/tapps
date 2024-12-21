<script setup lang="ts">
const emit = defineEmits(["close", "add-button"])

import type Button from "../../types/tapp.button.interface"
import { useForm, useField } from "vee-validate"
import * as yup from "yup"

// Определение схемы валидации с использованием Yup
const schema = yup.object({
  name: yup.string().required("Надпись на кнопке обязательна").min(3, "Надпись должна содержать не менее 3 символов"),
  link: yup.string().required("Ссылка обязательна").url("Ссылка должна быть действительной URL-адресом"),
})

// Создание формы с использованием useForm и схемы
const { handleSubmit } = useForm({
  validationSchema: schema,
})

let form = ref<Button>({
  name: "",
  link: "",
})

// Связывание полей с формой
const { value: name, errorMessage: nameError } = useField("name")
const { value: link, errorMessage: linkError } = useField("link")

// Функция для отправки формы
const submitForm = handleSubmit((values) => {
  emit("add-button", values)
})
</script>
<template>
  <form @submit="submitForm">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <div class="d-flex align-center">
          <v-icon>mdi-plus</v-icon>
          Добавить кнопку
        </div>

        <v-icon class="cursor-pointer pa-2" @click="emit('close')">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              label="Надпись на кнопке"
              variant="outlined"
              :error-messages="nameError"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="link"
              label="Ссылка, на которую ведёт кнопка"
              variant="outlined"
              :error-messages="linkError"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn class="submit-btn" variant="tonal" prepend-icon="mdi-plus" type="submit">Добавить</v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>
