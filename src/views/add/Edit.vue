<template>
    <CForm @submit.prevent="saveData()">
    <template v-if="!loading">
        <CRow class="form-group">
            <template>
                <CCol sm="4" md="3" lg="1" class="col-form-label" >
                    分類
                </CCol >
                <CCol sm="8" md="10" lg="7">
                    <b-form-select v-model="info.type" :options="type_opt" text-field="text" value-field="value" required >
                        <template #first>
                            <b-form-select-option :value="null" disabled >- 請選擇 -</b-form-select-option >
                        </template>
                    </b-form-select>
                </CCol>
            </template>
        </CRow>
        
        <template>
            <CRow class="form-group">
                <CCol sm="4" md="3" lg="1" class="col-form-label" >
                    名稱
                </CCol>
                <CCol sm="8" md="10" lg="7">
                    <b-form-input type="text" v-model="info.name" placeholder="名稱" required></b-form-input>
                </CCol>
            </CRow>
        </template>

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
import Vue from 'vue'

export default {
    props:{
        type_opt:Array,
        editdata:Object,
    },
    data(){
        return{
            loading:false,
            info:{
                id:null, //id
                name:null, //name
                type:null, //type
            },
        }
    },
    created(){
        if(this.editdata!=null){ //編輯帶資料
            this.info.name = this.editdata.name
            this.info.type = this.editdata.type
            this.info.id = this.editdata.id
        }
    },
    methods:{
        
        saveData(){
            
            this.loading=true
            
            if(this.info.id==null){  //新增
                let data={
                    name:this.info.name, 
                    type:this.info.type, 
                }
                this.$http.post("/create", data)
                .then((res) => {
                    this.loading=false
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: '新增成功',
                    });
                    this.$emit('saveCreate')       
                })
            }else{  //編輯
                let data={
                    id:this.info.id,
                    name:this.info.name, 
                    type:this.info.type, 
                }
                this.$http.post("/edit", data)
                .then((res) => {
                    this.loading=false
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: '編輯成功',
                    });
                    this.$emit('saveData')       
                })
            }

            
        },
    }
}
</script>