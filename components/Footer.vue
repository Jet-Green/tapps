<script setup lang="ts"></script>
<template>
  <v-footer class="max-h-32 w-100">
    <v-row justify="center" no-gutters>
      <v-col class='flex justify-center' cols="6" md="3">
        <v-btn rounded="xl" variant="text">
          политика
        </v-btn>
      </v-col>
      <v-col class='flex justify-center' cols="6" md="3">
        <v-btn class="" rounded="xl" variant="text">
          инструкция
        </v-btn>
      </v-col>
      <v-col class='flex justify-center' cols="6" md="3">
        <v-btn class="" rounded="xl" variant="text">
          о системе
        </v-btn>
      </v-col>
      <v-col class='flex justify-center' cols="6" md="3">
        <v-btn class="" rounded="xl" variant="text">
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
.v-footer {
  position: absolute !important;
  bottom: 0%;
}
</style>
