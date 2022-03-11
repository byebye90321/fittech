<template>
    <CForm >
    <template v-if="!loading">
         

        <CRow class="form-group">
            <template>
                <CCol sm="2" md="2" lg="2" class="col-form-label" >
                    開發日期
                </CCol>
                <CCol sm="10" md="10" lg="10">
                    <date-picker v-model="info.start_time" type="date" placeholder="預計完成日" format="YYYY-MM-DD" value-type="format" disabled required></date-picker>                  
                </CCol>
            </template>   
        </CRow>

        <CRow class="form-group">
            <template>
                <CCol sm="2" md="2" lg="2" class="col-form-label" >
                    預計完成日
                </CCol>
                <CCol sm="10" md="10" lg="10">
                    <date-picker v-model="info.estimated_time" type="date" placeholder="預計完成日" format="YYYY-MM-DD" value-type="format" disabled required></date-picker>                  
                </CCol>
            </template>   
        </CRow>

        <CRow class="form-group">
            <template>
                <CCol sm="2" md="2" lg="2" class="col-form-label" >
                    開發完成日
                </CCol>
                <CCol sm="10" md="10" lg="10">
                    <date-picker v-model="info.end_time" type="date" placeholder="預計完成日" format="YYYY-MM-DD" value-type="format" disabled required></date-picker>                  
                </CCol>
            </template> 
        </CRow>

        <hr>


        <CRow class="form-group">
            <template>
                <CCol sm="2" md="3" lg="2" class="col-form-label" >
                    委外公司
                </CCol>
                <CCol sm="4" md="10" lg="4">
                    <b-form-input type="text" v-model="info.personnel.name" placeholder="數量" disabled required></b-form-input>
                </CCol>
            </template>
            <template>
                <CCol sm="2" md="3" lg="2" class="col-form-label" >
                    單價
                </CCol>
                <CCol sm="4" md="10" lg="4">
                    <b-form-input type="text" v-model="info.price" placeholder="單價" disabled required></b-form-input>
                </CCol>
            </template>   

        </CRow>


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
        info:Object,

    },
    data(){
        return{
            loading:false,

        }
    },
    created(){
        
    },
    components:{
        "date-picker":DatePicker,
    },
    methods:{
        
        
    }
}
</script>