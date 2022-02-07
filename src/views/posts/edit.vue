<template>
  <div id="components-cms-lists">
    <async-load-service :app="com"></async-load-service>
  </div>
</template>
<script>
import asyncLoadService from "./AsyncLoadService.vue";
export default {
  components: {
    asyncLoadService,
  },
  data() {
    return {
      com: {
        type: this.$route.params.type,
        page: "edit",
      },
    };
  },
  watch: {
    '$route.params': {
      handler (params) {
        const { type } = params;
        type && (this.com.type = type);
        this.com.type = type
      },
    }
  }
};
</script>