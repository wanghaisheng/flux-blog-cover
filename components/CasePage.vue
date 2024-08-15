<template>
  <div>
    <a-row :gutter="20">
      <a-col :span="6" v-for="(caseItem, index) in caseList" :key="index">
        <div class="i-c"  @click.stop="onClick(caseItem)">
          <a-image :src="caseItem.url" :preview="false" class="b-r-8" />
          <div class="i-m">
            <div>{{ caseItem.prompt }}</div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import caseList from './case.js'

const router = useRouter() 
const onClick = (caseItem) => {
  router.push({
    path: '/Create',
    query: {
      prompt: encodeURIComponent(caseItem.prompt)
    }
  })
}
</script>

<style scoped lang="less">
.i-c{
  position: relative;
  margin-bottom: 20px;
  .i-m{
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.3s;
    cursor: pointer;   
    padding: 0 15px 8px;
    box-sizing: border-box;
  }
  &:hover{
    .i-m{
      opacity: 1;
    }
  }
}
</style>
