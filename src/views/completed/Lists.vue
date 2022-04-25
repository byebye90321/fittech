<template>
  <div>
  <notifications group="foo" />
    <CCardBody class="d-flex justify-content-between p-0">
      <div>
        <h2>
          <strong>{{ $route.meta.label }}</strong>
        </h2>
        <CBreadcrumbRouter class="border-0 mb-0 pl-0" />
      </div>
      <div>

        <button
          @click="toggleSearch()"
          v-html="toggle_text"
          class="page-header-btn"
        >
          {{ toggle_text }}
        </button>
      </div>
    </CCardBody>
    <CCardBody class="p-0">
      <hr />
      <CCard :style="toggle">
        <CCardBody>
          <b-row>
              <b-col lg="4" class="my-1">
                <b-form-input type="number" v-model="filter.order_num" placeholder="採購單號" required ></b-form-input>
              </b-col> 
              <b-col lg="4" class="my-1">
                <b-form-input type="text" v-model="filter.item_num" placeholder="品號" required></b-form-input>
              </b-col> 
              <b-col lg="4" class="my-1">
                <b-form-input type="text" v-model="filter.item_name" placeholder="品名" required></b-form-input>
              </b-col> 
              <b-col lg="4" class="my-1">
                <date-picker v-model="filter.order_date" type="date" placeholder="單據日期" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
              </b-col> 
              <b-col lg="4" class="my-1">
                <date-picker v-model="filter.estimated_time" type="date" placeholder="預交日期" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
              </b-col> 
              <b-col lg="4" class="my-1">
                <date-picker v-model="filter.reply_date" type="date" placeholder="回覆日" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
              </b-col> 
              <b-col lg="4" class="my-1">
                <b-form-input type="text" v-model="filter.name" placeholder="負責人" required></b-form-input>
              </b-col> 
              <b-col lg="3" class="my-1">
                <b-form-group>
                  <b-form-radio-group
                    buttons
                    button-variant="outline-danger"
                    v-model="filter.status"
                    :options="develop_opt"
                  ></b-form-radio-group>
                </b-form-group>
              </b-col> 
              <b-col lg="3" class="my-1">
                <b-form-group>
                  <b-form-radio-group
                    buttons
                    button-variant="outline-danger"
                    v-model="filter.expected"
                    :options="expected_opt"
                  ></b-form-radio-group>
                </b-form-group>
              </b-col> 

              
              <b-col lg="2" class="my-1 text-right">
                  <button @click="getLists(1)">搜尋</button>
              </b-col>
          </b-row>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody class="p-0">
          <b-table
            :busy="isBusy"
            show-empty
            class="text-center mb-0"
            :items="dataList"
            :fields="fields"
            :per-page="pageCount"
            :stacked="device == 1"
            :current-page="paginate.current_page"
            thead-class="thead-light text-center "
          >
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>&nbsp; Loading...</strong>
              </div>
            </template>
            <template v-slot:empty>
              <div class="text-center my-3">
                <h4 class="mb-3">尚未發佈任何項目</h4>
              </div>
            </template>
            <template v-slot:cell(customer)="row">
              <p>{{row.item.main.customer|customerFilter(customer_opt)}}</p>
            </template>
            <template v-slot:cell(order_num)="row">
              <p>{{row.item.main.order_num}}</p>
            </template>
            <template v-slot:cell(item_num)="row">
              <p>{{row.item.main.item_num}}</p>
            </template>
            <template v-slot:cell(item_name)="row">
              <p>{{row.item.main.item_name}}</p>
            </template>

             <template v-slot:cell(leader)="row">
              <p v-if="row.item.develop_id==5">{{row.item.personnel.leader|userFilter(userFilter_opt)}}</p>
              <p v-else>{{row.item.personnel.leader}}</p>
              
            </template>
            
            <template v-slot:cell(personnel)="row">
              
              <p v-if="row.item.develop_id==5">{{row.item.personnel.name|companyFilter(company_opt)}}</p>
              <p v-else>{{row.item.personnel.name}}</p>
            </template>

            
            <template v-slot:cell(develop_id)="row">
              <p 
              :class="
                  row.item.develop_id == 4
                    ? 'statusStart'
                    : row.item.develop_id == 5
                    ? 'statusWait'
                    : 'statusEnd'
                "  
              >{{row.item.develop_id|developFilter(develop_opt)}}</p>
            </template>
            <template v-slot:cell(reply_date)="row">
              <p>{{row.item.main.reply_date|dateFilter}}</p>
            </template>
            <template v-slot:cell(estimated_time)="row">
              <p>{{row.item.estimated_time|dateFilter}}</p>
            </template>
            <template v-slot:cell(end_time)="row">
              <p>{{row.item.end_time|dateFilter}}</p>
            </template>

            <template v-slot:cell(expected)="row">
              <p :class="row.item.expected==14?'status_success':'statusStart'">
                {{row.item.expected|expectedFilter(expected_opt)}} <span v-if="row.item.expected!=14">{{Math.abs(row.item.day)}}天</span>
              </p>
            </template>

            <template v-slot:cell(edit)="row">
              <CButton @click="viewInfo(row.item.tag_id,row.item.develop_id)" color="warning">細項</CButton>

            </template>
          </b-table>
        </CCardBody>
      </CCard>
      <b-row v-if="paginate.pages != 0" id="pagination">
        <div class="col-md-6">
          <p class="mb-3">
            總計 {{ this.totalRows }} 筆資料，每頁顯示{{ this.pageCount }}筆，共
            {{ this.paginate.maxPage }} 頁
          </p>
        </div>
        <div class="col-md-6">
          <b-pagination-nav
            align="right"
            v-model="currPage"
            :pages="paginate.pages"
            :number-of-pages="paginate.maxPage"
            @input="getLists"
          ></b-pagination-nav>
        </div>
      </b-row>
    </CCardBody>


   <b-modal id="modal-edit" centered title="自家開發" size="xl" v-model="ownDetailModal" hide-footer class="modal" >
        <b-col class="pt-3 pb-3">
            <own :info="ownData" :material_opt="materialFilter_opt"></own>
        </b-col>
    </b-modal>

    <b-modal id="modal-edit" centered title="委外開發" size="xl" v-model="outDetailModal" hide-footer class="modal" >
        <b-col class="pt-3 pb-3">
            <outsource :info="outData" :company_opt="company_opt"></outsource>
        </b-col>
    </b-modal>

    

    <b-modal id="loading" centered v-model="loadingModal" hide-footer hide-header class="modal" no-close-on-backdrop >
        <b-col class="text-center pt-3 pb-3">
            <b-spinner class="mr-3"></b-spinner>
            <!-- Loading... -->
        </b-col>
    </b-modal>

  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import own from "./Own";
