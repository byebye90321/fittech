<template>
    <CForm @submit.prevent="saveData()">
        <template v-if="!loading">
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="2" lg="2" class="col-form-label" >
                        受理人
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                        <b-form-input type="text" v-model="info.leader" placeholder="受理人" required></b-form-input>
                    </CCol>
                </template>
            </CRow>
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="2" lg="2" class="col-form-label" >
                        開發負責人
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                        <b-form-input type="text" v-model="info.name" placeholder="開發負責人" required></b-form-input>
                    </CCol>
                </template>   
            </CRow>
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="2" lg="2" class="col-form-label" >
                        預計完成日
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
                        難易度
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                        <b-form-group class="pt-2">
                            <b-form-radio-group
                                id="radio-group-1"
                                v-model="info.difficulty"
                                :options="difficultyOpt"
                                name="radio-options"
                            ></b-form-radio-group>
                        </b-form-group>
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
        customer_opt:Array,
        reply_date:String,
    },
    data(){
        return{
            loading:true,
            info:{
                leader:"", //受理人
                name:"",  //開發負責人
                estimated_time:"",  //預計完成日
                difficulty:1,  //難易度
            },
            difficultyOpt:[
                {text:'1',value:1},
                {text:'2',value:2},
                {text:'3',value:3},
                {text:'4',value:4},
                {text:'5',value:5},
            ]
        }
    },
    created(){
        // this.getData()
        this.loading=false
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
        saveData(){
            if(this.info.order_date==""||this.info.estimated_time==""||this.info.reply_date==""){
                alert('日期尚未填完')
                return ;
            }
            this.loading=true
            let data={
                tag_id:this.tag_id,
                leader :this.info.leader ,
                name:this.info.name, 
                estimated_time:this.info.estimated_time, 
                difficulty:this.info.difficulty, 
            }
            this.$http.post("/savepersonnel", data)
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