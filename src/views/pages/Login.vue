<template>

    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <transition name="fade">
        <loading v-if="isLoading" v-model="msg"></loading>
      </transition>
      <CContainer>
        <CRow class="justify-content-center">
          <CCol md="12">
            <CCardGroup>
              <CCard class="p-4 login-content">
                <CCardBody>
                  <CForm @submit.prevent="login">
                    <h3 class="text-center text-dark mb-2"><strong>登入</strong></h3>
                    <p class="text-center text-muted mb-4">輸入帳號密碼登入</p>
                    <CAlert :show="invalid" color="danger">{{invalidText}}</CAlert>
                    <CInput placeholder="請輸入Email" v-model="email" autocomplete="username email" required>
                      <template #prepend-content>
                        <CIcon name="cil-user" />
                      </template>
                    </CInput>
                    <CInput
                      placeholder="請輸入密碼"
                      type="password"
                      v-model="password"
                      autocomplete="curent-password"
                      required
                    >
                      <template #prepend-content>
                        <CIcon name="cil-lock-locked" />
                      </template>
                    </CInput>
                    
                    <div class="d-grid gap-2">
                      <CButton color="dark" class="w-100" type="submit">登入</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>

</template>

<script>
import Loading from "../components/Loading";
export default {
  data() {
    return {
      email: "",
      password: "",
      invalid: false,
      invalidText: "",
      isLoading: false,
      msg: "Loading...",

    };
  },
  components: {
    Loading,
  },
  created(){
 
  },
  methods: {
    login() {

      let data = {
        email: this.email,
        password: this.password,
      };
      this.$http.post("/auth/login", data)
        .then((res) => {
          if(res.data.token){
            window.sessionStorage["token"] = JSON.stringify(res.data.token);
            this.isLoading = true;
            setTimeout(() => {
              this.$router.push("/order/list");
            }, 1000);
            setTimeout(() => {
              this.isLoading = false;
            }, 1500);
          }else if(res.data.error){
            alert(res.data.error)
          }
          

          // if (res.data.code == 200) {
          //   if(res.data.status=="success")
          //   {
          //     window.sessionStorage["token"] = JSON.stringify(res.data.data.token);
          //     this.isLoading = true;
          //     setTimeout(() => {
          //       this.$router.push("/");
          //     }, 1000);
          //     setTimeout(() => {
          //       this.isLoading = false;
          //     }, 1500);

          //   }else{
          //     //錯誤
          //     this.invalid = true;
          //     this.invalidText = res.data.message;
          //   }
            
          // } else {
          //   this.invalid = true;
          //   this.invalidText = res.data.message;
            
          // }
        })
        .catch((error) => {
          this.invalid = true;
          this.invalidText = error.data.message;
        });
    },

  },
};
</script>
