<template>
    <HomePage />
</template>
<script>


export default defineNuxtComponent({
  async asyncData({$db}) { 
    console.log('kk')
    console.log($db.query)
     const users =  $db.query('select * from user')
    /*
    setTimeout(async () => {
      const { data } = await useFetch('/api/point') 
      console.log(data.value)
    }, 0)
    */
  }
})

</script>