<template>
<div class="loading">
    <div class="loadingtest"><b-spinner label="Spinning" class="mr-3"></b-spinner>{{msg}}</div>
</div>
</template>

<script>
export default {
  name: 'Loading', 
  props: {
    msg: String
  },
  model:{
    prop:'msg',
  },
}
</script>

<style scoped>
.loading {
  position: fixed;
  background: #fff;
  width: 100vw;
  height: 100vh;
  z-index: 1031;
}
.loadingtest
{
    color:#000;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 100%;
}
</style>