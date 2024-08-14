<template>
  <div>
    <a-layout-header :style="headerStyle">
      <div class="header-nav">
        <div class="header-left">
          <nuxt-link to="/">
            <img :src="logo" :width="32" />
            <label class="fw header-name">FluxAI</label>
          </nuxt-link>
        </div>
        <div class="header-nav-list">
          <!-- <a>Create</a> -->
          <nuxt-link to="/Create">Create</nuxt-link>
          <nuxt-link to="/#Features">Features</nuxt-link>
          <nuxt-link to="/#Pricing">Pricing</nuxt-link>
          <nuxt-link to="/#FAQ">FAQ</nuxt-link>
        </div>
        <div class="header-right">
          <a-select
            ref="select"
            :dropdownMatchSelectWidth="false"
            v-model:value="language"
            @change="changeLanguage"
          >
            <a-select-option value="en">🇺🇸 English</a-select-option>
            <a-select-option value="zh">🇨🇳 中文</a-select-option>
          </a-select>
        </div>
      </div>
    </a-layout-header>
    <slot />
  </div>
</template>


<script setup>
import logo from '/logo.svg'
import { useI18n } from 'vue-i18n';

const { locale } = useI18n()
const langCookie = useCookie("locale")

const headerStyle = {
  padding: '40px 32px',
  lineHeight: '24px',
};
const language = ref(langCookie.value)
const changeLanguage = (lang) => {
  locale.value = lang
  langCookie.value = lang
}

</script>


<style scoped lang="less">
.ant-layout-header{
  font-size: 16px;
  color: var(--fontColor);
}
.header-nav{
  display: flex;
  align-items: center;
  justify-content: space-between;
  >div{
    flex: 1;
  }
  .header-left a{
    cursor: pointer;
    color: var(--fontColor);
    display: flex;
    align-items: center;
    label{
      font-size: 20px;
      cursor: pointer;
    }
  }
  .header-nav-list a{
    color: var(--fontColor);
    margin:0 12px;
    font-size: 18px;
    cursor: pointer;
  }
  .header-name{
    margin-left: 4px;
  }
  .header-right{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
