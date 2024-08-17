
export default defineEventHandler(async (event) => {
  const {
    fluxM,prompt,aspect_ratio,guidance,output_quality
  } = getQuery(event)
  // const config = useRuntimeConfig()
  // const authEnvVar = config['replicate_apikey'];
  const authEnvVar = process.env.replicate_apikey
  if (!authEnvVar) {
    throw new Error('The $replicate_apikey environment variable was not found!');
  }
    
      let api = '';
      if (fluxM === 'Flux Dev') {
        api = 'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions'
        // api = 'https://api.replicate.com/v1/models/black-forest-labs/flux-dev/predictions'
      } else if (fluxM === 'Flux Pro') { 
        api = 'https://api.replicate.com/v1/models/black-forest-labs/flux-pro/predictions'
      }
    const repo = await $fetch(api, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer ' + authEnvVar
        },
        body: {
          input: {
            prompt,
            guidance: Number(guidance),
            aspect_ratio: '16:9',//String(aspect_ratio),
            output_format: "webp",
            output_quality: Number(output_quality)
          }
        }
      })

    const imgapi = repo?.urls?.get //'https://api.replicate.com/v1/predictions/13jz6mfe6drm00chbdmbjtxn4c'
    if (imgapi) {
        return await $fetch(imgapi, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: authEnvVar
            },
        })
    }
    throw new Error('Create Failed')
    return false
})

