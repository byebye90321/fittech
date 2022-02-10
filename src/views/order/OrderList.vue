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
        <button type="button" @click="toCreate()" class="page-header-btn">
          <i class="fas fa-plus fa-lg"></i>
          新增
        </button>
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
                <b-form-input id="`type-date`" type="date"></b-form-input>
              </b-col> 
              <b-col lg="4" class="my-1">
                <date-picker v-model="info.datetime" type="datetime" placeholder="指定發佈時間" format="YYYY-MM-DD" value-type="format" ></date-picker>                  
              </b-col>    

              
              <b-col lg="4" class="my-1">
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
                <p>
                  您可點擊《<a @click="toCreate()">新增</a
                  >》前往進行項目的新增操作。
                </p>
              </div>
            </template>

            <template v-slot:cell(customer)="row">
              <p>{{row.item.customer|customerFilter(customer_opt)}}</p>
            </template>

            <template v-slot:cell(develop_id)="row">
              <p>{{row.item.develop_id|developFilter(develop_opt)}}</p>
            </template>

       

            <template v-slot:cell(reply_date)="row">
              <p>{{row.item.reply_date|dateFilter}}</p>
            </template>


            <template v-slot:cell(status)="row">
              <span
                :class="
                  row.item.status == 2
                    ? 'statusStart'
                    : row.item.status == 1
                    ? 'statusWait'
                    : 'statusEnd'
                "
                >{{ row.item.status_name }}</span
              >
            </template>

            <template v-slot:cell(edit)="row">
              <b-dropdown id="dropdown-1" text="操作" class="dropdownPos mr-1">
                <template v-slot:button-content>
                  <i class="las la-pencil-alt la-lg"></i>&nbsp;
                  <span class="sr-only">操作</span>
                </template>
                <b-dropdown-item @click="toEdit(row.item.order_id)">
                  <i class="las la-edit la-lg pr-2"></i> 編輯
                </b-dropdown-item>
                <b-dropdown-item v-if="row.item.develop_id==3" @click="toDevelop(row.item.order_id)">
                  <i class="las la-pencil-alt la-lg pr-2"></i> 設定開發模式
                </b-dropdown-item>
                <b-dropdown-item @click="checkDel(row.item.order_id)" >
                  <i class="las la-trash-alt la-lg pr-2"></i> 刪除
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

    <b-modal id="modal-create" centered title="新增訂單" size="xl" v-model="createModal" hide-footer class="modal" >
        <b-col class="pt-3 pb-3">
            <create :customer_opt="customer_opt" @saveCreate="saveCreate"></create>
        </b-col>
    </b-modal>

    <b-modal id="modal-edit" centered title="編輯訂單" size="xl" v-model="editModal" hide-footer class="modal" >
        <b-col class="pt-3 pb-3">
            <edit :customer_opt="customer_opt" :order_id="editOrderId" @saveEdit="saveEdit"></edit>
        </b-col>
    </b-modal>

    <b-modal id="modal-develop" centered title="設定開發模式" size="xl" v-model="developModal" hide-footer class="modal" >
        <b-col class="pt-3 pb-3">
            <develop :develop_opt="develop_opt" :order_id="developOrderId" @saveDevelop="saveDevelop"></develop>
        </b-col>
    </b-modal>

    <b-modal id="modal-delete" centered title="刪除訂單" size="xl" v-model="deleteModal" hide-footer class="modal" >
      <p class="py-3">確定刪除訂單嗎？資料一經刪除則不可回復！</p>
      <div class="text-center pt-3">
        <button type="button" @click="toDel()" class=""> 
          確定刪除
        </button>
        <button type="button" @click="deleteModal=false" class="closeBtn">    
          取消
        </button>
      </div>     
    </b-modal>

    <b-modal id="modal-center" centered title="BootstrapVue" v-model="hintModal" hide-footer hide-header class="modal" no-close-on-backdrop>
        <b-col class="text-center pt-3 pb-3">
            <h3 class="pb-2">{{modalTitle}}</h3>
            <p class="pb-2" v-html="modalContent"></p>
            <div v-if="modalType=='delCheck'" >
                <button @click="toDel">確定</button>
                <button @click="$bvModal.hide('modal-center')" class="closeBtn">取消</button>
            </div>
            <div v-else >
                <button @click="$bvModal.hide('modal-center')">確定</button>
            </div>
        </b-col>
    </b-modal>
    <b-modal id="loading" centered v-model="loadingModal" hide-footer hide-header class="modal" no-close-on-backdrop >
        <b-col class="text-center pt-3 pb-3">
            <b-spinner class="mr-3"></b-spinner>Loading...
        </b-col>
    </b-modal>

  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import create from "./Create";
