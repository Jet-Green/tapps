export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = await authStore.checkAuth()
  
  if (!isAuth || authStore.user?.roles.indexOf('admin') == -1) {
    abortNavigation();
    // navigate to login page
    return navigateTo('/login')
  }
})