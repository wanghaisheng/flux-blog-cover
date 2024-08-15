<template>
  <div class="c-t">
    <div class="c-title">{{$t('Hero.title1')}} <label class="c-title-h">{{$t('Hero.title2')}}</label> {{$t('Hero.title3')}}</div>
    <div class="c-illu">
      {{ $t('Hero.description') }}
    </div>
  </div>
  <div>
    <nuxt-link to="/Create">
      <a-button size="large" type="primary" style="display: flex;margin:0 auto;">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket "><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
        </template>{{ $t('CTAButton.title') }}
      </a-button>
    </nuxt-link>
  </div>

  <CasePage class="mt60" />
  <FeaturePage class="mt60" />
  <PricingPage class="mt60" />
  <FAQPage class="mt60" />
</template>

<script setup>
// import FeaturePage from '@/views/FeaturePage.vue'
// import PricingPage from '@/views/PricingPage.vue'
// import FAQPage from '@/views/FAQPage.vue'

</script>


<style scoped lang="less">
.c-t{
  padding: 96px 0 64px;
}
.c-title{
  text-align: center;
  font-size: 72px;
  font-weight: 700;
  .c-title-h{
    color: var(--fontColorHightLight);
  }
}
.c-illu{
  max-width: 896px;
  text-align: center;
  font-size: 24px;
  color: var(--fontColorIllu);
  margin: 0 auto;
}
</style>