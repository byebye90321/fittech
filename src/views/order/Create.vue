<template>
    <CForm @submit.prevent="saveData()">
        <CRow class="form-group">
            <template>
                <CCol sm="1" class="col-form-label" >
                    客戶名稱
                </CCol >
                <CCol sm="10">
                    <b-form-select v-model="info.customer" :options="customer_opt" text-field="text" value-field="text" required >
                        <!-- <template #first>
                            <b-form-select-option :value="null" disabled >- 請選擇 -</b-form-select-option >
                        </template> -->
                    </b-form-select>
                </CCol>
            </template>
        </CRow>
        <CRow class="form-group">
            <template>
                <CCol sm="1" class="col-form-label" >
                    採購單號
                </CCol>
                <CCol sm="3">
                    <b-form-input type="text" v-model="info.order_num" placeholder="採購單號" required></b-form-input>
                </CCol>
            </template>
            <template>
                <CCol sm="1" class="col-form-label" >
                    單據日期
                </CCol>
                <CCol sm="3">
                    <date-picker v-model="info.order_date" type="datetime" placeholder="指定單據日期" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
                </CCol>
            </template>    
        </CRow>
        <CRow class="form-group">
            <template>
                <CCol sm="1" class="col-form-label" >
                    品號
                </CCol>
                <CCol sm="3">
                    <b-form-input type="text" v-model="info.item_num" placeholder="品號" required></b-form-input>
                </CCol>
            </template>
            <template>
                <CCol sm="1" class="col-form-label" >
                    品名
                </CCol>
                <CCol sm="3">
                    <b-form-input type="text" v-model="info.item_name" placeholder="品名" required></b-form-input>
                </CCol>
            </template>   
            <template>
                <CCol sm="1" class="col-form-label" >
                    數量
                </CCol>
                <CCol sm="3">
                    <b-form-input type="text" v-model="info.quantity" placeholder="數量" required></b-form-input>                 
                </CCol>
            </template> 
        </CRow>
        <CRow class="form-group">
            <template>
                <CCol sm="1" class="col-form-label" >
                    預交日期
                </CCol>
                <CCol sm="3">
                    <date-picker v-model="info.pre_delivery_data" type="datetime" placeholder="預交日期" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
                </CCol>
            </template>    
            <template>
                <CCol sm="1" class="col-form-label" >
                    回覆日
                </CCol>
                <CCol sm="3">
                    <date-picker v-model="info.reply_date" type="datetime" placeholder="回覆日" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
                </CCol>
            </template>   
        </CRow>
        <hr>
        <div class="text-right">
            <button type="submit">儲存</button>
        </div>
    </CForm>
</template>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
    props:{
        
    },
    data(){
        return{
            info:{
                customer:"", //客戶
                order_num:"",  //採購單號
                order_date:"",  //單據日期
                item_num:"",  //品號
                item_name:"",  //品名
                quantity:"",  //數量
                pre_delivery_data:"",  //預交日期
                reply_date:"",  //回覆日
            },
            customer_opt:[]
        }
    },
    created(){
        this.getCustomerOpt()
    },
    components:{
        "date-picker":DatePicker,
    },
    methods:{
        getCustomerOpt(){
            this.$http.get("/getCustomerOpt")
            .then((res) => {
                console.log(res)
                this.customer_opt = res.data.options
            })
        },
        saveData(){
            if(this.info.order_date==""||this.info.pre_delivery_data==""||this.info.reply_date==""){
                alert('日期尚未填完')
                return ;
            }
            let data={
                customer:this.info.customer, 
                order_num:this.info.order_num, 
                order_date:this.info.order_date, 
                item_num:this.info.item_num,  
                item_name:this.info.item_name, 
                quantity:this.info.quantity,  
                pre_delivery_data:this.info.pre_delivery_data,
                reply_date:this.info.reply_date,
            }
            this.$http.post("/addorder", data)
            .then((res) => {
                
                        this.$emit('saveCreate')
                   
            })
        },
    }
}
</script>