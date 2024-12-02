export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = await authStore.checkAuth()

  if (isAuth) {
    if (authStore.user?.roles.indexOf('admin') != -1) {
      return navigateTo('/admin')
    }
    if (authStore.user?.roles.indexOf('teacher') != -1) {
      return navigateTo('/teacher')
    }
    if (authStore.user?.roles.indexOf('student') != -1) {
      return navigateTo('/student')
    }
  }
})