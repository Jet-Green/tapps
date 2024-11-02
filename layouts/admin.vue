<script lang="ts" setup>
import { useTheme } from "vuetify"

const userStore = useAuth();

const router = useRouter()
const theme = useTheme()
const savedTheme = useCookie('theme')

let drawer = ref(true);
let drawer2 = ref(false);
let rail = ref(true);

if (['light', 'dark'].includes(String(savedTheme.value))) {
  theme.global.name.value = String(savedTheme.value);
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
  savedTheme.value = theme.global.name.value
}
</script>
<template>
  <v-app class="relative min-h-screen">
    <v-app-bar :elevation="0" class="border-b-1">
      <v-container>
        <v-row>
          <v-col class="logo hidden md:flex" cols="6">
            <img class="h-[35px]" src="/assets/images/factum-logo.svg" />
          </v-col>

          <v-col class="md:hidden flex mt-1" cols="6">
            <img class="h-[35px]" src="/assets/images/factum-logo.svg" />
          </v-col>

          <v-spacer class="hidden md:flex"></v-spacer>

          <v-col cols="3" md="2" class="hidden md:flex px-0 md:px-10 align-center justify-between">
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
            <v-app-bar-nav-icon variant="text" @click.stop="drawer2 = !drawer2; rail = true"></v-app-bar-nav-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <div v-if="drawer2"> 
      <v-navigation-drawer v-model="drawer2" location="right" temporary>
        <template v-slot:prepend>
          <div class="flex flex-row align-center">
            <v-list-item lines="two" prepend-avatar="https://randomuser.me/api/portraits/women/27.jpg"
              :subtitle="userStore.user?.roles[0]" :title="userStore.user?.name">
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
    </div>

    <div v-if="drawer">
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent persistent @click="rail = false">
        <v-row>
          <v-col class="border-b-1 flex justify-center" v-if="rail == true" cols="12">
            <v-btn icon="mdi-chevron-right" variant="text" @click.stop="rail = !rail; drawer2 = false"></v-btn>
          </v-col>
          <v-col @click.stop="rail = !rail" v-else cols="12" class="flex justify-between align-center border-b-1">
            <p class="ml-5 font-medium w-50"> закрыть </p>
            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-cog-outline" title="настройки" value="1"></v-list-item>
          <v-list-item prepend-icon="mdi-account-cog-outline" title="настройки аккаунта" value="2"></v-list-item>
          <v-list-item @click="router.push('/course-manage')" prepend-icon="mdi-book-education-outline" title="курс" value="3"></v-list-item>
          <v-list-item @click="router.push('/add-course')" prepend-icon="mdi-book-plus-outline" title="добавить курс" value="4"></v-list-item>
          <v-list-item prepend-icon="mdi-account-outline" title="пользователь" value="5"></v-list-item>
          <v-list-item @click="router.push('/teacher/add-new-student')" prepend-icon="mdi-account-box-plus-outline" title="добавить пользователя"
            value="6"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="пользователи" value="7"></v-list-item>
          <v-list-item @click="router.push('/courses')" prepend-icon="mdi-book-multiple-outline" title="курсы" value="8"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>


    <div class="mt-16 pl-16 md:pl-0 pb-28">
      <slot />
    </div>
    <Footer />

  </v-app>
</template>

<style scoped>
.logo {
  position: absolute;
  left: 0;
  margin-top: 5px;
}

.v-app-bar {
  border-bottom-width: 1px !important;
}
</style>
