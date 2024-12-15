<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
})

import type { Course } from "~/types/course.interface"
import type { User } from "~/types/user.interface"

const courseStore = useCourse()
const authStore = useAuth()
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
                <AddAvatar/>
              </v-col>
              <v-col cols="12" md="8">
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field variant="outlined" hide-details="auto" label="Фамилия*" clearable></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field variant="outlined" hide-details="auto" label="Имя*" clearable></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field variant="outlined" hide-details="auto" label="Отчество*" clearable></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field variant="outlined" hide-details="auto" label="Логин*" clearable></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field variant="outlined" hide-details="auto" label="Пароль*" clearable></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      variant="outlined"
                      hide-details="auto"
                      label="Повтор пароля*"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-end">
                    <v-btn class="submit-button">Принять изменения <v-icon>mdi-check</v-icon></v-btn>
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
