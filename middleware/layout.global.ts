export default defineNuxtRouteMiddleware(async () => {
  let authStore = useAuth()
  let isAuth = await authStore.checkAuth()  

  if (isAuth && (authStore.user?.roles[0] == 'teacher' || authStore.user?.roles[0] == 'admin')) {
    return setPageLayout('admin')
  } else if (isAuth && authStore.user?.roles[0] == 'student' ) {
    return setPageLayout('default')
  }
})