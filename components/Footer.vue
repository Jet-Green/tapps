<script setup lang="ts"></script>
<template>
  <v-footer class="max-h-32 w-100">
    <v-row justify="center" no-gutters>
      <v-col cols="12" class="flex justify-around">
        <v-btn class="mx-2" rounded="xl" variant="text">
          политика
        </v-btn>
        <v-btn class="mx-2" rounded="xl" variant="text">
          инструкция
        </v-btn>
        <v-btn class="mx-2" rounded="xl" variant="text">
          о системе
        </v-btn>
        <v-btn class="mx-2" rounded="xl" variant="text">
          техподдержка
        </v-btn>
      </v-col>
      <v-col class="text-center" cols="12">
        © Factum
      </v-col>
    </v-row>
  </v-footer>
</template>
<style>
.v-footer{
  position: absolute !important;
  bottom: 0%;
}
</style>
