<template>
<div id="Features">
  <AnchorTitle :title="$t('Feature.title')" />
  <a-row :gutter="20">
    <a-col v-for="i in 6" :key="i" :span="8" :class="borderMap[i]">
      <div class="f-c">
        <div class="f-t">{{ $t('Feature.title'+i) }}</div>
        <div class="f-d">{{ $t('Feature.content'+i) }}</div>
      </div>
    </a-col>
  </a-row>
</div>
</template>

<script setup>
import AnchorTitle from '@/components/AnchorTitle.vue'

const borderMap = {
  '1': 'b-r',
  '2': 'b-r',
  '4': 'b-t b-r',
  '5': 'b-t b-r',
  '6': 'b-t',
}

</script>


<style scoped>
.f-t{
  color: var(--fontColor);
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
.f-d{
  font-size: 16px;
  color: var(--fontColorDesc); 
}
.f-c{
  text-align: center;
  padding: 30px;
}
</style>