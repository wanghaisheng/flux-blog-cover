<template>
    <HomePage />
</template>
<script>

export default defineNuxtComponent({
  async asyncData({$db}) { 
    setTimeout(async () => {
      /*
      console.log($db)
      try {
        let sql = 'select * from user';
        $db.query(sql).then(results => {
          console.log('Results:', results[0]);
        })
        .catch(error => {
          console.error('Query error', error);
        });
        console.log("**************************")
      } catch(e) {
        console.error(e);
      } finally {
        await $db.end();
      }*/
      
      const { data } = await useFetch('/api/point') 
      console.log(data.value)
    }, 0)
  
  }
})

</script>