<script lang="ts" setup>
const router = useRouter();
const auth = useAuth();
</script>
<template>
  <v-app class="">
    <v-app-bar :elevation="2">
      <v-container>
        <v-row class="d-flex align-center justify-space-between">
          <v-col cols="3">
            <v-btn prepend-icon="mdi-home" @click="router.push('/')">Главная</v-btn>
          </v-col>
          <v-col cols="3" class="d-flex justify-center align-center">
            <v-btn prepend-icon="mdi-database-import-outline" @click="router.push('/import-tapps')">Импорт miniapps</v-btn>
          </v-col>
          <v-col cols="3"  class="d-flex justify-end align-center">
            <v-btn prepend-icon="mdi-account-outline" @click="router.push('/account')">Аккаунт</v-btn>
            <v-btn prepend-icon="mdi-logout" @click="auth.logout()">Выйти</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <div class="mt-16 pb-20">
      <slot />
    </div>
  </v-app>
</template>