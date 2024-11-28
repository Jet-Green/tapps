<script lang="ts" setup>
let userStore = useAuth();

let users = ref();

let res = await userStore.getAllUsers();
if (res.status = 200) {
  users = res.data.value;
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mb-4">
        <p class="text-4xl font-semibold">Пользователи</p>
        <BackButton class="mt-4"></BackButton>
      </v-col>
      <v-col cols='12' md="8" lg="6">
        <v-row class="border rounded">
          <v-col cols="12" v-for="user in users" class="flex align-center">
            <div
              class="ml-3 relative inline-flex items-center justify-center min-w-10 min-h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span class="font-medium text-gray-600 dark:text-gray-300">{{ user?.name[0] }}</span>
            </div>
            <v-list-item lines="two" :subtitle="user?.roles[0]" :title="user?.name">
            </v-list-item> |
            <div class="ml-5">
              <v-btn class="me-2 text-none" prepend-icon="mdi mdi-pencil-outline" variant="flat">
                изменить пользователя
              </v-btn>
              <v-btn class="me-2 text-none" prepend-icon="mdi mdi-account-star-outline" variant="flat">
                поменять роль
              </v-btn>
              <v-btn class="me-2 text-none" prepend-icon="mdi mdi-trash-can-outline" variant="flat">
                удалить пользователя
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>