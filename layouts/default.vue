<script lang="ts" setup>
import { useTheme } from "vuetify"

const theme = useTheme()

const router = useRouter()
const savedTheme = useCookie('theme')

const userStore = useAuth();

let drawer = ref(false);

if (['light', 'dark'].includes(String(savedTheme.value))) {
  theme.global.name.value = String(savedTheme.value);
}

// path of active tab
let activeTab = ref<string>()

function setActiveTab(tabPath: string) {
  activeTab.value = tabPath
  router.push(tabPath)
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
  savedTheme.value = theme.global.name.value
}

// set current active tab
const fullPath = router.currentRoute.value.fullPath
if (fullPath.startsWith("/courses")) {
  activeTab.value = "/courses"
} else if (fullPath.startsWith("/tasks")) {
  activeTab.value = "/tasks"
}
</script>
<template>
  <v-app class="relative min-h-screen">
    <v-app-bar :elevation="0">
      <v-container>
        <v-row>
          <v-col cols="3" class="hidden md:flex">
            <img class="h-[35px]" src="../assets/images/factum-logo.svg" alt="" />
          </v-col>

          <v-col cols="6" class="md:hidden flex">
            <img class="h-[35px]" src="../assets/images/factum-logo.svg" alt="" />
          </v-col>

          <v-col cols="6" class="hidden md:flex justify-center align-center">
            <div class="select-item" @click="setActiveTab('/courses')" :class="{
              'active-item': activeTab == '/courses',
              'black-border': activeTab == '/courses' && theme.global.name.value == 'light',
              'white-border': activeTab == '/courses' && theme.global.name.value == 'dark',
            }">
              Мои курсы
            </div>
            <div class="select-item" @click="setActiveTab('/tasks')" :class="{
              'active-item': activeTab == '/tasks',
              'black-border': activeTab == '/tasks' && theme.global.name.value == 'light',
              'white-border': activeTab == '/tasks' && theme.global.name.value == 'dark',
            }">
              Задания
            </div>
          </v-col>
          <v-spacer>
          </v-spacer>
          <v-col cols="2" class="hidden md:flex align-center justify-between px-10">
            <button @click="toggleTheme" type="button"
              class="text-zinc-700 border border-zinc-700 hover:bg-zinc-400 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:hover:bg-zinc-700">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"
                class="g-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                  <path fill="currentColor" fill-rule="evenodd"
                    d="M8 3a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v1.5A.75.75 0 0 1 8 3m0 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-.75 3.25a.75.75 0 0 0 1.5 0v-1.5a.75.75 0 0 0-1.5 0zM13 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 13 8M.75 7.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zm10.786-2.786a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 0 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0m-9.193 8.132a.75.75 0 0 0 1.06 1.06l1.062-1.06a.75.75 0 0 0-1.061-1.06zm9.193-1.06a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06M3.404 2.343a.75.75 0 0 0-1.06 1.06l1.06 1.061a.75.75 0 1 0 1.06-1.06z"
                    clip-rule="evenodd"></path>
                </svg></svg>
            </button>
            <v-avatar
              image="https://shapka-youtube.ru/wp-content/uploads/2024/08/kartinka-na-avatarki-so-sviney.jpg"></v-avatar>
            {{ userStore.user?.name }} <br />
            {{ userStore.user?.roles[0] }}
            <v-icon icon="mdi-dots-vertical"></v-icon>
          </v-col>
          <v-col cols="6" class="md:hidden flex align-center justify-end">
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <div class="mt-16 pb-28 md:pb-20">
      <slot />
    </div>
    <v-navigation-drawer v-model="drawer" location="right" temporary>
      <template v-slot:prepend>
        <div class="flex flex-row align-center">
          <v-list-item lines="two" prepend-avatar="https://randomuser.me/api/portraits/women/27.jpg" :subtitle="userStore.user?.roles[0]"
            :title="userStore.user?.name">
          </v-list-item>
          <button @click="toggleTheme" type="button"
            class="text-zinc-700 border border-zinc-700 hover:bg-zinc-400 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:hover:bg-zinc-700">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"
              class="g-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                <path fill="currentColor" fill-rule="evenodd"
                  d="M8 3a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v1.5A.75.75 0 0 1 8 3m0 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-.75 3.25a.75.75 0 0 0 1.5 0v-1.5a.75.75 0 0 0-1.5 0zM13 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 13 8M.75 7.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zm10.786-2.786a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 0 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0m-9.193 8.132a.75.75 0 0 0 1.06 1.06l1.062-1.06a.75.75 0 0 0-1.061-1.06zm9.193-1.06a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06M3.404 2.343a.75.75 0 0 0-1.06 1.06l1.06 1.061a.75.75 0 1 0 1.06-1.06z"
                  clip-rule="evenodd"></path>
              </svg></svg>
          </button>
        </div>
      </template>
      <v-divider></v-divider>
      <v-col cols="12" class="flex justify-start align-center">
        <div class="select-item" @click="setActiveTab('/courses')" :class="{
          'active-item': activeTab == '/courses',
          'black-border': activeTab == '/courses' && theme.global.name.value == 'light',
          'white-border': activeTab == '/courses' && theme.global.name.value == 'dark',
        }">
          Мои курсы
        </div>
        <div class="select-item" @click="setActiveTab('/tasks')" :class="{
          'active-item': activeTab == '/tasks',
          'black-border': activeTab == '/tasks' && theme.global.name.value == 'light',
          'white-border': activeTab == '/tasks' && theme.global.name.value == 'dark',
        }">
          Задания
        </div>
      </v-col>
      <v-divider></v-divider>
      <v-col class='flex justify-start' cols='12'>
        <v-btn class="" rounded="xl" variant="outlined">
          настройки
        </v-btn>
      </v-col>
      <v-col class='flex pt-0 justify-start' cols='12'>
        <v-btn class="" rounded="xl" variant="outlined">
          выйти
        </v-btn>
      </v-col>

    </v-navigation-drawer>
    <Footer />
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
}

.black-border {
  border-bottom: 2px solid black;
}

.white-border {
  border-bottom: 2px solid white;
}
</style>
