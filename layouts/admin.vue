<script lang="ts" setup>
import { useTheme } from "vuetify"

const userStore = useAuth();

const router = useRouter()
const route = useRoute()
const theme = useTheme()
const savedTheme = useCookie('theme')

let drawer = ref(true);
let drawer2 = ref(false);
let rail = ref(true);
let dialog = ref(false);

if (['light', 'dark'].includes(String(savedTheme.value))) {
  theme.global.name.value = String(savedTheme.value);
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
  savedTheme.value = theme.global.name.value
}

async function logOut() {
  await userStore.logout()
}
</script>
<template>
  <v-app class="relative min-h-screen">
    <v-app-bar :elevation="0" class="border-b-1">
      <v-container>
        <v-row>
          <v-col @click="router.push(`/${userStore.user?.roles[0]}`)" class="logo hidden md:flex cursor-pointer"
            cols="6">
            <img class="h-[35px]" src="/assets/images/factum-logo.svg" />
          </v-col>

          <v-col @click="router.push(`/${userStore.user?.roles[0]}`)" class="md:hidden flex mt-1 cursor-pointer"
            cols="6">
            <img class="h-[35px]" src="/assets/images/factum-logo.svg" />
          </v-col>

          <v-spacer class="hidden md:flex"></v-spacer>

          <v-col cols="3" lg="2" class="hidden md:flex px-0 md:px-10 align-center justify-between">
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
            <div
              class="w-10 h-10 relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span class="font-medium text-gray-600 dark:text-gray-300">{{ userStore.user?.name[0] }}</span>
            </div>
            {{ userStore.user?.name }} <br />
            {{ userStore.user?.roles[0] }}
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
              </template>
              <v-list>
                <v-list-item><v-btn @click="router.push(`/${userStore.user?.roles[0]}/settings`)" class="" rounded="xl"
                    variant="outlined">
                    настройки
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn @click="dialog = true;" class="" rounded="xl" variant="outlined">
                    выйти
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>

          <v-col cols="6" class="md:hidden flex align-center justify-end">
            <v-app-bar-nav-icon variant="text" @click.stop="drawer2 = !drawer2; rail = true"></v-app-bar-nav-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <div v-if="drawer2">
      <v-navigation-drawer v-model="drawer2" location="right" temporary>
        <template>
          <div class="flex flex-row align-center">
            <div
              class="ml-3 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span class="font-medium text-gray-600 dark:text-gray-300">{{ userStore.user?.name[0] }}</span>
            </div>
            <v-list-item lines="two" :subtitle="userStore.user?.roles[0]" :title="userStore.user?.name">
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
          <v-btn @click="router.push(`/${userStore.user?.roles[0]}/settings`)" class="" rounded="xl" variant="outlined">
            настройки
          </v-btn>
        </v-col>
        <v-col class='flex pt-0 justify-start' cols='12'>
          <v-btn @click="dialog = true" class="" rounded="xl" variant="outlined">
            выйти
          </v-btn>
        </v-col>
      </v-navigation-drawer>
    </div>

    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="400" title="Выйти из аккаунта?">
        <template v-slot:actions>
          <v-btn text="нет" @click="dialog = false;"></v-btn>
          <v-btn text="да" @click="dialog = false; logOut()"></v-btn>
        </template>
      </v-card>
    </v-dialog>

    <div v-if="drawer">
      <ClientOnly>
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
            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-cog-outline" title="настройки"></v-list-item>
              </template>
              <v-list-item @click.stop="router.push(`/${userStore.user?.roles[0]}/settings`); rail = !rail"
                class="group-elem" prepend-icon="mdi-account-cog-outline" title="настройки аккаунта"
                value="2"></v-list-item>
            </v-list-group>

            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-book-education-outline" title="курс"></v-list-item>
              </template>
              <v-list-item class='group-elem'
                @click.stop="router.push(`/${userStore.user?.roles[0]}/add-course`); rail = !rail"
                prepend-icon="mdi-book-plus-outline" title="добавить курс" value="4"></v-list-item>
              <v-list-item class='group-elem' @click.stop="router.push(`/${userStore.user?.roles[0]}`); rail = !rail"
                prepend-icon="mdi-book-multiple-outline" title="курсы" value="8"></v-list-item>
            </v-list-group>

            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-account-outline" title="пользователь"></v-list-item>
              </template>
              <v-list-item class='group-elem'
                @click.stop="router.push(`/${userStore.user?.roles[0]}/add-new-student`); rail = !rail"
                prepend-icon="mdi-account-box-plus-outline" title="добавить пользователя" value="6"></v-list-item>
              <v-list-item class='group-elem'
                @click.stop="router.push(`/${userStore.user?.roles[0]}/all-users`); rail = !rail"
                prepend-icon="mdi-account-group-outline" title="пользователи" value="7"></v-list-item>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
      </ClientOnly>
    </div>


    <div class="mt-16 pl-16 md:pl-0 pb-28">
      <slot />
    </div>
    <Footer />

  </v-app>
</template>

<style scoped>
.group-elem {
  padding-left: 8px !important;
}

.v-list-group__items .v-list-item {
  padding-inline-start: 8px !important;
}

.logo {
  position: absolute;
  left: 0;
  margin-top: 5px;
}

.v-app-bar {
  border-bottom-width: 1px !important;
}
</style>