import outsource from "./Outsource";

export default {
  data() {
    return {
      //列表
      isBusy: false,
      dataList: [],
      fields: [   
        {
          key: "customer",
          label: "客戶",
          sortable: true,
        },
        {
          key: "order_num",
          label: "採購單號",
          sortable: true,
        },
        {
          key: "item_num",
          label: "品號",
          sortable: true,
        },
        {
          key: "item_name",
          label: "品名",
          sortable: true,
        },
        {
          key: "develop_id",
          label: "開發模式",
          sortable: true,
        },   
        {
          key: "reply_date",
          label: "回覆日期",
          sortable: false,
        }, 
        {
          key: "estimated_time",
          label: "開發交期",
          sortable: false,
        },
        {
          key: "end_time",
          label: "開發完成日",
          sortable: false,
        }, 
        {
          key: "expected",
          label: "是否逾期",
          sortable: false,
        },
        {   
          key: "leader",
          label: "開發者",
          sortable: false,
        },
        {
          key: "personnel",
          label: "配合者",
          sortable: false,
        },
        {
          key: "edit",
          label: "編輯",
          sortable: false,
        },
      ],
      device: 0,

      //分頁
      currPage: 1,
      paginate: {
        current_page: 1,
        pages: 0,
        maxPage: 5,
      },
      pageCount: 10,
      totalRows: 10,

      //過濾
      filter:{
          order_num:"",  //採購單號
          order_date:"",  //單據日期
          item_num:"",  //品號
          item_name:"",  //品名
          estimated_time:"",//預交日期
          reply_date:"",  //回覆日
          name:"",  //負責人
          status: 0,
          expected:0, //逾期
      },

      toggle: "display:none",
      toggle_text: '<i class="fas fa-eye fa-lg"></i>進階搜尋',

      //modal
      loadingModal: false,


      ownDetailModal:false,
      outDetailModal:false,
      finishedModal:false,

      editOrderId:"",
      finishedId:"",

      status_opt:[],
      customer_opt:[],
      develop_opt:[
        {value: 4, text: "自行開發"},
        {value: 5, text: "委外開發"}
      ],
      expected_opt:[],
      company_opt:[],
      materialFilter_opt:[],
      userFilter_opt:[],

      ownData:false,
      outData:false,

    };
  },
  filters: {
    dateFilter:function(date){
      if(date!=null&&date!='')
        return moment(date).format('YYYY-MM-DD').toString()
      else
        return ''
    },
    developFilter:function(val,develop_opt){

      for(var i=0;i<develop_opt.length;i++)
      {
        if(develop_opt[i].value==val)
        {

          return develop_opt[i].text
        }
      }
    },
    customerFilter:function(val,customer_opt){

      for(var i=0;i<customer_opt.length;i++)
      {
        if(customer_opt[i].value==val)
        {

          return customer_opt[i].text
        }
      }
    },
    statusFilter:function(val,status_opt){

      for(var i=0;i<status_opt.length;i++)
      {
        if(status_opt[i].value==val)
        {

          return status_opt[i].text
        }
      }
    },
    expectedFilter:function(val,expected_opt){

      for(var i=0;i<expected_opt.length;i++)
      {
        if(expected_opt[i].value==val)
        {

          return expected_opt[i].text
        }
      }
    },
    companyFilter(val,company_opt){
      for(var i=0;i<company_opt.length;i++)
      {
        if(company_opt[i].value==val)
        {

          return company_opt[i].text
        }
      }
    },
    userFilter(val,userFilter_opt){
      for(var i=0;i<userFilter_opt.length;i++)
      {
        if(userFilter_opt[i].id==val)
        {

          return userFilter_opt[i].name
        }
      }
    },
  },
  components:{
    "date-picker":DatePicker,
    own,
    outsource
  },
  created() {
    this.getLists(1)
    this.getCustomerOpt()
    // this.getDevelopOpt()
    this.getExpectedOpt()
    this.getCompany()
    this.getMaterialFilterOpt()
    this.getUserFilter()
  },
  methods: {
    getLists(page){
      this.isBusy = true;
      let data={
          page:page,
          order_num:this.filter.order_num,
          order_date:this.filter.order_date,
          item_num:this.filter.item_num,
          item_name:this.filter.item_name,
          estimated_time:this.filter.estimated_time,
          reply_date:this.filter.reply_date,
          name:this.filter.name,
          develop_status:this.filter.status,
          expected:this.filter.expected,
      }
      this.$http.post("/getCompletedItem",data)
      .then((res) => {
        this.dataList=res.data.lists.data
        this.isBusy = false;

        let resData=res.data.lists;
        this.totalRows = resData.total;
        this.pageCount = resData.per_page;

        this.paginate = {
          pages: [...Array(resData.last_page)].map(
            (x, _) => (x = { link: { params: { page: _ + 1 } } })
          ),
          currPage: page, // 停用前端分頁，讓表格永遠顯示後端分頁的第一筆。
          perPage: resData.per_page,
          maxPage: resData.last_page,

        }
        this.currPage = page
      })  
    },
    getCustomerOpt(){
        this.$http.get("/getCustomerFilter ")
        .then((res) => {
            this.customer_opt = res.data.options
        })
    },
    getDevelopOpt(){
        this.$http.get("/getDevelopOpt")
        .then((res) => {
            this.develop_opt = res.data.options
        })
    },
    getUserFilter(){
      this.$http.get("/getUserFilter")
        .then((res) => {
            this.userFilter_opt = res.data.options
        })
    },
    getExpectedOpt(){
        this.$http.get("/getExpectedOpt")
        .then((res) => {
            this.expected_opt = res.data.options
        })
    },
    getCompany(){
      this.$http.get("/getCompanyFilter")
      .then((res) => {
          this.company_opt = res.data.options
      })
    },
    getMaterialFilterOpt(){
      this.$http.get("/getMaterialFilter")
      .then((res) => {
          this.materialFilter_opt = res.data.options
      })
    },
    viewInfo(tag_id,develop_id){
      this.loadingModal=true
      let data={
        tag_id:tag_id,
        develop_id:develop_id
      }
      this.$http.post("/getDetail",data)
        .then((res) => {
            this.loadingModal=false
      
            //自家開發
            if(develop_id==4){
              this.ownDetailModal=true
              this.ownData = res.data[0]
            }

            //委外開發
            if(develop_id==5){
              this.outDetailModal=true
              this.outData = res.data[0]
            }

        })
    },
    toEdit(id) {
      this.editModal=true
      this.editOrderId=id
    },
    toFinished(id) {
      this.finishedModal=true
      this.finishedId=id
    },
    toConfirm(id) {
      this.loadingModal=true
      let data={
        tag_id:id
      }
      this.$http.post("/confirm",data)
      .then((res) => {
          this.loadingModal=false
          if(res.data.status=='success'){
            this.$notify({
                group: 'foo',
                type: 'success',
                title: '成功',
            });
            this.getLists(1);
          }else if(res.data.status=='unPermission'){
            this.$notify({
                group: 'foo',
                type: 'error',
                title: '無操作權限',
            });
          }
      })
    },
    saveEdit(){
      this.editModal=false
      this.getLists(1);
    },
    saveFinished(){
      this.finishedModal=false
      this.getLists(1);
    },

    
    toggleSearch() {
      if (this.toggle == "display:none") {
        this.toggle = "display:block";
        this.toggle_text = '<i class="fas fa-eye-slash fa-lg"></i>關閉搜尋';
      } else {
        this.toggle = "display:none";
        this.toggle_text = '<i class="fas fa-eye fa-lg"></i>進階搜尋';
        this.filter.order_num='';
        this.filter.order_date='';
        this.filter.item_num='';
        this.filter.item_name='';
        this.filter.estimated_time='';
        this.filter.reply_date='';
        this.filter.name='';
        this.filter.status='';
        this.filter.expected='';
      
        if(this.$route.params.page==undefined){
          this.getLists(1);
        }else{
          this.getLists(this.$route.params.page);
        }
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to.params.page) {
        this.getLists(to.params.page);
      }
    },
  },
};
</script>