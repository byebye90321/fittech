<template>
    <CForm @submit.prevent="saveData()">
        <template v-if="!loading">
            <CRow class="form-group">
                <template>
                    <CCol sm="3" class="col-form-label" >
                        客戶名稱
                    </CCol >
                    <CCol sm="9" class="pt-2">
                        <b-form-radio-group
                        id="radio-group-1"
                        v-model="info.develop_id"
                        :options="develop_opt"
                        name="radio-options"
                        ></b-form-radio-group>
                    </CCol>
                </template>
            </CRow>
            <hr>
            <div class="text-right">
                <button type="submit">儲存</button>
            </div>
        </template>
        <template v-else>
            <div class="text-center">
                <b-spinner class="align-middle"></b-spinner>
            </div>
        </template>
    </CForm>
</template>
<script>
import Vue           from 'vue'
export default {
    props:{
        order_id:Number,
        develop_opt:Array,
    },
    data(){
        return{
            loading:false,
            info:{
                develop_id:3,  //開發者模式
            },
        }
    },
    methods:{
        saveData(){
            this.loading=true
            let data={
                order_id :this.order_id ,
                develop_id:this.info.develop_id
            }
            this.$http.post("/setMode", data)
            .then((res) => {
                this.loading=false
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '修改成功',
                });
                this.$emit('saveDevelop')
                    
                
            })
        },
    }
}
</script>