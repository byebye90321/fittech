<template>
    <CForm @submit.prevent="saveData()">
        <template v-if="!loading">
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="2" lg="1" class="col-form-label" >
                        材質
                    </CCol>
                    <CCol sm="10" md="10" lg="3">
                        <b-form-select v-model="info.material_id" :options="material_opt" text-field="text" value-field="value" required >
                            <template #first>
                                <b-form-select-option :value="null" disabled >- 請選擇 -</b-form-select-option >
                            </template>
                        </b-form-select>
                    </CCol>
                </template>
            </CRow>
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        長度
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <b-form-input type="text" v-model="info.length" placeholder="長度" required></b-form-input>
                    </CCol>
                </template>
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        寬度
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <b-form-input type="text" v-model="info.width" placeholder="寬度" required></b-form-input>
                    </CCol>
                </template>   
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        高度
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <b-form-input type="text" v-model="info.high" placeholder="高度" required></b-form-input>                 
                    </CCol>
                </template> 
            </CRow>
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        數量
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <b-form-input type="text" v-model="info.quantity" placeholder="數量" required></b-form-input>
                    </CCol>
                </template>
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        單價
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <b-form-input type="text" v-model="info.unit_price" placeholder="單價" required></b-form-input>
                    </CCol>
                </template>   
                <template>
                    <CCol sm="2" md="3" lg="1" class="col-form-label" >
                        材質
                    </CCol>
                    <CCol sm="4" md="10" lg="3">
                        <b-form-input type="text" v-model="info.material" placeholder="材質" required></b-form-input>
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
            <CRow class="form-group">
                <template>
                    <CCol sm="2" md="2" lg="2" class="col-form-label" >
                        開發紀錄
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                        <b-form-textarea
                            v-model="info.record"
                            placeholder="開發紀錄"
                            rows="3"
                            max-rows="6"
                            required
                        ></b-form-textarea>
                    </CCol>
                </template> 
                
            </CRow>

            <hr>
            <div class="text-right">
                <button type="submit">完成</button>
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
        material_opt:Array,
    },
    data(){
        return{
            loading:true,
            info:{
                material_id:"", //材質
                length:"", //長
                width:"", //寬
                high:"", //高
                material:"", //材質
                quantity:"", //數量
                unit_price:"", //單價

                difficulty:1,  //難易度

                record:'', //開發紀錄
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
        console.log(this.tag_id)
        this.loading=false
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
                this.info.client=res.data.data[0].client
                this.info.user=res.data.data[0].user
                this.info.pre_delivery_data=res.data.data[0].pre_delivery_data
                this.info.difficulty=res.data.data[0].difficulty
                        
            })
        },
        saveData(){
            if(this.info.order_date==""||this.info.pre_delivery_data==""||this.info.reply_date==""){
                alert('日期尚未填完')
                return ;
            }
            this.loading=true
            let data={
                tag_id:this.tag_id,
                material_id :this.info.material_id ,
                length :this.info.length ,
                width :this.info.width ,
                high :this.info.high ,
                material :this.info.material ,
                quantity :this.info.quantity ,
                unit_price:this.info.unit_price, 
                difficulty:this.info.difficulty, 
                record:this.info.record, 
            }
            this.$http.post("/setOwnFinish", data)
            .then((res) => {
                this.loading=false
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '成功',
                });
                this.$emit('saveFinished')
            })
        },
    }
}
</script>