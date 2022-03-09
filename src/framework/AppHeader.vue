<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo" />
    </CHeaderBrand>
    <div class="d-md-down-none mr-auto">
      <CHeaderRenderFunction flat :content-to-render="nav" />
    </div>
    <div class="c-header-nav mr-1">
      <div class="c-header-nav-item d-md-down-none mx-2">
        

      </div>
    </div>

    <div class="c-header-nav mr-3">
      <div class="c-header-nav-item d-md-down-none mx-2">
        
      </div>
    </div>

    <CHeaderNav class="mr-4 px-0">
      <AppHeaderAccountDropdown />
    </CHeaderNav>
 
  </CHeader>
</template>

<script>
import CHeaderRenderFunction from "../components/render-function/CHeaderRenderFunction";
import AppHeaderAccountDropdown from "./AppHeaderAccountDropdown";
import { CDropdownMenu } from '@coreui/vue'
export default {
  name: "TheHeader",
  components: {
    CHeaderRenderFunction,
    AppHeaderAccountDropdown,
    'CDropdownMenu':CDropdownMenu
  },
  props: {
    nav: Array,
  },
  data() {
    return {
      

    };
  },
  created() {
  
  },
  computed:{
    
  },
  methods: {
    
    
   
  },
};
</script>
