export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = await authStore.checkAuth()

  if (isAuth) {
    if (authStore.user?.roles.indexOf('admin') != -1) {
      return true;
    }
  }
  return abortNavigation();
})