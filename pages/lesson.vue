<template>
  <v-container class="mt-5">
    <v-row>
      <v-col cols="12" md="6">
        <video class="w-full" controls>
          <!-- <source src="https://www.youtube.com/watch?v=NX4s0ZE97Kc" type="video/mp4">
          Your browser does not support the video tag. -->
        </video>
      </v-col>
      <v-col cols="12" md="3">
        <p class="text-4xl font-semibold mb-5">
          Машиное обучение
        </p>
        <p class="text-base">
          Машинное обучение (англ. machine learning, ML) — класс методов искусственного интеллекта, характерной чертой
          которых является не прямое решение задачи.
        </p>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn v-for="i in 6" class="ma-1 w-100 border" variant="text" rounded="lg">подпись ссылка</v-btn>
      </v-col>
      <v-col cols="12" md="6" class="flex flex-row">
        <v-col cols="12" md="6">
          <p class="text-4xl font-semibold mb-5">
            Домашнее задание
          </p>
          <p class="text-lg">
            - сделать chatGpt-10<br>
            - выучить термины<br>
            - решить 23 задание из решебника<br>
          </p>
        </v-col>
      </v-col>
      <v-col cols="12" md="6" class="flex flex-row">
        <v-col>
          <p class="text-4xl font-semibold mb-5">
            Материалы
          </p>
          <div class="grid grid-cols-4 gap-4 place-content-stretch">
            <div v-for="i in 8" class="border h-24"></div>
          </div>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>