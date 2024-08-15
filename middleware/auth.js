export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = !!useState('isLogIn').value
  if (!isLoggedIn) {
    handleGoogleLogin()
  }
  return isLoggedIn
})