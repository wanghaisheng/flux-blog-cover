<template>
  <a-button v-if="!isLogin" @click="login">{{ $t('login.login') }}</a-button>
  <a-image v-else-if="userInfo && userInfo.avatar" :src="userInfo.avatar" :preview="false" style="width: 38px;height: 38px;border-radius: 50%;" />
</template>

<script setup>

const isLogin = computed(() => {
  return useState('isLogIn').value
})
const userInfo = computed(() => {
  return useState('userInfo').value
}) 

const login = async () => {
  handleGoogleLogin()
}
</script>


<style scoped>
.u-avatar{
  width: 38px;
  height: 38px;
  border-radius: 50%;
}
</style>