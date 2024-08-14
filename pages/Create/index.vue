<template>
  <div>
    <div class="t-c">
      <h1>Flux AI Pro 图像生成器</h1>
      <h2>使用由 Flux.1 Pro 提供支持的最先进的 AI 模型生成图像。</h2>
    </div>
    <div class="c-w mt60 b-r-8">
      <div class="c-left">
        <textarea class="b-r-8" placeholder="Enter your prompt here..."></textarea>
        <div class="mt20" style="display: flex;justify-content: space-between;">
          <a-select
            :dropdownMatchSelectWidth="false"
            v-model:value="fluxM"
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
              <a-select-option value="1:1">1:1</a-select-option>
              <a-select-option value="4:3">4:3</a-select-option>
              <a-select-option value="3:4">3:4</a-select-option>
              <a-select-option value="16:9">16:9</a-select-option>
              <a-select-option value="9:16">9:16</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="mt20 b-r-8 b-4" style="padding: 12px;">
          <h3>高级设置</h3>
          <div class="d-c c-t">
            <label>推理步骤数</label>
            <a-popover>
              <template #content>
                要执行的推理步骤数。 默认值：28。 如果输出模糊则增加。
              </template>
              <InfoCircleOutlined />
            </a-popover>
          </div>
          <a-row>
            <a-col :span="18">
              <a-slider v-model:value="steps" :min="1" :max="20" :tooltipOpen="false" />
            </a-col>
            <a-col :span="4">
              <a-input-number v-model:value="steps" :min="1" :max="20" style="margin-left: 16px" />
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
            <a-input-number v-model:value="seed" :min="1" style="margin-right: 5px;width: 130px;" />
            <a-button type="primary" style="width: 50px">
              <template #icon>
                <ReloadOutlined />
              </template>
            </a-button>
          </div>
        </div>
      </div>
      <div class="c-right b-4 b-r-8">
        <label>生成的图像将出现在这里</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import {InfoCircleOutlined, ReloadOutlined} from '@ant-design/icons-vue'

const fluxM = ref('Flux Schnell')
const landscape = ref('4:3')
const steps = ref(20)
const seed = ref(0)
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
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 24px;
    width: calc(60% - 24px);
    background-color: var(--darkGreyBackColor);
  }
}
</style>