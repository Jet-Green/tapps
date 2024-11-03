<script setup lang="ts">

let router = useRouter();

let homeworks = ref([
  {
    lesson: 'Машиное обучение',
    name: 'Вася пупкин',
    date: new Date(),
    status: 'отказано'
  },
  {
    lesson: 'Машиное обучение',
    name: 'Гриша дубкин',
    date: new Date(),
    status: 'не проверено'
  },
  {
    lesson: 'Машиное обучение',
    name: 'Савелий Шумный',
    date: new Date(),
    status: 'принято'
  },
])
</script>
<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">
          Урок
        </th>
        <th class="text-left">
          Имя
        </th>
        <th class="text-left">
          Дата
        </th>
        <th class="text-left">
          Статус
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in homeworks" :key="item.name" @click="router.push('/homework')">
        <td>{{ item.lesson }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.date }}</td>
        <td v-if="item.status == 'принято'"><p class="primary">{{ item.status }}</p></td>
        <td v-if="item.status == 'не проверено'"><p>{{ item.status }}</p></td>
        <td v-if="item.status == 'отказано'"><p class="error">{{ item.status }}</p></td>
      </tr>
    </tbody>
  </v-table>
</template>
<style scoped>
.error{
  color: red !important;
  font-weight: 500;
}
.primary{
  color: green !important;
  font-weight: 500;
}
</style>