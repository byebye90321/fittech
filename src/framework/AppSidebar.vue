<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
    
  >
    <CSidebarBrand class="d-md-down-none" to="/order/list">
      <!-- <CIcon 
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 556 134"
      />
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 110 134"
      /> -->
      <img src="img/apple-icon-60x60.png" class="img-fluid c-sidebar-brand-full">
      <img src="img/apple-icon-60x60.png" class="img-fluid c-sidebar-brand-minimized p-2" >
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="nav" class="h-100"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
//import nav from './_nav'
import CRenderFunction from '../components/render-function/CRenderFunction'
export default {
  name: 'TheSidebar',
  //nav,
  data(){
    return{
      
    }
  },
  props:{
    nav:Array
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  },
  components:{
    CRenderFunction
  },
  created(){

  },
  methods:{
    
  }
}
</script>
