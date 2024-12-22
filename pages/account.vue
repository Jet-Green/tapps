<script setup lang="ts">
import { toast } from "vue3-toastify"

definePageMeta({
  middleware: ["auth"],
})

const authStore = useAuth()
let tapps = ref<any>([])
let res = await authStore.getMyTapps()
if (res.status.value == "success") {
  tapps.value = res.data.value
} else {
  toast("Ошибка при получении Miniapp'ов!", { type: "error" })
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col v-for="(tapp, index) of tapps" cols="12" md="6" lg="4">
        <v-card>
          <v-card-title>{{ tapp.name }}</v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12">
                Уникальная ссылка в телеграм: {{ tapp._id }}
              </v-col>
              <v-col cols="12"> Логотип: {{ tapp.logoLink }} </v-col>
              <v-col cols="12"> Кнопки: {{ tapp.buttons }} </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn class="submit-btn" variant="tonal" prepend-icon="mdi-pencil">Редактировать</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
