<template>
<div class="an-t">
  {{ title }}
</div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>


<style scoped>
.an-t{
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  color: var(--fontColor);
  margin-bottom: 20px
}
</style>