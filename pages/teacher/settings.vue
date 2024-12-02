<script setup lang="ts">
definePageMeta({
  middleware: ["teacher"]
  // or middleware: 'auth'
})

</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text-2xl font-semibold">Настройки</p>
        <BackButton class="mt-4" />
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field variant="outlined" hide-details="auto" label="Логин"
              clearable></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field variant="outlined" hide-details="auto" label="Пароль" clearable></v-text-field>
          </v-col>
          <v-col class="text" cols="12" md="4">
            каминг сун.....
          </v-col>
           <v-col cols="12" class="flex justify-center">
            <v-btn size="x-large">Отправить</v-btn>
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>