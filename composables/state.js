export const useLogIn  = () => {
  return useState('isLogIn', () => false)
}

export const useUserInfo  = () => {
  return useState('userInfo', () => {})
}