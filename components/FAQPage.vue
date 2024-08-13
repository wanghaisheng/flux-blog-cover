<template>
  <div id="FAQ">
    <AnchorTitle :title="$t('FAQ.title')" />
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel v-for="i in 4" :key="i" :header="$t('FAQ.Q'+i)">
        <pre>{{ $t('FAQ.A'+i) }}</pre>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup>
import AnchorTitle from '@/components/AnchorTitle.vue'

const activeKey = ref('1')

</script>