import edit from "./Edit";
import develop from "./Develop";

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
          key: "order_num",
          label: "採購單號",
          sortable: true,
          // thStyle: { width: "10%" },
          // thClass: "text-center",
          // tdClass: "text-center p-0",
        },
        {
          key: "customer",
          label: "客戶",
          sortable: true,
          // thStyle: { width: "20%" },
          // thClass: "text-center",
          // tdClass: "text-left",
        },
        {
          key: "item_num",
          label: "品號",
          sortable: true,
          // thStyle: { width: "15%" },
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
      filter: {
        status: 0,
      },
      status_opt: [],
      terms:[],
      toggle: "display:none",
      toggle_text: '<i class="fas fa-eye fa-lg"></i>進階搜尋',

      //modal
      hintModal: false,
      modalTitle: "",
      modalContent: "",
      loadingModal: false,
      modalType:'',
      delId:'',

      createModal:false,
      editModal:false,
      deleteModal:false,
      developModal:false,

      editOrderId:"",
      developOrderId:"",

      customer_opt:[],
      develop_opt:[]
    };
  },
  filters: {
    dateFilter:function(date){
      return moment(date).format('YYYY-MM-DD').toString()
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
    developFilter:function(val,develop_opt){

      for(var i=0;i<develop_opt.length;i++)
      {
        if(develop_opt[i].value==val)
        {

          return develop_opt[i].text
        }
      }
    },
    textFilter: function (value) {
      var t = "";
      if (value.length > 0) {
        for (var i = 0; i < value.length; i++) {
          t += value[i].name + " ";
        }
      } else {
        t = "-- 無 --";
      }
      return t;
    },
  },
  components:{
    "date-picker":DatePicker,
    create,
    edit,
    develop,
  },
  props: {
    service: String,
    type: String,
  },
  created() {
    this.getLists(1)
    this.getCustomerOpt()
    this.getDevelopOpt()
  },
  methods: {
    getLists(page){
      this.isBusy = true;
      let data={
          page:page
      }
      this.$http.post("/getOrderItem",data)
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
    getDevelopOpt(){
        this.$http.get("/getDevelopOpt")
        .then((res) => {
            console.log(res)
            this.develop_opt = res.data.options
        })
    },
    getStatusOpt() {
      let data = {};
      this.$http.post("posts/status", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            var obj = res.data.data;
            this.status_opt.push({ text: "全部顯示", value: 0 });
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                this.status_opt.push({ text: obj[prop], value: prop });
              }
            }
          } else {
            alert(res.data.message);
          }
        } else {
          alert(res.data.message);
        }
      });
    },
    toStatus(e) {
      this.filter.status = e;
      this.getLists(1);
    },
    toCreate() {
      this.createModal=true
    },
    toEdit(id) {
      this.editModal=true
      this.editOrderId=id
    },
    toDevelop(id){
      this.developModal=true
      this.developOrderId=id
    },
    saveCreate(){
      this.createModal=false
      this.getLists(1);
    },
    saveEdit(){
      this.editModal=false
      this.getLists(1);
    },
    saveDevelop(){
      this.developModal=false
      this.getLists(1);
    },
    checkDel(id){
      this.delId=id
      this.deleteModal=true
    },
    toDel(id) {
      this.deleteModal=false
      this.loadingModal=true
      let data = {
        order_id: this.delId,
      };
      this.$http.post("delOrderData", data)
      .then((res) => {
        this.loadingModal=false
        this.getLists(1)
      });
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