<template>
    <CForm >
    <template v-if="!loading">
        <CRow class="form-group">
            <template>
                <CCol sm="2" md="2" lg="2" class="col-form-label" >
                    受理人
                </CCol>
                <CCol sm="10" md="10" lg="10">
                    <b-form-input type="text" v-model="info.personnel.leader" placeholder="受理人" disabled required></b-form-input>
                </CCol>
            </template>
        </CRow>
        <CRow class="form-group">
            <template>
                <CCol sm="2" md="2" lg="2" class="col-form-label" >
                    開發負責人
                </CCol>
                <CCol sm="10" md="10" lg="10">
                    <b-form-input type="text" v-model="info.personnel.name" placeholder="開發負責人" disabled required></b-form-input>
                </CCol>
            </template>   
        </CRow>      

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
                <CCol sm="2" md="3" lg="1" class="col-form-label" >
                    長度
                </CCol>
                <CCol sm="4" md="10" lg="3">
                    <b-form-input type="text" v-model="info.material.length" placeholder="長度" disabled required></b-form-input>
                </CCol>
            </template>
            <template>
                <CCol sm="2" md="3" lg="1" class="col-form-label" >
                    寬度
                </CCol>
                <CCol sm="4" md="10" lg="3">
                    <b-form-input type="text" v-model="info.material.width" placeholder="寬度" disabled required></b-form-input>
                </CCol>
            </template>   
            <template>
                <CCol sm="2" md="3" lg="1" class="col-form-label" >
                    高度
                </CCol>
                <CCol sm="4" md="10" lg="3">
                    <b-form-input type="text" v-model="info.material.high" placeholder="高度" disabled required></b-form-input>                 
                </CCol>
            </template> 
        </CRow>
        <CRow class="form-group">
            <template>
                <CCol sm="2" md="3" lg="1" class="col-form-label" >
                    數量
                </CCol>
                <CCol sm="4" md="10" lg="3">
                    <b-form-input type="text" v-model="info.material.quantity" placeholder="數量" disabled required></b-form-input>
                </CCol>
            </template>
            <template>
                <CCol sm="2" md="3" lg="1" class="col-form-label" >
                    單價
                </CCol>
                <CCol sm="4" md="10" lg="3">
                    <b-form-input type="text" v-model="info.material.unit_price" placeholder="單價" disabled required></b-form-input>
                </CCol>
            </template>   
            <template>
                <CCol sm="2" md="3" lg="1" class="col-form-label" >
                    材質
                </CCol>
                <CCol sm="4" md="10" lg="3">
                    <b-form-input type="text" v-model="info.material.material" placeholder="材質" disabled required></b-form-input>
                </CCol>
            </template> 
        </CRow>

        <CRow class="form-group">
            <template>
                <CCol sm="2" md="3" lg="1" class="col-form-label" >
                    材料
                </CCol>
                <CCol sm="4" md="10" lg="3">
                    <b-form-select v-model="info.material.material_id" :options="material_opt" text-field="text" value-field="value" disabled required >
                        <template #first>
                            <b-form-select-option :value="null" disabled >- 請選擇 -</b-form-select-option >
                        </template>
                    </b-form-select>
                </CCol>
            </template>
        </CRow>

        <hr>

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
                        disabled
                    ></b-form-textarea>
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
                            v-model="info.personnel.difficulty"
                            :options="difficultyOpt"
                            name="radio-options"
                            disabled
                        ></b-form-radio-group>
                    </b-form-group>
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
        material_opt:Array
    },
    data(){
        return{
            loading:false,
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
        
    },
    components:{
        "date-picker":DatePicker,
    },
    methods:{
        
        
    }
}
</script>