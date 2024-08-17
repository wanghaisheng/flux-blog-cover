<template>
    <HomePage />
</template>
<script>

export default defineNuxtComponent({
  async asyncData({$db}) {
    console.log('llpp', $db)
  /*  $db.query('select * from point').then(res => {
        console.log(res)
     }).catch((error) => {
        console.error(error)
     }) */
  }
})

</script>