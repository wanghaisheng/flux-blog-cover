
export default defineEventHandler(async (event) => {
    const {
      fluxM,prompt,size,seed,steps
    } = getQuery(event)
    const authEnvVar = process.env.aliyun_apikey
    if (!authEnvVar) {
      throw new Error('The $aliyun_apikey environment variable was not found!');
    }
      
      const repo = await $fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis', {
          method: 'POST',
          headers: {
            'X-DashScope-Async': 'enable',
            'content-type': 'application/json',
            authorization: 'Bearer ' + authEnvVar
          },
          body: {
            model: fluxM,
            input: {
              prompt,
            },
            parameters: {
                size,
                seed,
                steps
            }
          }
        })
    let tasksrepo = 1
      const task_id = repo.output.task_id; //'a477791f-92b5-4f7b-bb5e-15989402a57d'
      if (!!task_id) {
        const getTasks = async () => {
            let taskResult = await $fetch(`https://dashscope.aliyuncs.com/api/v1/tasks/${task_id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: authEnvVar
                },
            })
            if(taskResult.output.task_status === 'PENDING' || taskResult.output.task_status === 'RUNNING'){
                await getTasks()
            }else{
                tasksrepo = taskResult;
            }
        }
        await getTasks()
        if(tasksrepo.output.task_status === 'SUCCEEDED'){
          return tasksrepo
        }
      }
      throw new Error('Create Failed!')
      return false
  })
  
  