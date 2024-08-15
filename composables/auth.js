
import { googleTokenLogin } from 'vue3-google-login'

export const handleGoogleLogin = async () => {
  const runtimeConfig = useRuntimeConfig()
  const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public
  
  const accessToken = await googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID
  }).then((response) => response?.access_token)


  useLogIn().value = !!accessToken

  if (!accessToken) {
    return false
  }

  const { data } = await useFetch('/api/auth/google', {
    method: 'POST',
    body: {
      accessToken
    },
    initialCache: false
  })
  if (data.value !== null) {
    useUserInfo().value = data.value
  }
  
}
