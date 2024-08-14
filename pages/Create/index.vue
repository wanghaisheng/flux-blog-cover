<template>
  <div>
    <div class="t-c">
      <h1>Flux AI Pro 图像生成器</h1>
      <h2>使用由 Flux.1 Pro 提供支持的最先进的 AI 模型生成图像。</h2>
    </div>
    <div class="c-w mt60 b-r-8">
      <div class="c-left">
        <a-textarea v-model:value="prompt" type="textarea" class="b-r-8" :class="{'input-error': promptError}" placeholder="Enter your prompt here..." />
        <div class="mt20" style="display: flex;justify-content: space-between;">
          <a-select
            :dropdownMatchSelectWidth="false"
            v-model:value="fluxM"
            @change="changeFluxM"
          >
            <a-select-option value="Flux Schnell">Flux Schnell</a-select-option>
            <a-select-option value="Flux Dev">Flux Dev</a-select-option>
            <a-select-option value="Flux Pro">Flux Pro</a-select-option>
          </a-select>
          <div>
            Aspect Ratio &nbsp;
            <a-select
              :dropdownMatchSelectWidth="false"
              v-model:value="landscape"
            >
              <a-select-option value="1">1:1</a-select-option>
              <a-select-option value="4/3">4:3</a-select-option>
              <a-select-option value="3/4">3:4</a-select-option>
              <a-select-option value="16/9">16:9</a-select-option>
              <a-select-option value="9/16">9:16</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="mt20 b-r-8 b-4" style="padding: 12px;">
          <h3>高级设置</h3>
          <div class="d-c c-t">
            <label>推理步骤数</label>
            <a-popover>
              <template #content>
                要执行的推理步骤数。 默认值：{{defSteps}}。 如果输出模糊则增加。
              </template>
              <InfoCircleOutlined />
            </a-popover>
          </div>
          <a-row>
            <a-col :span="18">
              <a-slider v-model:value="steps" :min="stepsRange[0]" :max="stepsRange[1]" :tooltipOpen="false" />
            </a-col>
            <a-col :span="4">
              <a-input-number v-model:value="steps" :min="stepsRange[0]" :max="stepsRange[1]" style="margin-left: 16px" />
            </a-col>
          </a-row>
          <div class="d-c c-t">
            <label>种子</label>
            <a-popover>
              <template #content>
                为同一版本的模型提供相同的种子和相同的提示，每次都会输出相同的图像。 0 是随机种子。 默认值：0。
              </template>
              <InfoCircleOutlined />
            </a-popover>
          </div>
          <div class="d-c">
            <a-input-number v-model:value="seed" :min="1" :max="maxSeed" style="margin-right: 5px;width: 130px;" />
            <a-button type="primary" style="width: 50px" @click="reloadSeed">
              <template #icon>
                <ReloadOutlined />
              </template>
            </a-button>
          </div>
        </div>
        <div class="mt20" style="width: 100%; padding: 0 100px;box-sizing: border-box;">
          <a-button type="primary"  :loading="loading" block size="large" @click="onCreate">产生</a-button>
        </div>
      </div>
      <div class="c-right b-4 b-r-8">
        <a-image v-if="imageUrl" :src="imageUrl" width="100%" />
        <label v-else>生成的图像将出现在这里</label>
        <a-float-button
          v-if="imageUrl"
          class="down-btn"
          tooltip="下载"
          :style="{
            right: '24px',
            top: '24px',
          }"
          @click="onDownload"
        >
          <template #icon>
            <DownloadOutlined  />
          </template>
        </a-float-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import _ from 'lodash'
import {InfoCircleOutlined, ReloadOutlined, DownloadOutlined} from '@ant-design/icons-vue'

const fluxM = ref('Flux Schnell')
const prompt = ref('')
const landscape = ref('4/3')
const steps = ref(4)
const seed = ref(0)
const maxSeed = 9999999999
const imageUrl = ref('')
// const imageUrl = ref('https://sf-maas-uat-prod.oss-cn-shanghai.aliyuncs.com/outputs/766d92fa-ed74-4c47-934f-06241d0b03d1_00001_.png')
const loading = ref(false)
const promptError = ref(false)

const stepsRange = computed(() => {
  if (fluxM.value === 'Flux Schnell') {
    return [1,12]
  }else if (fluxM.value === 'Flux Dev') {
    return [1,50]
  }else if (fluxM.value === 'Flux Pro') {
    return [1,50]
  }
})

const defSteps =  computed(() => {
  if (fluxM.value === 'Flux Schnell') {
    return 4
  }else if (fluxM.value === 'Flux Dev') {
    return 28
  }else if (fluxM.value === 'Flux Pro') {
    return 28
  }
})

const changeFluxM = () => {
  steps.value = defSteps.value
}
const reloadSeed = () => {
  seed.value = _.random(0, maxSeed)
}
const onCreate = async () => {
  if (_.trim(prompt.value) === '') {
    promptError.value = true
    return;
  }
  loading.value = true
  const query = {
    prompt: prompt.value,
    image_size: `1024x${1024/eval(landscape.value)}`,
    num_inference_steps: steps.value,
    seed: seed.value
  }
  const { data } = await useFetch('/api/schnell?'+objectToParams(query))
  imageUrl.value = data.value?.images[0]?.url
  loading.value = false
}
const  objectToParams = (obj) => {
    return Object.keys(obj)
        .map(key => `${key}=${obj[key]}`)
        .join('&');
}

const onDownload = () => {
  const aEle = document.createElement('a')
  aEle.href = imageUrl.value
  aEle.click()
}

watch(() => prompt, () => {
  if (_.trim(prompt.value) !== '') {
    promptError.value = false
  }
}, {deep: true})
</script>


<style scoped lang="less">
.c-w{
  padding: 24px;
  border: 1px solid var(--borderColor);
  display: flex;
  .c-left{
    width: 40%;
    textarea{
      width: 100%;
      height: 150px;
      padding: 8px 12px;
      font-size: 14px;
      color: var(--fontColor);
      box-sizing: border-box;
      border-color: var(--borderColor);
      background-color: var(--darkGreyBackColor);
      &:focus-visible{
        outline: none;
        box-shadow: 0 0 0 0.2rem #0d6efd40;
      }
      &.input-error{
        box-shadow: 0 0 0 0.2rem #ff4d4f;
      }
      &::placeholder{
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
  .c-t{
    line-height: 62px;
    .anticon {
      margin-top: 2px;
      margin-left: 6px;
    }
  }
  .c-right{
    position: relative;
    color: rgba(255,255,255,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 24px;
    width: calc(60% - 24px);
    background-color: var(--darkGreyBackColor);
    .down-btn{
      position: absolute;
    }
  }
}
</style>