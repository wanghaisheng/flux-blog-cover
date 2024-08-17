

<template>
  <div>
    <div class="t-c">
      <h1>{{ $t('create.title1') }}</h1>
      <h2>{{ $t('create.title2') }}</h2>
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
            <a-select-option value="flux-schnell">Flux Schnell</a-select-option>
            <a-select-option value="flux-dev">Flux Dev</a-select-option>
            <a-select-option value="flux-pro">Flux Pro</a-select-option>
          </a-select>
          <!--
          <div>
            {{ $t('create.ratio') }} &nbsp;
            <a-select
              :dropdownMatchSelectWidth="false"
              v-model:value="landscape"
            >
              <a-select-option value="1:1">1:1</a-select-option>
              <a-select-option value="4:3">4:3</a-select-option>
              <a-select-option value="3:4">3:4</a-select-option>
              <a-select-option value="16:9">16:9</a-select-option>
              <a-select-option value="9:16">9:16</a-select-option>
            </a-select>
          </div>
          -->
          <div>
            {{ $t('create.size') }} &nbsp;
            <a-select
              :dropdownMatchSelectWidth="false"
              v-model:value="size"
            >
              <a-select-option value="512*1024">512*1024</a-select-option>
              <a-select-option value="768*512">768*512</a-select-option>
              <a-select-option value="768*1024">768*1024</a-select-option>
              <a-select-option value="1024*576">1024*576</a-select-option>
              <a-select-option value="576*1024">576*1024</a-select-option>
              <a-select-option value="1024*1024">1024*1024</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="mt20 b-r-8 b-4" style="padding: 12px;">
          <h3>{{ $t('create.setting') }}</h3>
          <div class="d-c c-t">
            <label>{{ $t('create.steps') }}</label>
           <!-- <label v-if="fluxM === 'Flux Schnell'">{{ $t('create.steps') }}</label>
            <label v-else>{{ $t('create.outputQuality') }}</label>  -->
            <a-popover>
              <template #content>
                {{ $t('create.setpTip1') }}{{defSteps}}{{ $t('create.setpTip2') }}
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
            <label>{{ $t('create.seed') }}</label>
            <a-popover>
              <template #content>
                {{ $t('create.seedTip') }}
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
          <a-button type="primary"  :loading="loading" block size="large" @click="onCreate">{{$t('create.generate')}}</a-button>
        </div>
      </div>
      <div class="c-right b-4 b-r-8">
        <a-image v-if="imageUrl" :src="imageUrl" width="100%" />
        <label v-else>
          {{ $t('create.tip') }}
        </label>
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

definePageMeta({
  middleware: ["auth"]
  // 或 middleware: 'auth'
})

const route = useRoute()
const fluxM = ref('flux-schnell')
const prompt = ref(route.query.prompt ? decodeURIComponent(route.query.prompt) : '')
const landscape = ref('4:3')
const steps = ref(4)
const seed = ref(0)
const size = ref('1024*1024')
const maxSeed = 9999999999
const imageUrl = ref('')
// const imageUrl = ref('https://sf-maas-uat-prod.oss-cn-shanghai.aliyuncs.com/outputs/766d92fa-ed74-4c47-934f-06241d0b03d1_00001_.png')
const loading = ref(false)
const promptError = ref(false)

const stepsRange = computed(() => {
  if (fluxM.value === 'flux-schnell') {
    return [1,12]
  }else if (fluxM.value === 'flux-dev') {
    return [0,100]
  }else if (fluxM.value === 'flux-pro') {
    return [0,100]
  }
})

const defSteps =  computed(() => {
  if (fluxM.value === 'flux-schnell') {
    return 4
  }else if (fluxM.value === 'flux-dev') {
    return 80
  }else if (fluxM.value === 'flux-pro') {
    return 80
  }
})

const changeFluxM = () => {
  steps.value = defSteps.value
}
const reloadSeed = () => {
  seed.value = _.random(0, maxSeed)
}


const onCreate = () => {
  if (_.trim(prompt.value) === '') {
    promptError.value = true
    return;
  }
  loading.value = true
  /*
  if (fluxM.value === 'Flux Schnell') { 
    onFreeSchnell()
  } else {
    onPayflux()
  }*/
  onALiyunflux()
}

const onPayflux = async () => {
  const query = {
    prompt: prompt.value,
    aspect_ratio: landscape.value,
    guidance: seed.value,
    output_quality: steps.value,
    fluxM: fluxM.value
  }
    const { data } = await useFetch('/api/flux?' + objectToParams(query))
    console.log(data)
    try {
        imageUrl.value = data.value?.output[0]
    } catch (errorInfo) {
        console.log(errorInfo)

    }
  
  loading.value = false
}

const onALiyunflux = async () => {
  const query = {
    prompt: prompt.value,
    size: size.value,
    seed: seed.value,
    steps: steps.value,
    fluxM: fluxM.value
  }
    const { data } = await useFetch('/api/aliyunflux?' + objectToParams(query))
    console.log(data)
    try {
        imageUrl.value = data.value?.output?.results[0]?.url
    } catch (errorInfo) {
        console.log(errorInfo)

    }
  
  loading.value = false
}

const onFreeSchnell = async () => {
  const query = {
    prompt: prompt.value,
    image_size: `1024x${1024/eval(landscape.value.replace(':','/'))}`,
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