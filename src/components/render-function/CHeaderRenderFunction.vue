<template>
  <CHeaderNav class="d-md-down-none mr-auto">
    <div v-for="(item,index) in contentToRender" :key="index" :class="item.childrens==null?'CHeaderNavItem':'CHeaderNavDropdown'">
        <template v-if="item.childrens.length==0">
          <CHeaderNavItem :name="item.name" :icon="item.icon" :to="item.url"></CHeaderNavItem>
        </template>
        <template v-else>
          <CHeaderNavDropdown :name="item.name" :icon="item.icon" :items="item.childrens"></CHeaderNavDropdown>
        </template>
    </div>
  </CHeaderNav>
</template>
<script>
import CHeaderNav from '../template/CHeaderNav.vue'
import CHeaderNavItem from '../template/CHeaderNavItem.vue'
import CHeaderNavDropdown from '../template/CHeaderNavDropdown.vue'
export default {
  data(){
      return{

      }
  },
  props:{
    contentToRender:Array
  },
  components:{
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavDropdown
  },
  created(){
    
  }
}
</script>