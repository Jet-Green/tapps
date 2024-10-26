<script setup lang="ts"></script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Текущий курс</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="i in 7">
        <LessonCard />
      </v-col>
    </v-row>
  </v-container>
</template>
