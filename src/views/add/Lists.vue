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
      </div>
    </CCardBody>
    <b-form-group>
        <b-form-radio-group
        buttons
        button-variant="outline-danger"
        v-model="filter.type"
        :options="typeFilter_opt"
        @change="toStatus($event)"
        ></b-form-radio-group>
    </b-form-group>

    <CCardBody class="p-0">
      <hr />
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

            <template v-slot:cell(type)="row">
              <p>{{row.item.type|typeFilter(typeFilter_opt)}}</p>
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

   

            <template v-slot:cell(edit)="row">
              <b-dropdown id="dropdown-1" text="操作" class="dropdownPos mr-1">
                <template v-slot:button-content>
                  <i class="las la-pencil-alt la-lg"></i>&nbsp;
                  <span class="sr-only">操作</span>
                </template>
                <b-dropdown-item @click="toEdit(row.item.cid)">
                  <i class="las la-edit la-lg pr-2"></i> 編輯
                </b-dropdown-item>
                <b-dropdown-item @click="checkDel(row.item.cid)" >
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
            @input="getLists"
          ></b-pagination-nav>
        </div>
      </b-row>
    </CCardBody>



    <b-modal id="modal-edit" centered :title="editId==null?'下拉選項-新增':'下拉選項-編輯'" size="xl" v-model="editModal" hide-footer class="modal" >
        <b-col class="pt-3 pb-3">
            <edit :editId="editId" @saveData="saveData"></edit>
        </b-col>
    </b-modal>

    <b-modal id="loading" centered v-model="loadingModal" hide-footer hide-header class="modal" no-close-on-backdrop >
        <b-col class="text-center pt-3 pb-3">
            <b-spinner class="mr-3"></b-spinner>Loading...
        </b-col>
    </b-modal>

    <b-modal id="modal-delete" centered title="刪除選項" size="xl" v-model="deleteModal" hide-footer class="modal" >
      <p class="py-3">確定刪除嗎？資料一經刪除則不可回復！</p>
      <div class="text-center pt-3">
        <button type="button" @click="toDel()" class=""> 
          確定刪除
        </button>
        <button type="button" @click="deleteModal=false" class="closeBtn">    
          取消
        </button>
      </div>     
    </b-modal>

  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import edit from './Edit'



export default {
  data() {
    return {
      //列表
      isBusy: false,
      dataList: [],
      fields: [
        {
          key: "name",
          label: "名稱",
          sortable: true,
          thStyle: { width: "40%" },
        },
        {
          key: "type",
          label: "類別",
          sortable: true,
          thStyle: { width: "40%" },
        },
        {
          key: "edit",
          label: "編輯",
          sortable: false,
          thStyle: { width: "20%" },
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

      typeFilter_opt:[],

      filter:{
          type:''
      },


      //modal
      loadingModal: false,
      deleteModal:false,

      editModal:false,

      editId:null,

    };
  },

  components:{
      edit
  },
  filters:{
    typeFilter:function(val,typeFilter){

      for(var i=0;i<typeFilter.length;i++)
      {
        if(typeFilter[i].value==val)
        {

          return typeFilter[i].text
        }
      }
    },
  },
  created() {
    this.getLists(1)
    this.getTypeOpt()
  },
  methods: {
    getLists(page){
      this.isBusy = true;
      let data={
          page:page,
          type:this.filter.type
      }
      this.$http.post("/getOptList",data)
      .then((res) => {
        console.log(res)
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
    getTypeOpt(){
      this.$http.get("/getTypeOpt")
      .then((res) => {
        this.typeFilter_opt = res.data.options
        this.typeFilter_opt.push({text:'全部',value:''})
      })  
    },
    
    toCreate() {
        this.editId = null
        this.editModal=true
    },
    toEdit(val) {
        this.editId = val
        console.log(this.editId)
        this.editModal=true
    },
    saveData(){
      this.editModal=false
      this.getLists(1);
    }, 
    toStatus(val){
      this.filter.type = val
      this.getLists(1)
    },
    checkDel(id){
      this.delId=id
      this.deleteModal=true
    },
    toDel(id) {
      this.deleteModal=false
      this.loadingModal=true
      let data = {
        cid: this.delId,
      };
      this.$http.post("/delTypeData", data)
      .then((res) => {
        this.loadingModal=false
        this.getLists(1)
      });
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