<template>
  <CForm @submit.prevent="saveData()">
    <CCardBody class="d-flex justify-content-between p-0">
      <div>
        <h2>
          <strong>{{ $route.meta.label }}</strong>
        </h2>
        <CBreadcrumbRouter class="border-0 mb-0 pl-0" />
      </div>
      <div>
        <button type="button" @click="toBack()" class="page-header-btn">
          <i class="fas fa-arrow-left fa-lg"></i>
          返回
        </button>
        <button type="submit" class="page-header-btn text-danger">
          <i class="far fa-save fa-lg"></i>
          儲存
        </button>
      </div>
    </CCardBody>
    <CCardBody class="p-0" v-if="loadingModal == false">
      <hr />
      <b-tabs pills content-class="mt-3">
        <b-tab title="基本設定">
          <CRow>
            <CCol md="8">
              <template>
                <CInput
                  v-if="block.custom=='1'"
                  type="text"
                  placeholder="產品編號"
                  v-model="info.custom"
                  minlength="2"
                  maxlength="100"
                  addInputClasses="form-control-lg"
                  required
                />
              </template>
              <template>
                <CInput
                  type="text"
                  placeholder="標題"
                  v-model="info.name"
                  minlength="2"
                  maxlength="100"
                  addInputClasses="form-control-lg"
                  required
                />
              </template>
              <template>
                <CRow class="form-group">
                  <CCol sm="12">
                    <b-form-textarea
                      v-if="block.description=='1'"
                      v-model="info.description"
                      placeholder="簡短描述(字數上限250字)"
                      rows="5"
                      max-rows="5"
                    ></b-form-textarea>
                  </CCol>
                </CRow>
              </template>
        
              <template v-if="type!='page'">
                <CRow class="form-group">
                  <CCol sm="12">
                    <ckeditor
                      id="editor"
                      :editor="editor"
                      v-model="info.content"
                      :config="editorConfig"
                    >
                    </ckeditor>
                  </CCol>
                </CRow>
              </template>
            </CCol>
            <CCol md="4">
              <CCard>
                <CCardHeader>基本設定</CCardHeader>
                <CCardBody>
                  <template>
                    <CRow class="form-group">
                        <label class="col-sm-3 col-form-label" >
                            <span class="text-danger">* </span>狀態
                        </label >
                        <CCol sm="9">
                            <b-form-select v-model="info.status" :options="status_opt" text-field="text" value-field="value" required >
                            <template #first>
                                <b-form-select-option :value="null" disabled >- 請選擇 -</b-form-select-option >
                            </template>
                            </b-form-select>
                        </CCol>
                    </CRow>
                  </template>
                  <template>
                    <CRow class="form-group" v-if="block.sort=='1'">
                        <label class="col-sm-3 col-form-label" >
                            <span class="text-white">* </span>排序
                        </label >
                        <CCol sm="9">
                            <CInput
                                type="number"
                                placeholder="排序"
                                v-model="info.sort"
                              />
                              <p>※若版面設定內將排序方法設為自訂，將會以此數值做排序依據</p>
                        </CCol>
                    </CRow>
                    
                  </template>
                <template>
                <CRow class="form-group">
                  <label class="col-sm-12 col-form-label"
                    >頁面描述
                    <i
                      class="fas fa-question-circle"
                      v-c-tooltip.hover="
                        '請描述重點內容，將使搜尋引擎更友善收錄'
                      "
                    ></i
                  ></label>
                  <CCol sm="12">
                    <b-form-textarea
                      v-model="meta.description"
                      placeholder="頁面描述(字數上限250字)"
                      rows="3"
                      max-rows="3"
                    ></b-form-textarea>
                  </CCol>
                </CRow>
              </template>
              <template>
                <CRow class="form-group">
                  <label class="col-sm-12 col-form-label"
                    >關鍵字
                    <i
                      class="fas fa-question-circle"
                      v-c-tooltip.hover="
                        '請使用逗號(,)分隔每組關鍵字，例如：設計,網頁。'
                      "
                    ></i
                  ></label>
                  <CCol sm="12">
                    <b-form-textarea
                      v-model="meta.keywords"
                      placeholder="關鍵字(建議勿超過五組設定)"
                      rows="3"
                      max-rows="3"
                    ></b-form-textarea>
                  </CCol>
                </CRow>
              </template>
              </CCardBody>
        </CCard>
        <CCard v-if="block.terms=='1'">
            <CCardHeader
                @click="collapse_category = !collapse_category" :class="[ collapse ? 'open' : '', 'btn', 'text-left', 'collapseIcon', ]" >
                <strong >相關分類(可複選) <i class="fas fa-question-circle" v-c-tooltip.hover="'此項目所屬分類設定，可複選多分類'" ></i></strong>
            </CCardHeader>
            <CCollapse :show="collapse_category">
                <CCardBody>
                <template>
                    <CRow class="form-group">
                    <CCol sm="12">
                        <treeselect 
                        v-model="info.term_id" 
                        value-consists-of="ALL_WITH_INDETERMINATE" 
                        :multiple="true" 
                        :options="category_opt" 
                        :normalizer="normalizer" 
                        placeholder="選擇分類" 
                        :alwaysOpen="true"
                        :flat="true"
                        />
                    </CCol>
                    </CRow>
                </template>
                </CCardBody>
            </CCollapse>
        </CCard>
        <CCard v-if="block.tag=='1'">
            <CCardHeader @click="collapse_tag = !collapse_tag" :class="[ collapse ? 'open' : '', 'btn', 'text-left', 'collapseIcon', ]" >
                <strong >
                    標籤(可複選) <i class="fas fa-question-circle" v-c-tooltip.hover="'此項目所屬分類設定，可複選多分類'" ></i >
                </strong>
            </CCardHeader>
            <CCollapse :show="collapse_tag">
                <CCardBody>
                <template>
                    <CRow class="form-group">
                    <CCol sm="12">
                        <tags-input 
                          element-id="tags" 
                          v-model="info.tag_id" 
                          :existing-tags="tag_opt" 
                          id-field="value" 
                          text-field="text" 
                          placeholder="輸入搜尋標籤，若有已建立標籤，則會出現於下方可進行點選" 
                          :typeahead="true" 
                          :typeahead-always-show="false"
                          >
                        </tags-input>
                    </CCol>
                    </CRow>
                </template>
                </CCardBody>
            </CCollapse>
            </CCard>
            <CCard v-if="block.thumbnail=='1'">
                <CCardHeader @click="collapse_thumbnail = !collapse_thumbnail" :class="[ collapse ? 'open' : '', 'btn', 'text-left', 'collapseIcon', ]" >
                    <strong >縮圖 <i class="fas fa-question-circle" v-c-tooltip.hover="'列表中所顯示的主要圖片'" ></i ></strong>
                </CCardHeader>
                    <CCollapse :show="collapse_thumbnail">
                <CCardBody>
                    <p class="pb-2">※建議尺寸：
                      <span v-if="fixedThumbnail[0]!=1 && fixedThumbnail[1]!=1">{{fixedThumbnail[0]}}x{{fixedThumbnail[1]}}或等比例之圖檔(上傳後可線上裁切比例)</span>
                      <span v-else>無</span>
                    </p>
                    <template>
                        <CRow class="form-group">
                        <CCol sm="12">
                            <div>
                            <Uploader :fixed="fixedT" :fixedNumber="fixedThumbnail" :guid="info.guid" :media="info.thumbnail" @childByValue="childByValue($event,'thumbnail')" ></Uploader>
                            </div>
                        </CCol>
                        </CRow>
                    </template>
                </CCardBody>
            </CCollapse>
        </CCard>
        <CCard v-if="block.media=='1'">
            <CCardHeader @click="collapse_cover = !collapse_cover" :class="[ collapse ? 'open' : '', 'btn', 'text-left', 'collapseIcon', ]" >
                <strong>主要視覺 <i class="fas fa-question-circle" v-c-tooltip.hover="'列表中所顯示的主要圖片'" ></i ></strong>
            </CCardHeader>
            <CCollapse :show="collapse_cover">
                <CCardBody>
                  
                    <template>
                        <b-form-radio-group v-if="block.media_type=='1'" v-model="info.media_type" :options="media_typeOpt" class="mb-3" ></b-form-radio-group>
                        <CRow class="form-group">
                            <CCol sm="12">
                                <div v-if="info.media_type == 'image'">
                                    <div>
                                        <p class="pb-2">※建議尺寸：
                                          <span v-if="fixedImage[0]!=1 && fixedImage[1]!=1">{{fixedImage[0]}}x{{fixedImage[1]}}或等比例之圖檔(上傳後可線上裁切比例)</span>
                                          <span v-else>無</span>
                                        </p>
                                        <Uploader :fixed="fixedI" :fixedNumber="fixedImage" :guid="info.guid" :media="info.media" @childByValue="childByValue($event,'media')" ></Uploader>
                                    </div>
                                </div>
                                    <div v-else-if="info.media_type == 'video'">
                                        <div v-if="info.video.url == '' || info.video.url == null" >
                                        <single-video-upload
                                            :guid="info.guid"
                                            @childByValue="mediaVideo"
                                        ></single-video-upload>
                                        </div>
                                        <div v-else style=" border: #ddd 1px solid; border-radius: 5px; padding: 10px; " >
                                        <div class="row">
                                            <div class="col-md-3 imageBlock h-c-v-c">
                                            <i class="far fa-file-alt fa-4x"></i>
                                            </div>
                                            <div class="col-md-6 h-c-v-l text-left flex-column" ></div>
                                            <div class="col-md-3 h-c-v-c">
                                            <div>
                                                <button class="imgBtn" type="button" @click="removeVideo()" v-c-tooltip.hover="'刪除'" >
                                                <i class="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div v-else-if="info.media_type == 'youtube'">
                                        <b-form-textarea v-model="info.url" placeholder="請貼入youtube影片id。" rows="3" max-rows="3" ></b-form-textarea>
                                        <p class="pt-2 text-danger">
                                        ※例影片網址為https://www.youtube.com/watch?v=Sw1Flgub9s8，則請填入最後Sw1Flgub9s8字段
                                        </p>
                                    </div>
                            </CCol>
                        </CRow>
                    </template>
                    </CCardBody>
                </CCollapse>
            </CCard>
            <CCard>
                <CCardHeader @click="collapse_date = !collapse_date" :class="[ collapse_date ? 'open' : '', 'btn', 'text-left', 'collapseIcon', ]" >
                  <strong>指定發佈</strong>
                </CCardHeader>
                <CCollapse :show="collapse_date">
                  <CCardBody>
                    <template v-if="block.publish_at=='1'">
                      <CRow class="form-group">
                        <label class="col-sm-3 col-form-label" >
                            發佈 <i class="fas fa-question-circle" v-c-tooltip.hover="'如不指定發佈時間則不需設定'" ></i >
                        </label>
                        <CCol sm="9">
                          <date-picker v-model="info.publish_at" type="datetime" placeholder="指定發佈時間" format="YYYY-MM-DD HH:mm:ss" value-type="format" ></date-picker>
                        </CCol>
                      </CRow>
                    </template>
                    <hr />
                    <template v-if="block.is_top=='1'||block.top_end_date=='1'">
                      <CRow class="form-group">
                        <label class="col-sm-12 col-form-label" >
                          置頂設定
                          <i class="fas fa-question-circle" v-c-tooltip.hover=" '當前時間大於設定的結束時間則會更改為非置頂狀態，如不設定將會持續保持置頂狀態' " ></i >
                        </label>
                        <CCol sm="3" v-if="block.is_top=='1'">
                          <b-form-checkbox v-model="info.is_top" value="1" unchecked-value="0" class="form-control no-border pr-0" >置頂</b-form-checkbox >
                        </CCol>
                        <CCol sm="9" v-if="block.top_end_date=='1'">
                          <date-picker v-model="info.top_end_date" type="datetime" placeholder="指定置頂結束時間" format="YYYY-MM-DD HH:mm:ss" value-type="format" :disabled="info.is_top == 0" ></date-picker>
                        </CCol>
                      </CRow>
                    </template>
                  </CCardBody>
                </CCollapse>
              </CCard>
            </CCol>
          </CRow>
        </b-tab>
        <b-tab title="規格設定" v-if="block.options=='1'">
          <CRow>
            <CCol md="12">
              <CCard>
                <!-- <CCardHeader>選項</CCardHeader> -->
                <CCardBody>
                  <template v-if="specOpt.length!=0">
                    <div v-for="(item, cindex) in specOpt" :key="cindex" class='pb-3'>
                      <h2 class="pb-3">
                        <strong>{{ item.name }}</strong>
                      </h2>
                      <tags-input
                        v-if="specOpt.length != 0"
                        element-id="tags"
                        v-model="info.options[item.options_id]"
                        :existing-tags="item.options"
                        id-field="value_id"
                        text-field="value"
                        placeholder="輸入文字搜尋其他品項，並點擊下方欲加入之標籤；若沒有想要的，請手打新增並於輸入句尾加「,」進行資料鍵入，(可添加多筆)"
                        :typeahead="true"
                        typeahead-style="badges"
                        :typeahead-always-show="false"
                        discard-search-text="新增標籤(手打)"
                        @initialized="getAcOpt(item.options_id, cindex)"
                        @tag-added="addOptionsTag($event, item.options_id)"
                        :add-tags-on-comma="true"
                      ></tags-input>
                    </div>
                  </template>
                  <template v-else>
                    <p class="py-3 text-center">尚未設定規格選項，請先<span class="link" @click="goAddSpec()">點此</span>前往新增</p>
                  </template>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </b-tab>
        <b-tab title="選項設定" v-if="block.values=='1'||block.googlemap=='1'">
          <CRow>
            <CCol md="12">
              <CCard v-if="block.values=='1'">
                <CCardHeader>選項</CCardHeader>
                <CCardBody>
                  <table class="optionsTable" >
                    <tr>
                      <td>欄位名稱</td>
                      <td>內容值</td>
                      <td>
                        <button type="button" @click="addWork_opt()" v-c-tooltip.hover="'新增項目'" >+</button>
                      </td>
                    </tr>
                    <tr v-for="(item, index) in info.values" :key="index">
                      <td>
                        <CInput type="text" :placeholder="'如：官方網站、品牌名稱...等'" v-model="item.key" minlength="2" maxlength="100" />
                      </td>
                      <td>
                        <CInput type="text" :placeholder="'如為網址請輸入包含 http 或 https 的完整網址'" v-model="item.value" minlength="2" maxlength="100" />
                      </td>
                      <td>
                        <button type="button" class="closeBtn" v-c-tooltip.hover="'移除本列'" @click="subWork_opt(index)" > - </button>
                      </td>
                    </tr>
                  </table>
                </CCardBody>
              </CCard>
              <CCard v-if="block.googlemap=='1'">
                <CCardHeader>地圖(Google Map嵌入)</CCardHeader>
                <CCardBody>
                  <b-form-textarea
                      v-model="info.map"
                      placeholder="請貼入google map內嵌語法。於google map搜尋地點後，點擊「分享」，於彈出視窗選擇嵌入地圖，再點擊「複製HTML」完成複製。"
                      rows="6"
                      max-rows="6"
                  ></b-form-textarea>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </b-tab>
        <b-tab title="附加圖片" v-if="block.images=='1'">
          <CRow>
            <CCol md="12">
              <CCard>
                <CCardBody>
                  <p>※建議尺寸：
                    <span v-if="fixedMutiUmage[0]!=1 && fixedMutiUmage[1]!=1">{{fixedMutiUmage[0]}}x{{fixedMutiUmage[1]}}或等比例之圖檔(上傳後可線上裁切比例)</span>
                    <span v-else>無</span>
                  </p>
                  <image-upload
                    ref="mulImage"
                    :value="info.images"
                    :guid="info.guid"
                    :isMultiple="true"
                    :fixed="fixedM"
                    :fixedNumber="fixedMutiUmage"
                    @multiImage="multiImage"
                  ></image-upload>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </b-tab>
        <b-tab title="附加檔案" v-if="block.files=='1'">
          <CRow>
            <CCol md="12">
              <CCard>
                <CCardBody>
                  <file-upload
                    ref="mulFile"
                    :value="info.files"
                    :guid="info.guid"
                    :isMultiple="true"
                    @multiFile="multiFile"
                  ></file-upload>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </b-tab>
        <b-tab title="附加影片" v-if="block.videos=='1'">
          <CRow>
            <CCol md="12">
              <CCard>
                <CCardBody>
                  <b-form-group>
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="info.videos_type"
                      :options="media_type_opt"
                      name="radio-options"
                    ></b-form-radio-group>
                  </b-form-group>
                  <template v-if="info.videos_type == 'video'">
                    <video-upload
                      ref="mulVideo"
                      :value="info.upload_videos"
                      :guid="info.guid"
                      :isMultiple="true"
                      @multiVideo="multiVideo"
                    ></video-upload>
                  </template>
                  <template v-else-if="info.videos_type == 'youtube'">
                    <CInput
                      type="text"
                      placeholder="貼上Youtube網址"
                      v-model="info.yt_url"
                    />
                  </template>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </b-tab>

        <b-tab title="相關產品" v-if="block.relation_id=='1'"> 
            <CCard>
                <CCardBody>
                    <b-form-radio-group
                        id="radio-group-2"
                        v-model="info.relation_type"
                        :options="relation_opt"
                        name="radio-options22"
                        @change="getNewItem"
                    ></b-form-radio-group>
                    <div class="mt-3">
                        <tags-input
                            v-if="isItem"
                            element-id="tagss"
                            v-model="info.relation_id"
                            :existing-tags="ItemArray"
                            id-field="relation_id"
                            text-field="name"
                            placeholder="請輸入文字進行搜尋並添加相關產品"
                            :typeahead="true"
                            :typeahead-always-show="false"
                            :only-existing-tags="true"
                            @initialized="autocompleteItem()"
                        ></tags-input>
                    </div>
                </CCardBody>
            </CCard>
        </b-tab>
      </b-tabs>
    </CCardBody>
    <b-modal
      id="modal-center"
      centered
      title="BootstrapVue"
      v-model="hintModal"
      hide-footer
      hide-header
      class="modal"
      no-close-on-backdrop
    >
      <b-col class="text-center pt-3 pb-3">
        <h3 class="pb-2">{{ modalTitle }}</h3>
        <p class="pb-2">{{ modalContent }}</p>
        <div v-if="modalType=='warning'">
          <button @click="$bvModal.hide('modal-center')">確定</button>
        </div>
        <div v-else >
          <button @click="toBack()">返回列表</button>
        </div>
      </b-col>
    </b-modal>
    <b-modal
      id="loading"
      centered
      v-model="loadingModal"
      hide-footer
      hide-header
      class="modal"
      no-close-on-backdrop
    >
      <b-col class="text-center pt-3 pb-3">
        <b-spinner class="mr-3"></b-spinner>Loading...
      </b-col>
    </b-modal>
  </CForm>
