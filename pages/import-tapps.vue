<script setup lang="ts">
definePageMeta({
  middleware: ["admin"],
})

let radio = ref<string>("Manual")
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Создать <span class="colored-text">Miniapp</span></h1>
        <v-radio-group inline v-model="radio" hide-details>
          <v-radio label="Вручную" value="Manual"></v-radio>
          <v-radio label="Импорт файлом" value="FileImport"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col v-if="radio == 'Manual'" cols="12">
        <CreateTappManual />
      </v-col>
      <v-col v-if="radio == 'FileImport'" cols="12">
        <CreateTappFileImport />
      </v-col>
    </v-row>
  </v-container>
</template>
