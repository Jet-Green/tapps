<script lang="ts" setup>
const router = useRouter()

// path of active tab
let activeTab = ref<string>()

function setActiveTab(tabPath: string) {
  activeTab.value = tabPath
  router.push(tabPath)
}

// set current active tab
const fullPath = router.currentRoute.value.fullPath;
if (fullPath.startsWith('/courses')) {
  activeTab.value = '/courses'
} else if (fullPath.startsWith('/tasks')) {
  activeTab.value = '/tasks'
}
</script>
<template>
  <v-app>
    <v-app-bar :elevation="0">
      <v-container>
        <v-row>
          <v-col cols="3">
            <img class="h-[35px]" src="../assets/images/factum-logo.svg" alt="" />
          </v-col>

          <v-col cols="6" class="d-flex justify-center align-center">
            <div class="select-item" @click="setActiveTab('/courses')" :class="{ 'active-item': activeTab == '/courses' }">
              Мои курсы
            </div>
            <div class="select-item" @click="setActiveTab('/tasks')" :class="{ 'active-item': activeTab == '/tasks' }">Задания</div>
          </v-col>

          <v-col cols="3" class="d-flex align-center justify-end">
            sun
            <v-avatar image="https://shapka-youtube.ru/wp-content/uploads/2024/08/kartinka-na-avatarki-so-sviney.jpg"></v-avatar>
            username <br>
            role
            <v-icon icon="mdi-dots-vertical"></v-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <div class="mt-16">
      <slot />
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.select-item {
  margin: 0px 6px;
  cursor: pointer;
}

.active-item {
  transition: ease 0.2s;
  font-weight: 500;
  border-bottom: 2px solid black;
}
</style>
