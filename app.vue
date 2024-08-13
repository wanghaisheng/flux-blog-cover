<script setup >
useHead({
  meta: [
    { name: 'keywords', content: 'FluxAI Pro 图像生成器' },
    { name: 'description', content: '使用由 FLUX.1 Pro 提供支持的最先进的 AI 模型生成图像。轻松生成 Flux AI 图像。' },
    { property: 'og:url', content: 'https://fluxaiimg.com' },
    { property: 'og:title', content: 'FluxAI Pro 图像生成器' },
    { property: 'og:description', content: 'Experience FLUX.1, the state-of-the-art AI image generator from Black Forest Labs. Offering unparalleled performance in image creation, FLUX.1 delivers top-tier prompt adherence, visual quality, and output diversity. Available in Pro, Dev, and Schnell variants, FLUX.1 caters to various needs from enterprise solutions to open-source development. Discover how FLUX.1 can transform your creative process and bring your imaginations to life with stunning AI-generated visuals.' },
  ],
  title: 'Flux AI 图像生成器'
})
</script>

<template>
<a-config-provider prefixCls="yh">
  <HomePage  />
</a-config-provider>

</template>

