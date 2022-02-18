<template>
    <CForm @submit.prevent="saveData()">
        <template v-if="!loading">
            <CRow class="form-group">
                <template>
                    <CCol sm="4" md="3" lg="1" class="col-form-label" >
                        客戶名稱
                    </CCol >
                    <CCol sm="8" md="10" lg="7">
                        <b-form-select v-model="info.customer" :options="customer_opt" disabled text-field="text" value-field="value" required >
                        </b-form-select>
                    </CCol>
                </template>
            </CRow>
            <CRow class="form-group">
                <template>
                    <CCol sm="4" md="3" lg="1" class="col-form-label" >
                        採購單號
                    </CCol>
                    <CCol sm="8" md="10" lg="3">
                        <b-form-input type="number" v-model="info.order_num" placeholder="採購單號" required></b-form-input>
                    </CCol>
                </template>
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        單據日期
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <date-picker v-model="info.order_date" type="date" placeholder="單據日期" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
                    </CCol>
                </template>    
            </CRow>
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        品號
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <b-form-input type="text" v-model="info.item_num" placeholder="品號" required></b-form-input>
                    </CCol>
                </template>
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        品名
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <b-form-input type="text" v-model="info.item_name" placeholder="品名" required></b-form-input>
                    </CCol>
                </template>   
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        數量
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <b-form-input type="text" v-model="info.quantity" placeholder="數量" required></b-form-input>                 
                    </CCol>
                </template> 
            </CRow>
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        預交日期
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <date-picker v-model="info.pre_delivery_data" type="date" placeholder="預交日期" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
                    </CCol>
                </template>    
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        回覆日
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <date-picker v-model="info.reply_date" type="date" placeholder="回覆日" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import Vue           from 'vue'

export default {
    props:{
        order_id:Number,
        customer_opt:Array,
    },
    data(){
        return{
            loading:true,
            info:{
                customer:"", //客戶
                order_num:"",  //採購單號
                order_date:"",  //單據日期
                item_num:"",  //品號
                item_name:"",  //品名
                quantity:"",  //數量
                pre_delivery_data:"",  //預交日期
                reply_date:"",  //回覆日
                // develop_id:"",  //開發者模式
            },
        }
    },
    created(){
        this.getData()
        console.log(this.order_id)
    },
    components:{
        "date-picker":DatePicker,
    },
    methods:{
        getData(){
            let data={
                order_id :this.order_id , 
            }
            this.$http.post("/getOrderData", data)
            .then((res) => {
                console.log(res)
                        this.loading=false
                        this.info.customer=res.data.data[0].customer
                        this.info.order_num=res.data.data[0].order_num 
                        this.info.order_date=res.data.data[0].order_date 
                        this.info.item_num=res.data.data[0].item_num
                        this.info.item_name=res.data.data[0].item_name
                        this.info.quantity=res.data.data[0].quantity
                        this.info.pre_delivery_data=res.data.data[0].pre_delivery_data
                        this.info.reply_date=res.data.data[0].reply_date
                        // this.info.develop_id=res.data.data[0].develop_id

                   
            })
        },
        saveData(){
            if(this.info.order_date==""||this.info.pre_delivery_data==""||this.info.reply_date==""){
                alert('日期尚未填完')
                return ;
            }
            this.loading=true
            let data={
                order_id :this.order_id ,
                customer:this.info.customer, 
                order_num:this.info.order_num, 
                order_date:this.info.order_date, 
                item_num:this.info.item_num,  
                item_name:this.info.item_name, 
                quantity:this.info.quantity,  
                pre_delivery_data:this.info.pre_delivery_data,
                reply_date:this.info.reply_date,
                // develop_id:this.info.develop_id
            }
            this.$http.post("/saveOrderData", data)
            .then((res) => {
                this.loading=false
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '修改成功',
                });
                this.$emit('saveEdit')
            })
        },
    }
}
</script>