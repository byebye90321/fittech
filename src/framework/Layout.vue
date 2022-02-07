<template>
  <div class="c-app">
    <AppSidebar v-if="mainMenuActive == true" :nav="sidebarNav" />
    <CWrapper>
      <AppHeader v-if="topMenuActive == true" :nav="headerNav" />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view v-if="routerAlive"></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <AppFooter />
    </CWrapper>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";
import Bus from "../bus";
import axios from "axios";
export default {
  name: "layout",
  data() {
    return {
      sidebarNav: [
        {
          children: [
            {name: "首頁",url: "/index",icon: "fas fa-home",childrens:[]},
            // {name: "最新消息",url: "/news",icon: "far fa-newspaper",childrens:[
            //   {name: "分類",url: "/news/category/lists",icon: "fas fa-th",childrens:[]},
            //   {name: "列表",url: "/news/lists/lists",icon: "fas fa-list",childrens:[]},
            // ]},

            {name: "進度追蹤系統",url: "/order",icon: "fas fa-file-contract",childrens:[
              {name: "訂單管理",url: "/order/orderlist",icon: "far fa-folder-open",childrens:[]},
              {name: "自家開發管理",url: "/order/self",icon: "fas fa-briefcase",childrens:[]},
              {name: "委外開發管理",url: "/order/outsourcing",icon: "far fa-building",childrens:[]},
              {name: "結束訂單",url: "/order/completed",icon: "fas fa-calendar-day",childrens:[]},
            ]},


          ],
        },
      ],
      headerNav: [],
      mainMenuActive: false,
      topMenuActive: false,
      routerAlive: true,
    };
  },
  components: {
    AppSidebar,
    AppHeader,
    AppFooter,
    Bus,
  },
  created() {
   
  },
  provide() {
    //在父元件中建立屬性
    return {
      routerRefresh: this.routerRefresh,
    };
  },
  mounted() {
    var vm = this;
    Bus.$on("change", data => {
      if (data == true) {
        vm.routerRefresh();
      }
    });

    Bus.$on("Assembly", (data) => {
      this.routerRefresh();
    });

    this.mainMenuActive = true;
    this.topMenuActive = true;
  },
  methods: {
    routerRefresh() {
      this.routerAlive = false;
      this.$nextTick(() => {
        //this.routerAlive = true;
        setTimeout(()=>{},500)
      });
    },
    getMenu() {
      let data = {
        action: "menus",
      };
      this.$http.post("menu", data).then((res) => {
        this.sidebarNav = [
          {
            children: res.data.data,
            // children:[
            //   {
            //     name: "聯繫表單",
            //     icon:"fa fa-comment-dots",
            //     url: "/contact",
            //     childrens: [
            //     {
            //       name: "聯繫主題設定",
            //       icon:"fas fa-clipboard-check",
            //       url: "/contact/title/contact",
            //       childrens:[],
            //     },

            //     {
            //       name: "設定單選項",
            //       icon:"fas fa-poll-h",
            //       url: "/contact/form/contact",
            //       childrens:[],
            //     },
            //     {
            //       name: "檢視聯繫表單",
            //       icon:"fas fa-list",
            //       url: "/contact/lists/contact",
            //       childrens:[],
            //     },
            //     ]
            //   },
            //   {
            //     name: "詢價單",
            //     icon:"fas fa-hand-holding-usd",
            //     url: "/contact",
            //     childrens: [
            //     {
            //       name: "設定單選項",
            //       icon:"fas fa-poll-h",
            //       url: "/contact/form/rfq",
            //       childrens:[],
            //     },
            //     {
            //       name: "檢視詢價表單",
            //       icon:"fas fa-list",
            //       url: "/contact/lists/rfq",
            //       childrens:[],
            //     },
            //     ]
            //   }
            // ]


          },
        ];
        this.mainMenuActive = true;
      });
    },
    getTops() {
      let data = {
        action: "tops",
      };
      this.$http.post("menu", data).then((res) => {
        this.headerNav = res.data.data;
        this.topMenuActive = true;
      });
    },
    routerRefresh() {
      this.routerAlive = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.routerAlive = true;
        }, 1000);
      });
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
