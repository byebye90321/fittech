<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink class="pl-0 pr-0">
        <div class="c-avatar w-100" v-c-tooltip.hover="'個人'">
          {{user_name}}
          <!-- <img
            src="img/avatars/6.jpg"
            class="c-avatar-img "
          /> -->
          <i class="fa fa-caret-down pl-2"></i>
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>帳戶資訊</strong>
    </CDropdownHeader>
    <CDropdownItem :to="'/resetpassword'">
      <i class="fa fa-pencil-alt pr-2"></i> 編輯個人密碼
    </CDropdownItem>
    <CDropdownItem :to="'/register'">
      <i class="fa fa-user-plus pr-2"></i> 建立新帳號
    </CDropdownItem>
  
    <!-- <CDropdownItem>
      <CIcon name="cil-envelope-open" /> Messages
      <CBadge color="success" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-task" /> Tasks
      <CBadge color="danger" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-comment-square" /> Comments
      <CBadge color="warning" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem> -->
    <!-- <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-settings" /> Settings
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-dollar" /> Payments
      <CBadge color="secondary" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-file" /> Projects
      <CBadge color="primary" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem> -->
    <CDropdownDivider/>
    <!-- <CDropdownItem>
      <CIcon name="cil-shield-alt" /> Lock Account
    </CDropdownItem> -->
    <CDropdownItem @click="onClick">
        <i class="fas fa-sign-out-alt pr-2"></i> 登出
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'AppHeaderAccountDropdown',
  data () {
    return { 
      itemsCount: 42,
      user_name:"",
    }
  },
  created(){
    this.getUserData()
  },
  methods:{
    onClick() {
      this.$http.get("/auth/logout")
      .then(res => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem('manager')
        setTimeout(() => this.$router.push("/login"));
      })
      .catch(error => {});
    },
    getUserData(){
        this.$http.get("/auth/me")
        .then((res) => {
            
            this.user_name = res.data.name
        }) 
    },
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>