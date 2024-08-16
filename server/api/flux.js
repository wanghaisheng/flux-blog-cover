
export default defineEventHandler(async (event) => {
  const {
    fluxM,prompt,aspect_ratio,guidance,output_quality
  } = getQuery(event)
  const config = useRuntimeConfig()
  const authEnvVar = config['replicate_apikey'];
  if (!authEnvVar) {
    throw new Error('The $replicate_apikey environment variable was not found!');
  }
  let api = '';
  if (fluxM === 'Flux Dev') {
    api = 'https://api.replicate.com/v1/models/black-forest-labs/flux-dev/predictions'
  } else if (fluxM === 'Flux Pro') { 
    api = 'https://api.replicate.com/v1/models/black-forest-labs/flux-pro/predictions'
  }
  const repo = await $fetch(api, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: authEnvVar
    },
    body: {
      "input": {
        "prompt",
        "guidance",
        "aspect_ratio",
        "output_format": "webp",
        "output_quality"
      }
    }
  })

  return repo
})

