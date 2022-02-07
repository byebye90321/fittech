<template>
  <div>
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
      <b-row>
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
      </b-row>
      <CCard :style="toggle">
        <CCardBody>
          <b-row>
              <b-col lg="4" class="my-1">
                <b-form-input type="text" v-model="filter.name" placeholder="標題" size="small"></b-form-input>
              </b-col>  
              <b-col lg="4" class="my-1">
                  <v-autocomplete 
                    :items="terms" 
                    v-model="filter.term" 
                    :get-label="getLabel" 
                    @update-items="updateItems"
                    :min-len="1"
                    placeholder="分類"
                    :auto-select-one-item="false"
                    :component-item='template'
                    >
                  </v-autocomplete>
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

            <template v-slot:cell(thumbnail)="row">
              <img v-if="row.item.thumbnail!=''" :src="row.item.thumbnail" class="img-fluid" />
              <p v-else class="text-secondary">無</p>
            </template>

            <template v-slot:cell(terms)="row">
              <p :class="row.item.terms.length!=0?'':'text-secondary'">{{ row.item.terms | textFilter }}</p>
            </template>

            <template v-slot:cell(is_top)="row">
              <p v-if="row.item.is_top == 1">
                <i
                  class="fas fa-check-circle fa-lg text-danger"
                  v-c-tooltip.hover="'結束日：' + row.item.top_end_date"
                ></i>
              </p>
              <p v-else>
                <i class="fas fa-times-circle fa-lg text-secondary"></i>
              </p>
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
                <b-dropdown-item @click="toEdit(row.item.posts_id)">
                  <i class="las la-edit la-lg pr-2"></i> 編輯
                </b-dropdown-item>
                <b-dropdown-item @click="toTrash(row.item.posts_id)" v-if="row.item.status!=5">
                  <i class="las la-trash la-lg pr-2"></i> 垃圾桶
                </b-dropdown-item>
                <b-dropdown-item @click="checkDel(row.item.posts_id)" v-if="row.item.status==5">
                  <i class="las la-times-circle la-lg pr-2"></i> 刪除
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

import Autocomplete from 'v-autocomplete'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-autocomplete/dist/v-autocomplete.css'

Vue.use(Autocomplete)
import ItemTemplate from '../ItemTemplate.vue'
export default {
  data() {
    return {
      template: ItemTemplate,
      //列表
      isBusy: false,
      dataList: [],
      fields: [
        {
          key: "thumbnail",
          label: "代表圖",
          sortable: true,
          thStyle: { width: "10%" },
          thClass: "text-center",
          tdClass: "text-center p-0",
        },
        {
          key: "name",
          label: "標題",
          sortable: true,
          thStyle: { width: "20%" },
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "terms",
          label: "分類",
          sortable: true,
          thStyle: { width: "15%" },
        },
        {
          key: "is_top",
          label: "置頂",
          sortable: true,
        },
        {
          key: "viewed",
          label: "瀏覽數",
          sortable: true,
        },
        {
          key: "sort",
          label: "排序",
          sortable: false,
        },
        {
          key: "status",
          label: "狀態",
          sortable: false,
        },
        {
          key: "publish_at",
          label: "發佈時間",
          sortable: true,
        },
        {
          key: "edit",
          label: "操作",
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
        term:""
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
    };
  },
  filters: {
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
  props: {
    service: String,
    type: String,
  },
  created() {
    this.getLists(1);
    this.getStatusOpt();
  },
  methods: {
    getLabel (item) {
      if(item!=null){
        return item.name
      }else{
        return '';
      }

    },
    updateItems (text) {
        let data={
          type:this.type,
          name:text
        }
        this.$http.post("/terms/autocomplete", data)
        .then((res) => {
          if (res.data.code == 200) {
            if (res.data.status == "success") {
              this.terms = res.data.data
            }
          }
        })  
    },
    getLists(page) {
      this.isBusy = true;
      var filerTremId=''
      if(this.filter.term!=null)
        filerTremId = this.filter.term.id
      else 
        filerTremId=''

      let data = {
        action: "lists",
        type: this.type,
        limit: this.pageCount,
        parent_id: 0,
        page: page,
        name: this.filter.name,
        status: this.filter.status,
        term_id:filerTremId
      };
      this.$http.post("posts", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            this.isBusy = false;
            this.dataList = res.data.data.data;
            let resData = res.data.data;
            if (this.dataList != null) {
              this.totalRows = resData.total;
              this.pageCount = resData.per_page;

              this.paginate = {
                pages: [...Array(resData.last_page)].map(
                  (x, _) => (x = { link: { query: { page: _ + 1 } } })
                ),
                currPage: page, // 停用前端分頁，讓表格永遠顯示後端分頁的第一筆。
                perPage: resData.per_page,
                maxPage: resData.last_page,
              };
            }
          } else {
            alert(res.data.message);
          }
        } else {
          alert(res.data.message);
        }
      });
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
      this.$router.push({
        name: "posts.create",
        params: { type: this.type },
      });
    },
    toEdit(id) {
      console.log(this.type)
      this.$router.push({
        name: "posts.edit",
        params: { type: this.type  },
        query:{ posts_id: id }
      });
    },
    toTrash(id) {
      let data = {
        posts_id: id,
      };
      this.$http.post("posts/trash", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            // alert(res.data.message);
            this.hintModal=true
            this.modalTitle=res.data.message
            this.modalContent="狀態已變更為「垃圾桶」"
            this.modalType=''
            this.getLists(1);
          }
        }
      });
    },
    checkDel(id){
      this.delId=id
      this.hintModal=true
      this.modalTitle="提示"
      this.modalContent="確認進行刪除嗎？一經刪除後不可回覆！"
      this.modalType='delCheck'
    },
    toDel(id) {
      this.hintModal=false
      this.loadingModal=true
      let data = {
        action: "delete",
        posts_id: this.delId,
        type: this.type,
      };
      this.$http.post("posts", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            this.loadingModal=false
            setTimeout(()=>{
              this.hintModal=true
              this.modalTitle=res.data.message
              this.modalContent=""
              this.modalType=''
            },500)
            
            this.getLists(1);
          }
        }
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