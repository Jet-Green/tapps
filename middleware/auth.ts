export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = await authStore.checkAuth()

  if (!isAuth) {
    abortNavigation();
    // navigate to login page, now it's on /
    return navigateTo('/')
  }
})