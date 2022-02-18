<template>
    <CForm @submit.prevent="saveData()">
        <template v-if="!loading">
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="2" lg="2" class="col-form-label" >
                        廠商
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                        <b-form-input type="text" v-model="info.name" placeholder="廠商" required></b-form-input>
                    </CCol>
                </template>
            </CRow>
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="2" lg="2" class="col-form-label" >
                        單價
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                        <b-form-input type="text" v-model="info.price" placeholder="單價" required></b-form-input>
                    </CCol>
                </template>   
            </CRow>
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="2" lg="2" class="col-form-label" >
                        數量
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                        <b-form-input type="text" v-model="info.quantity" placeholder="數量" required></b-form-input>
                    </CCol>
                </template> 
            </CRow>
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="2" lg="2" class="col-form-label" >
                        預計交期
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                        <date-picker v-model="info.estimated_time" type="date" placeholder="預計完成日" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
                    </CCol>
                </template> 
            </CRow>

            <hr>
            <div class="text-right">
                <button type="submit">開發</button>
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import Vue           from 'vue'

export default {
    props:{
        tag_id:Number,
    },
    data(){
        return{
            loading:true,
            info:{
                name:"", //廠商名稱
                price:"", //單價
                quantity:"",  //數量
                estimated_time:"",  //預計交期
            },
        }
    },
    created(){
        // this.getData()
        console.log(this.tag_id)
        this.loading=false
    },
    components:{
        "date-picker":DatePicker,
    },
    methods:{
        saveData(){
            if(this.info.estimated_time==""){
                alert('日期尚未填完')
                return ;
            }
            this.loading=true
            let data={
                tag_id:this.tag_id,
                name :this.info.name ,
                price:this.info.price, 
                quantity:this.info.quantity, 
                estimated_time:this.info.estimated_time, 
            }
            this.$http.post("/saveOutsourcePersonnel", data)
            .then((res) => {
                this.loading=false
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '成功',
                });
                this.$emit('saveEdit')
            })
        },
    }
}
</script>