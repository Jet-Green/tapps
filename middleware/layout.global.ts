export default defineNuxtRouteMiddleware(async () => {
  let authStore = useAuth()
  let isAuth = await authStore.checkAuth()

  if (isAuth && authStore.user?.roles[0] == 'teacher') {
    return setPageLayout('admin')
  } else if (isAuth && authStore.user?.roles[0] == 'teacher' ) {
    return setPageLayout('default')
  }
})