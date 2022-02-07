<template>
  <div>
    <CSidebarNav v-for="(item,index) in contentToRender[0].children" :key="index" :class="item.childrens==null?'CSidebarNavItem':'CSidebarNavDropdown'">
      <!-- <div v-for="(item,index) in contentToRender[0].children" :key="index" :class="item.childrens==null?'CSidebarNavItem':'CSidebarNavDropdown'"> -->
          <template v-if="item.childrens==''">
            <CSidebarNavItem :name="item.name" :icon="item.icon" :to="item.url"></CSidebarNavItem>
          </template>
          <template v-else>
            <CSidebarNavDropdown :name="item.name" :icon="item.icon" :items="item.childrens"></CSidebarNavDropdown>
          </template>
      <!-- </div> -->
    </CSidebarNav>
  </div>
</template>
<script>
import CRenderFunction from '../template/CSidebarNav.vue'
import CSidebarNav from '../template/CSidebarNav.vue'
import CSidebarNavItem from '../template/CSidebarNavItem.vue'
import CSidebarNavDropdown from '../template/CSidebarNavDropdown.vue'
export default {
  data(){
      return{

      }
  },
  props:{
    contentToRender:Array
  },
  components:{
    CRenderFunction,
    CSidebarNav,
    CSidebarNavItem,
    CSidebarNavDropdown
  },
  created(){

  }
}
</script>