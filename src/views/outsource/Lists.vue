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
      <!--<b-row>
        <b-col lg="12" class="my-1">
          <b-form-group>
            <b-form-radio-group
              buttons
              button-variant="outline-danger"
              v-model="filter.status"
              v-on:change="toStatus($event)"
              :options="status_opt"
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>-->
      <CCard :style="toggle">
        <CCardBody>
          <b-row>
              <b-col lg="4" class="my-1">
                <b-form-input type="number" v-model="filter.order_num" placeholder="採購單號" required></b-form-input>
              </b-col> 
              <b-col lg="4" class="my-1">
                <b-form-input type="text" v-model="filter.item_num" placeholder="品號" required></b-form-input>
              </b-col> 
              <b-col lg="4" class="my-1">
                <b-form-input type="text" v-model="filter.item_name" placeholder="品名" required></b-form-input>
              </b-col> 
              <b-col lg="4" class="my-1">
                <date-picker v-model="filter.order_date" type="datetime" placeholder="單據日期" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
              </b-col> 
              <b-col lg="4" class="my-1">
                <date-picker v-model="filter.reply_date" type="datetime" placeholder="回覆日" format="YYYY-MM-DD" value-type="format" required></date-picker>                  
              </b-col> 
              <b-col lg="4" class="my-1">
                <b-form-input type="text" v-model="filter.user" placeholder="負責人" required></b-form-input>
              </b-col> 
              <b-col lg="8" class="my-1">
                <b-form-group>
                  <b-form-radio-group
                    buttons
                    button-variant="outline-danger"
                    v-model="filter.status"
                    :options="status_opt"
                  ></b-form-radio-group>
                </b-form-group>
              </b-col> 

              
              <b-col lg="4" class="my-1 text-right">
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
            <template v-slot:cell(reply_date)="row">
              <p>{{row.item.main.reply_date|dateFilter}}</p>
            </template>
            <template v-slot:cell(estimated_time)="row">
              <p>{{row.item.estimated_time|dateFilter}}</p>
            </template>

            <template v-slot:cell(name)="row">
              <p v-if="row.item.personnel!=null">{{row.item.personnel.name}}</p>
            </template>

            

            <template v-slot:cell(develop_status)="row">
              <span
                :class="
                  row.item.develop_status == 8
                    ? 'statusStart'
                    : row.item.develop_status == 9
                    ? 'statusWait'
                    : row.item.develop_status == 10
                    ? 'status_success'
                    : 'statusEnd'
                "
                >{{ row.item.develop_status|statusFilter(status_opt) }}</span
              >
            </template>

            <template v-slot:cell(edit)="row">
              <b-dropdown id="dropdown-1" text="操作" class="dropdownPos mr-1">
                <template v-slot:button-content>
                  <i class="las la-pencil-alt la-lg"></i>&nbsp;
                  <span class="sr-only">操作</span>
                </template>
                <b-dropdown-item @click="toEdit(row.item.tag_id)" v-if="row.item.develop_status==7">
                  <i class="las la-edit la-lg pr-2"></i> 編輯
                </b-dropdown-item>
                <b-dropdown-item @click="toFinished(row.item.tag_id)" v-if="row.item.develop_status==8">
                  <i class="las la-check-circle la-lg pr-2"></i> 開發完成
                </b-dropdown-item>
                <b-dropdown-item @click="toConfirm(row.item.tag_id)" v-if="row.item.develop_status==9">
                  <i class="las la-check la-lg pr-2"></i> 確認
                </b-dropdown-item>
              </b-dropdown>
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
          ></b-pagination-nav>
        </div>
      </b-row>
    </CCardBody>

    <b-modal id="modal-edit" centered title="編輯訂單" size="xl" v-model="editModal" hide-footer class="modal" >
        <b-col class="pt-3 pb-3">
            <edit :tag_id="editOrderId" @saveEdit="saveEdit"></edit>
        </b-col>
    </b-modal>

    <b-modal id="modal-edit" centered title="開發完成" size="xl" v-model="finishedModal" hide-footer class="modal" >
        <b-col class="pt-3 pb-3">
            <finished :tag_id="finishedId" :material_opt="material_opt" @saveFinished="saveFinished"></finished>
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

import edit from "./Edit";
import finished from "./Finished";

export default {
  data() {
    return {
      info:{
        datetime:"",
      },
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
          key: "name",
          label: "廠商名稱",
          sortable: false,
        },
        {
          key: "price",
          label: "委外價格",
          sortable: false,
        },
        {
          key: "develop_status",
          label: "開發狀態",
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
          reply_date:"",  //回覆日
          user:"",  //負責人
          status: 0,
      },
      status_opt: [],
      terms:[],
      toggle: "display:none",
      toggle_text: '<i class="fas fa-eye fa-lg"></i>進階搜尋',

      //modal
      loadingModal: false,


      editModal:false,
      finishedModal:false,

      editOrderId:"",
      finishedId:"",

      status_opt:[],
      customer_opt:[],
      material_opt:[],

    };
  },
  filters: {
    dateFilter:function(date){
      if(date!=null&&date!='')
        return moment(date).format('YYYY-MM-DD').toString()
      else
        return ''
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
  },
  components:{
    "date-picker":DatePicker,
    edit,
    finished,
  },
  created() {
    this.getLists(1)
    this.getCustomerOpt()
    this.getDevelopStatusOpt()
    this.getMaterialOpt()
  },
  methods: {
    getLists(page){
      this.isBusy = true;
      let data={
          page:page
      }
      this.$http.post("/getOutsourceOrderItem",data)
      .then((res) => {
        console.log(res)
        this.dataList=res.data.lists.data
        this.isBusy = false;

        let resData=res.data.lists;
        this.totalRows = resData.total;
        this.pageCount = resData.per_page;

        this.paginate = {
          pages: [...Array(resData.last_page)].map(
            (x, _) => (x = { link: { query: { page: _ + 1 } } })
          ),
          currPage: page, // 停用前端分頁，讓表格永遠顯示後端分頁的第一筆。
          perPage: resData.per_page,
          maxPage: resData.last_page,

        }
      })  
    },
    getCustomerOpt(){
        this.$http.get("/getCustomerOpt")
        .then((res) => {
            console.log(res)
            this.customer_opt = res.data.options
        })
    },
    getDevelopStatusOpt(){
        this.$http.get("/getDevelopStatusOpt")
        .then((res) => {
            console.log(res)
            this.status_opt = res.data.options
        })
    },
    getMaterialOpt(){
      this.$http.get("/getMaterialOpt")
      .then((res) => {
          console.log(res)
          this.material_opt = res.data.options
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
          console.log(res)
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
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to.query.page) {
        this.getLists(to.query.page);
      }
    },
  },
};
</script>