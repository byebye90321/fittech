<template>
    <CForm @submit.prevent="saveData()">
        <template v-if="!loading">
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
                record:'', //開發紀錄
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
            this.loading=true
            let data={
                tag_id:this.tag_id,
                record:this.info.record, 
            }
            this.$http.post("/setOutsourceFinish", data)
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