export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = await authStore.checkAuth()
  
  if (isAuth) {
    abortNavigation();
    if (isAuth && authStore.user?.roles[0] == 'teacher') {
      return navigateTo('/teacher')
    }
    if (isAuth && authStore.user?.roles[0] == 'admin') {
      return navigateTo('/admin')
    }
    if (isAuth && authStore.user?.roles[0] == 'student') {
      return navigateTo('/student')
    }
  }
})