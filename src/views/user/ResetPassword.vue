<template>
  <div>
  <notifications group="foo" />
  <CForm @submit.prevent="saveData()">
    <CCardBody class="d-flex justify-content-between p-0">
      <div>
        <h2>
          <strong>{{ $route.meta.label }}</strong>
        </h2>
        <CBreadcrumbRouter class="border-0 mb-0 pl-0" />
      </div>
      <div v-if="checkpwd==true">
        <button type="submit" class="page-header-btn">
          <i class="fas fa-save fa-lg"></i>
          儲存
        </button>
      </div>
    </CCardBody>
  
      <hr />
      <CCard>
          <CCardBody >
              <CRow class="form-group">
                  <CCol sm="4" md="2" lg="2" class="col-form-label" >
                      密碼
                  </CCol>
                  <CCol sm="8" md="6" lg="6">
                      <b-form-input type="password" v-model="info.password" placeholder="請輸入密碼" required></b-form-input>
                  </CCol>
              </CRow>
              <CRow class="form-group">
                  <CCol sm="4" md="2" lg="2" class="col-form-label" >
                      再確認密碼
                  </CCol>
                  <CCol sm="8" md="6" lg="6">
                      <b-form-input type="password" v-model="info.checkpassword" :state="checkpwd" aria-describedby="input-live-feedback" placeholder="請再次輸入密碼" required></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    兩次密碼輸入不相符
                  </b-form-invalid-feedback>
                  </CCol>
                  
              </CRow>


          </CCardBody>
      </CCard>
    
  </CForm>
    <b-modal id="loading" centered v-model="loadingModal" hide-footer hide-header class="modal" no-close-on-backdrop >
        <b-col class="text-center pt-3 pb-3">
            <b-spinner class="mr-3"></b-spinner>Loading...
        </b-col>
    </b-modal>

  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
        loadingModal:false,
        info:{
            password:"",
            checkpassword:"",
        }
    };
  },
  computed: {
    checkpwd() {
      if(this.info.password=='' && this.info.checkpassword=='')
        return null
      else if(this.info.password==this.info.checkpassword)
        return true
      else
        return false
    }
  },
  methods: {
    saveData(){
      this.loading=true
      let data={
          password:this.info.password, 
          checkpassword:this.info.checkpassword, 
      }
      this.$http.post("/resetpassword", data)
      .then((res) => {
          this.loading=false
          this.$notify({
              group: 'foo',
              type: 'success',
              title: '成功',
          });
          this.info.password=""
          this.info.checkpassword=""
      })
    },
    
  },

};
</script>