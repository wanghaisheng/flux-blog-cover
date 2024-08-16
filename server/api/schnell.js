// import {  getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const {
    prompt,image_size,num_inference_steps,seed
  } = getQuery(event)
  const config = useRuntimeConfig()
  const authEnvVar = config['siliconflow_apikey'];
  if (!authEnvVar) {
    throw new Error('The $siliconflow_apikey environment variable was not found!');
  }
  const repo = await $fetch('https://api.siliconflow.cn/v1/black-forest-labs/FLUX.1-schnell/text-to-image', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: authEnvVar
    },
    body: JSON.stringify({
      prompt,
      //'an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the sea',
      image_size, //: '1024x1024',
      num_inference_steps,
      seed
    })
  })

  return repo
})
