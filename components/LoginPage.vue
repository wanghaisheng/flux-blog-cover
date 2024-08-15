<template>
  <a-button v-if="!isLogin" @click="login">{{ $t('login.login') }}</a-button>
  <div v-else-if="userInfo && userInfo.avatar">
    <a-popover placement="bottomRight" >
      <label style="opacity: 0;">l</label>
      <a-image  :src="userInfo.avatar" :preview="false" style="width: 38px;height: 38px;border-radius: 50%;" />
      <template #title>
        <div style="font-size: 20px;padding: 0 12px;">{{userInfo.name}}</div>
        <div style="color: rgba(248, 250, 252, 0.6);padding: 0 12px;">{{userInfo.email}}</div>
        <a-divider style="margin: 10px 0;" />
      </template>
      <template #content>
        <div class="l-in">
          <a-list size="small" :data-source="data">
            <template #renderItem="{ item }">
              <a-list-item>
                <a :title="item.title">{{ item.title }}</a>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </template>
    </a-popover>
  </div>
</template>

<script setup>

const data = [
  {title: 'Sign out'},
]

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


<style scoped lang="less">
.l-in .yh-list-sm .yh-list-item{
  &:hover{
    border-radius: 8px;
    background: var(--backgroundhover);
  }
}
</style>