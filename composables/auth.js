
import { googleTokenLogin } from 'vue3-google-login'
// const { GoogleAuth } = require('google-auth-library');
// import { GoogleAuth } from 'google-auth-library'
const router = useRouter()
const googleAuth = async (accessToken, isLogout = false) => {
  const { data } = await useFetch('/api/auth/login', {
    method: 'POST',
    body: {
      accessToken,
      isLogout
    },
    initialCache: false
  })
  if(isLogout === false && data.value !== null){
    useCookie('accessToken').value = accessToken
    useLogIn().value = true
    useUserInfo().value = data.value
  } else {
    useCookie('accessToken').value = ''
    useLogIn().value = false
    useUserInfo().value = {}
    router.replace('/')
  }
}

export const handleGoogleLogin = async () => {
  const runtimeConfig = useRuntimeConfig()
  const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public
  
  const accessToken = await googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID
  }).then((response) => response?.access_token)

  if (!accessToken) {
    return false
  }
  googleAuth(accessToken)
}


export const verifyIdToken =  () => {
  const accessToken = useCookie("accessToken").value
  setTimeout(() => {
    googleAuth(accessToken)
  }, 0)
}


export const handleGoogleLogout = async () => {
  const accessToken = useCookie("accessToken").value
  googleAuth(accessToken, true)
}