</template>
<script>
import Vue from "vue";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import ImageUpload from "../components/addUpload/Images";
import FileUpload from "../components/addUpload/Files";
import VideoUpload from "../components/addUpload/Videos";

import Uploader from "../components/Uploader/upload";
import SingleVideoUpload from "../components/Uploader/Video";
import { ckeditorJS } from "../components/ckeditor5/ckeditorJS.js";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import VoerroTagsInput from "@voerro/vue-tagsinput";
Vue.component("tags-input", VoerroTagsInput);

export default {
  mixins: [ckeditorJS],
  data() {
    return {
      info: {
        custom:"",
        guid: "",
        name: "",
        url: "",
        description: "",
        content: "",
        time: "",
        status: null,
        is_top: 0,
        top_end_date: "",
        term_id: [],
        tag_id: [],
        media_type: "image",
        media: "",
        thumbnail:"",
        video: {},

        images: [],
        files: [],
        videos: [],
        videos_type: "video",

        values:[],
        options: [],
        yt_url: "",
        upload_videos: [],

        relation_id:[],

        map:"",
        relation_type:'news',

        sort:1,
      },
      meta: {
        keywords: "",
      },
      config: {
        height: 300,
      },
      status_opt: [],
      category_opt: [],
      tag_opt: [],
      ItemArray:[],
      media_typeOpt: [
        { text: "圖片", value: "image" },
        { text: "影片上傳", value: "video" },
        { text: "Youtube", value: "youtube" },
      ],
      media_type_opt: [
        { text: "上傳", value: "video" },
        { text: "youtube", value: "youtube" },
      ],
      relation_opt:[
          { text: "最新消息", value: "news" },
          
          { text: "商品", value: "goods" },
          { text: "案例", value: "works" },
          { text: "產品", value: "product" },
      ],

      collapse:true,
      collapse_cover: true,
      collapse_thumbnail: true,
      collapse_tag: true,
      collapse_category: true,
      collapse_date: true,

      //uploader image
      fixedT: false,
      fixedThumbnail: [ 1, 1 ],
      fixedI: false,
      fixedImage: [ 1, 1 ],
      fixedM: false,
      fixedMutiUmage: [ 1, 1 ],


      isthumb: "1",

      hintModal: false,
      modalTitle: "",
      modalContent: "",
      loadingModal: true,
      modalType:'',

      unUploadImg: false,
      unUploadFile: false,
      unUploadVideo: false,

      specOpt: [],

      items: [],

      spAcOpt: [],

      vaOptions: [],

      isItem:false,

      //block
      block:{
        thumbnail: "0",  //縮圖
        media: "0",  //大圖
        media_type: "0",  //大圖類型
        tag: "0",  //標籤
        terms: "0", //分類

        
        values: "0",  //選項頁

        options: "0",  //規格
        googlemap: "0",  //googlemap

        
        //附加檔案
        images: "0",
        files: "0",
        videos: "0",
        
        //相關產品
        relation_id: "0",

        //產品編號
        custom:'',

        is_top: "0", //置頂
        top_end_date: "0", //置頂結束時間
        publish_at: "1", //發布時間

        
        sort: "0", //排序
        description: "0", //描述
      },

    };
  },
  components: {
    "date-picker":DatePicker,
    "image-upload": ImageUpload,
    "file-upload": FileUpload,
    "video-upload": VideoUpload,

    Uploader,
    SingleVideoUpload,
    Treeselect,
    "tags-input": VoerroTagsInput,
  },
  props: {
    service: String,
    type: String,
  },
  created() {
    // if (this.$route.params.posts_id == null) {
    //   this.createOne();
    // } else {
    //   this.getData();
    // }
    this.getCategoryOpt();
    this.getTagOpt();
    this.getStatusOpt();

    this.getSettings()
    this.getSpecsOpt();
  },
  methods: {
    getData() {
      this.loadingModal = true;
      let data = {
        action: "info",
        type: this.type,
        posts_id: this.$route.query.posts_id,
      };
      this.$http.post("posts", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            this.info.guid = res.data.data.guid;
            this.$store.commit("setPostsGuid", this.info.guid );
            this.info.name = res.data.data.name;
            this.info.description = res.data.data.description;
            this.info.content = res.data.data.content;

            this.info.custom = res.data.data.custom;
            this.info.sort = res.data.data.sort;


            setTimeout(()=>{
              this.info.term_id = res.data.data.term_id;
            },1000)

            this.info.publish_at = res.data.data.publish_at;
            this.info.status = res.data.data.status;
            if (res.data.data.metas.meta_keywords != null) {
              this.meta.keywords = res.data.data.metas.meta_keywords;
            } 
            if (res.data.data.metas.meta_description != null) {
              this.meta.description = res.data.data.metas.meta_description;
            } 
            this.info.is_top = res.data.data.is_top;
            if (this.info.is_top == 1)
              this.info.top_end_date = res.data.data.top_end_date;
            
            // if (res.data.data.values.Works != null){
            //   this.info.values = res.data.data.values.Works.options;
            // }
            
            if(res.data.data.values!= null){
                if(res.data.data.values.addon!= null)
                    this.info.map = res.data.data.values.addon.googlemap;
                
                if (res.data.data.values.options != null)
                this.info.values = res.data.data.values.options;
                
                if (res.data.data.values.relation_type != null)
                this.info.relation_type = res.data.data.values.relation_type;
            }
            

            if(res.data.data.options!=null)
              this.info.options = res.data.data.options;


            //圖
            this.info.media_type = res.data.data.media_type
            if(this.info.media_type=='image')
              this.info.media = res.data.data.media;
            else if(this.info.media_type=='video')
              this.info.video = res.data.data.media;
            else if(this.info.media_type=='youtube')
              this.info.url = res.data.data.media.url;

            //縮圖
            this.info.thumbnail = res.data.data.thumbnail;
            // this.info.url = res.data.data.url;
            
            if(res.data.data.medias!= null){
                if (res.data.data.medias.video != null) {
                    this.info.upload_videos = res.data.data.medias.video;
                    this.info.videos_type = this.info.upload_videos[0].type;
                }
                if (res.data.data.medias.youtube != null) {
                    this.info.videos = res.data.data.medias.youtube;
                    this.info.videos_type = this.info.videos[0].type;
                    this.info.yt_url = this.info.videos[0].url;
                }
                if (res.data.data.medias.image != null) {
                    this.info.images = res.data.data.medias.image;
                }
                if (res.data.data.medias.file != null) {
                    this.info.files = res.data.data.medias.file;
                }
            }

            
            if(res.data.data.tag!=null){
                if(res.data.data.tag.length>0)
                {
                    for (var i = 0; i < res.data.data.tag.length; i++) {
                        this.info.tag_id.push({
                        text: res.data.data.tag[i],
                        value: res.data.data.tag[i],
                        });
                    }
                }
            }
            

            if(res.data.data.relation_id!= null)
                this.info.relation_id = res.data.data.relation_id

            this.isItem=true

            this.loadingModal = false;
          } else {
            alert(res.data.message);
          }
        } else {
          alert(res.data.message);
        }
      });
    },
    createOne() {
      let data = {
        type: this.type,
      };
      this.$http.post("posts/create", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            this.$route.query.posts_id = res.data.data.posts_id;
            this.info.guid = res.data.data.guid;
            this.$store.commit("setPostsGuid", this.info.guid );
            this.info.name = res.data.data.name;
            this.info.status = res.data.data.status;
            this.info.is_top = res.data.data.is_top;
            this.info.publish_at = res.data.data.publish_at;
            this.loadingModal = false;

          } else {
            alert(res.data.message);
          }
        } else {
          alert(res.data.message);
        }
      });
    },
    getSettings(){
      let data = {
        type: this.type,
      };
      this.$http.post("/posts/settings", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            var resData=res.data.data
            if(resData.blocks!=[]){
              this.block=resData.posts
            }
            if(resData.size.thumbnail_width &&resData.size.thumbnail_height){
              this.fixedThumbnail=[resData.size.thumbnail_width,resData.size.thumbnail_height]
              this.fixedT=true
            }
                   
            if(resData.size.image_width &&resData.size.image_height){
              this.fixedImage=[resData.size.image_width,resData.size.image_height]
              this.fixedI=true
            }
                    
            if(resData.size.muti_image_width &&resData.size.muti_image_height){
              this.fixedMutiUmage=[resData.size.muti_image_width,resData.size.muti_image_height]
              this.fixedM=true
            }
                 
          } else {
            alert(res.data.message);
          }
        } else {
          alert(res.data.message);
        }
      });
    },
    getTagOpt() {
      this.isBusy = true;
      let data = {
        action: "autocomplete",
      };
      this.$http.post("tag", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            for (var i = 0; i < res.data.data.length; i++) {
              this.tag_opt.push({
                text: res.data.data[i],
                value: res.data.data[i],
              });
            }
          } else {
            alert(res.data.message);
          }
        } else {
          alert(res.data.message);
        }
      });
    },
    getCategoryOpt() {
      this.isBusy = true;
      let data = {
        action: "trees",
        type: this.type,
        service: this.service,
        parent_id: 0,
      };
      this.$http.post("terms", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            this.category_opt = res.data.data
            if (this.$route.query.posts_id == null) {
              this.createOne();
            } else {
              this.getData();
            }
          } else {
            alert(res.data.message);
          }
        } else {
          alert(res.data.message);
        }
      });
    },
    normalizer(node) {
      if (node.childrens != undefined) {
        if (node.childrens.length != 0) {
          return {
            id: node.term_id,
            label: node.name,
            children: node.childrens,
          };
        } else {
          return {
            id: node.term_id,
            label: node.name,
          };
        }
      }
    },
    getStatusOpt() {
      let data = {};
      this.$http.post("posts/status", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            var obj = res.data.data;
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
    getNewItem(){
        this.isItem=false
        setTimeout(()=>{
            this.info.relation_id=[]
            this.autocompleteItem()
        },500)
    },
    autocompleteItem(){
      let data={
        type:this.info.relation_type,
        name:"",
      }
      this.$http.post("posts/autocomplete", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
              this.ItemArray=[]
            for (var i = 0; i < res.data.data.length; i++) {
              this.ItemArray.push({
                relation_id: res.data.data[i].id,
                name: res.data.data[i].name,
              });
            }
            this.isItem=true
          } else {
            alert(res.data.message);
          }
        } else {
          alert(res.data.message);
        }
      });
    },
    getSpecsOpt() {
      //規格
      let data = {
        action: "useing",
        type:this.type
      };

      this.$http.post("/options", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            for (var i = 0; i < res.data.data.length; i++) {
              this.specOpt.push({
                name: res.data.data[i].name,
                options_id: res.data.data[i].options_id,
                options: [],
              });
            }
         } else {
            alert(res.data.message);
          }
        } else {
          alert(res.data.message);
        }
      });
    },
    childByValue: function (childValue,name) {
      if(name=="thumbnail")
        this.info.thumbnail = childValue;
      else
        this.info.media = childValue;
    },
    mediaVideo: function (childValue) {
      this.info.video = childValue;
    },
    //附加檔案
    multiImage: function (childValue) {
      if (childValue.length == 0) {
        this.unUploadImg = false;
      } else if (childValue == false) this.unUploadImg = true;
      else {
        this.unUploadImg = false;
        this.info.images = childValue;
      }
    },
    multiFile: function (childValue) {
      if (childValue.length == 0) {
        this.unUploadFile = false;
      } else if (childValue == false) {
        this.unUploadFile = true;
      } else {
        this.unUploadFile = false;
        this.info.files = childValue;
      }
    },
    multiVideo: function (childValue) {
      if (childValue.length == 0) {
        this.unUploadVideo = false;
      } else if (childValue == false) this.unUploadVideo = true;
      else {
        this.unUploadVideo = false;
        this.info.upload_videos = childValue;
        this.info.videos = this.info.upload_videos;
      }
    },
    removeFile() {
      this.info.media = null;
      this.info.image = "";
      this.info.thumbnail = "";
    },
    removeVideo() {
      this.info.media.url = null;
    },
    addWork_opt(type) {
      this.info.values.push({ key: "", value: "" });
    },
    subWork_opt(index) {
      this.info.values.splice(index, 1);
    },
    saveData() {

        var md={}
        if(this.info.media_type == "image")
            md = this.info.media
        else if(this.info.media_type == "video")
            md = this.info.video
        else if(this.info.media_type == "youtube")
            md =  { type: "youtube", url: this.info.url, } 

      var tagArr = [];
      if (this.info.tag_id.length > 0) {
        for (var i = 0; i < this.info.tag_id.length; i++) {
          tagArr.push(this.info.tag_id[i].text);
        }
      }

      //規格
      var vaop = [];
      if(this.info.options.length!=0){
        var a = Object.values(this.info.options);
        for (var i = 0; i < a.length; i++) {
            if (a[i] != null) {
            for (var j = 0; j < a[i].length; j++) {
                vaop.push(a[i][j]);
            }
            }
        }
      } 
      

      //相關產品
      var itemArr = [];
      if(this.info.relation_id.length!=0){
        var search=JSON.parse(JSON.stringify(this.info.relation_id))
        if (search.length > 0) {
            for (var i = 0; i < search.length; i++) {
            itemArr.push(search[i].relation_id);
            }
        }
      }

      //附加檔案
      if(this.block.viedos=='1'){
            if (this.info.videos_type == "youtube") {
                this.info.videos = [ { type: "youtube", url: this.info.yt_url, } ];
            } else if (this.info.videos_type == "video")
                this.$refs.mulVideo.getUploadArray();
      }
      
        
        if(this.block.files=='1')
            this.$refs.mulFile.getUploadArray();
        
        if(this.block.images=='1')
            this.$refs.mulImage.getUploadArray();

      if ( this.unUploadImg == true || this.unUploadFile == true || this.unUploadVideo == true ) {
        this.hintModal = true;
        this.modalType = "warning";
        this.modalTitle = "提示";
        this.modalContent = "尚有未上傳附加檔案，請先上傳";
        return;
      }

      this.loadingModal = true;
      let data = {
        action: "save",
        type: this.type,
        guid: this.info.guid,
        posts_id: this.$route.query.posts_id,
        term_id: this.info.term_id,
        tag: tagArr,
        name: this.info.name,
        parent_id: 0,
        content: this.info.content,
        description: this.info.description,
        publish_at: this.info.publish_at,
        is_top: this.info.is_top,
        top_end_date: this.info.top_end_date,
        status: this.info.status,
        metas:{
          meta_keywords:this.meta.keywords,
          meta_description:this.meta.description,
        },
        media_type: this.info.media_type,
        media: md,
        thumbnail: this.info.thumbnail,
        url: this.info.url,
        images: this.info.images,
        files: this.info.files,
        videos: this.info.videos,
        values: {
          options:this.info.values,
          addon:{
            googlemap:this.info.map
          },
          relation_type:this.info.relation_type
        },
        options: vaop,
        relation_id:itemArr,

        custom:this.info.custom,
        sort:this.info.sort,

      };

      this.$http.post("posts", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            this.loadingModal = false;
            setTimeout(() => {
              this.hintModal = true;
              this.modalType = "";
              this.modalTitle = res.data.message;
              this.modalContent = "即將自動返回或您可點擊確定按鈕進行返回";
            }, 500);

            setTimeout(() => {
              this.toBack();
            }, 2500);
          } else {
            this.loadingModal = false;
            alert(res.data.message);
          }
        } else {
          this.loadingModal = false;
          alert(res.data.message);
        }
      });
    },
    getAcOpt(id, cindex) {
      let data = {
        action: "autocomplete",
        options_id: id,
      };

      this.$http.post("/opvalue", data).then((res) => {
        if (res.data.code == 200) {
          if (res.data.status == "success") {
            this.spAcOpt[id] = [];
            var sp = [];
            for (var i = 0; i < res.data.data.length; i++) {
              sp.push({
                value: res.data.data[i].value,
                value_id: res.data.data[i].value_id,
                options_id: id,
              });
            }
            this.specOpt[cindex].options = sp;
          } else {
            alert(res.data.message);
          }
        } else {
          alert(res.data.message);
        }
      });
    },
    addOptionsTag(value, id) {
      if (value.options_id == undefined) value.options_id = id;
      return value;
    },
    goAddSpec(){
      this.$router.push({
        name: "options.lists",
        params: { type: this.type },
      });
    },
    toBack() {
      this.$router.push({
        name: "posts.lists",
        params: { type: this.type },
      });
    },
  },
};
</script>
<style>
.ck-editor__editable_inline {
  min-height: 350px;
}
.no-border {
  border: none;
}
</style>