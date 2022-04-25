<template>
    <CForm @submit.prevent="saveData()">
        <template v-if="!loading">
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="2" lg="2" class="col-form-label" >
                        廠商
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                        <b-form-select v-model="info.name" :options="company_opt" required >
                            <template #first>
                                <b-form-select-option :value="null" disabled >- 請選擇 -</b-form-select-option >
                            </template>
                        </b-form-select>
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
                        <date-picker v-model="info.estimated_time" :disabled-date="notBeforeToday" type="date" placeholder="預計完成日" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
                        <p class="pt-2 text-info">※不可填超過回覆日{{reply_date|dateFilter}}之日期</p>
                    </CCol>
                </template> 
            </CRow>
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="2" lg="2" class="col-form-label" >
                        是否表面處理
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                        <b-form-checkbox
                            v-model="info.surfaceTreatment"
                            name="checkbox-1"
                            class="pt-2"
                            :value="true"
                            :unchecked-value="false"
                            >
                        </b-form-checkbox>
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
import moment from 'moment'
export default {
    props:{
        tag_id:Number,
        // company_opt:Array,
        reply_date:String,
    },
    data(){
        return{
            loading:true,
            info:{
                name:null, //廠商名稱
                price:"", //單價
                quantity:"",  //數量
                estimated_time:"",  //預計交期
                surfaceTreatment:false, //是否表面處理
            },
            company_opt:[],

        }
    },
    created(){
        // this.getData()
        
        this.getCompany()
    },
    components:{
        "date-picker":DatePicker,
    },
    filters:{
        dateFilter:function(date){
            if(date!=null&&date!='')
                return moment(date).format('YYYY-MM-DD').toString()
            else
                return ''
        },
    },
    methods:{
        notBeforeToday(date) {
            return date > new Date(this.reply_date);
        },
        getCompany(){
            this.$http.get("/getCompanyOpt")
            .then((res) => {
                this.company_opt = res.data.options
                this.loading=false
            })
        },
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
                surfaceTreatment:this.info.surfaceTreatment
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