<template>
<div id="Pricing">
  <AnchorTitle :title="$t('Pricing.title')" />
  <div class="plan-w">
    <div v-for="plan in plans" :key="plan.name" class="plan-c">
      <div class="plan-t">
        <div class="plan-n">{{ plan.name }}</div>
        <div class="plan-a">{{ plan.amount }}</div>
        <div class="plan-r">
          <div v-for="right in plan.rights" :key="right" class="plan-r-i">
            <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="plan-i"><path d="M20 6 9 17l-5-5"></path></svg>
            {{ right }}
          </div>
        </div>
        <div class="plan-b">
          <a-button v-if="(plan.amount-0) === 0" block  >Get Started</a-button>
          <a-button v-else block type="primary" >One Time Payment</a-button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script setup>
import AnchorTitle from '@/components/AnchorTitle.vue'

const plans = [
  {
    name: 'Free Plan',
    amount: '0.0',
    rights: [
      '100 credits',
      'Valid for 1 month',
      '10 Dev generations',
      'Access to basic models'
    ]
  },
  {
    name: 'Basic Plan',
    amount: '9.9',
    rights: [
      '1000 credits',
      'Valid for 1 month',
      '50 Pro generations',
      'Access to advanced models',
      'Private generation',
      'Prompt optimization tools',
    ]
  }
]
</script>

<style scoped lang="less">
.plan-w{
  display: flex;
  justify-content: center;
}
.plan-c{
  display: inline-block;
  padding: 12px;
  background-color: var(--background);
}
.plan-t{
  position: relative;
  padding: 24px;
  height: calc(100% - 48px);
  border-radius: 8px;
  background: var(--darkGreyBackColor);
}
.plan-n{
  font-size: 24px;
  font-weight: 700;
}
.plan-a{
  font-size: 36px;
  font-weight: 700;
}
.plan-r{
  margin:20px 0 50px;
  .plan-r-i{
    display: flex;
    align-items: center;
    line-height: 34px;
    color: var(--fontColorDesc);
    svg{
      margin-right: 6px;
    }
  }
}
.plan-i{
  width: 16px;
  height: 16px;
  color: var(--greenColor);
}
.plan-b{
  width: calc(100% - 48px);
  left:24px;
  bottom: 24px;
  position: absolute;
}
</style>
