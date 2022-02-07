<template>
<div>
    <CContainer fluid>
      <CCard >
        <div>
          <i class="icon-magnifier mr-2" aria-hidden="true"></i>
          <strong>快速查詢</strong>
        </div>
        <CRow class="g-3 align-items-center">
          <CCol xs="auto">
            <CFormLabel for="input-default">採購單號:</CFormLabel>
          </CCol>
          <CCol xs="auto">
            <CFormInput type="text" id="input-default" aria-describedby="emailHelp" placeholder="請輸入交易序號或訂單編號" name="transNo"/>
          </CCol>
          <CCol xs="auto">
            <CFormLabel for="input-default">品號:</CFormLabel>
          </CCol>
          <CCol xs="auto">
            <CFormInput type="text" id="input-default" aria-describedby="emailHelp" placeholder="請輸入交易序號或訂單編號" name="transNo"/>
          </CCol>
          <CCol xs="auto">
            <CFormLabel for="input-default">品名:</CFormLabel>
          </CCol>
          <CCol xs="auto">
            <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
          </CCol>
          <CCol xs="auto">
            <CFormLabel for="input-default">廠商名稱:</CFormLabel>
          </CCol>
          <CCol xs="auto">
            <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="auto">
            <CFormLabel for="input-default">單據日期:</CFormLabel>
          </CCol>
          <CCol xs="auto">
            <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
          </CCol>
          <CCol xs="auto">
            <CFormLabel for="input-default">回覆日期:</CFormLabel>
          </CCol>
          <CCol xs="auto">
            <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
          </CCol>
          <CCol xs="auto">
            <CFormLabel for="disabledSelect">開發狀態:</CFormLabel>
            <CFormSelect id="disabledSelect">
              <option>未分配</option>
              <option>開發中</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow>
          <CCol class="align-self-end">
            <CButton color="danger" type="submit" >交易查詢</CButton>
          </CCol>
        </CRow>
      </CCard >
    </CContainer>
  <div>
  <CTable>
  <CTableHead>
      <CTableRow>
      <CTableHeaderCell scope="col">編號</CTableHeaderCell>
      <CTableHeaderCell scope="col">客戶</CTableHeaderCell>
      <CTableHeaderCell scope="col">品號</CTableHeaderCell>
      <CTableHeaderCell scope="col">品名</CTableHeaderCell>
      <CTableHeaderCell scope="col">回覆日</CTableHeaderCell>
      <CTableHeaderCell scope="col">開發交期</CTableHeaderCell>
      <CTableHeaderCell scope="col">廠商名稱</CTableHeaderCell>
      <CTableHeaderCell scope="col">委外價格</CTableHeaderCell>
      <CTableHeaderCell scope="col">開發狀態</CTableHeaderCell>
      <CTableHeaderCell scope="col">編輯</CTableHeaderCell>
      </CTableRow>
  </CTableHead>
  <CTableBody>
      <CTableRow>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>惠特</CTableDataCell>
      <CTableDataCell>CLDTCCD00012</CTableDataCell>
      <CTableDataCell>Lens-House</CTableDataCell>
      <CTableDataCell>2021-12-21</CTableDataCell>
      <CTableDataCell> </CTableDataCell>
      <CTableDataCell> </CTableDataCell>
      <CTableDataCell> </CTableDataCell>
      <CTableDataCell>未分配</CTableDataCell>
      <CTableDataCell>
          <CButton color="info" shape="rounded-pill" @click="() => { personnel  = true }">編輯</CButton>
      </CTableDataCell>
      </CTableRow>
      <CTableRow>
      <CTableHeaderCell scope="row">2</CTableHeaderCell>
      <CTableDataCell>惠特</CTableDataCell>
      <CTableDataCell>CLDTCCD00013</CTableDataCell>
      <CTableDataCell>Lens押環-33</CTableDataCell>
      <CTableDataCell>2021-12-22</CTableDataCell>
      <CTableDataCell>2021-12-22</CTableDataCell>
      <CTableDataCell>劉振翰</CTableDataCell>
      <CTableDataCell>$150</CTableDataCell>
      <CTableDataCell>開發中</CTableDataCell>
      <CTableDataCell>
          <CButton color="primary" shape="rounded-pill" @click="() => { complete  = true }">確認</CButton>
      </CTableDataCell>
      </CTableRow>
      <CTableRow>
      <CTableHeaderCell scope="row">3</CTableHeaderCell>
      <CTableDataCell>惠特</CTableDataCell>
      <CTableDataCell>CLDTCCD00014</CTableDataCell>
      <CTableDataCell>0.5X延伸板</CTableDataCell>
      <CTableDataCell>2021-12-23</CTableDataCell>
      <CTableDataCell>2021-12-23</CTableDataCell>
      <CTableDataCell>劉振翰</CTableDataCell>
      <CTableDataCell>$150</CTableDataCell>
      <CTableDataCell>開發中</CTableDataCell>
      <CTableDataCell>
          <CButton color="primary" shape="rounded-pill" @click="() => { complete  = true }">確認</CButton>
      </CTableDataCell>    
      </CTableRow>
      <CTableRow>
      <CTableHeaderCell scope="row">4</CTableHeaderCell>
      <CTableDataCell>惠特</CTableDataCell>
      <CTableDataCell>CLDTCCD00015</CTableDataCell>
      <CTableDataCell>Lens-House</CTableDataCell>
      <CTableDataCell>2021-12-23</CTableDataCell>
      <CTableDataCell>2021-12-23</CTableDataCell>
      <CTableDataCell>劉振翰</CTableDataCell>
      <CTableDataCell>$160</CTableDataCell>
      <CTableDataCell>開發中</CTableDataCell>
      <CTableDataCell>
          <CButton color="primary" shape="rounded-pill" @click="() => { complete  = true }">確認</CButton>
      </CTableDataCell>    
      </CTableRow>
  </CTableBody>
  </CTable>
  </div>

  <div>
  <CPagination aria-label="Page navigation example" align="center">
  <CPaginationItem aria-label="Previous" href="#" disabled><span aria-hidden="true">&laquo;</span></CPaginationItem>
  <CPaginationItem href="#" active>1</CPaginationItem>
  <CPaginationItem href="#">2</CPaginationItem>
  <CPaginationItem href="#">3</CPaginationItem>
  <CPaginationItem aria-label="Next" href="#"><span aria-hidden="true">&raquo;</span></CPaginationItem>
  </CPagination>
  </div>


  <!-- 完工 -->
  <CModal backdrop="static" alignment="center" scrollable size="xl" :visible="complete" @close="() => { complete = false }">
    <CModalHeader>
      <CModalTitle>完工事項</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCard >
        <CRow class="g-3 align-items-center">
          <div class="mb-3">
            <CFormLabel for="exampleFormControlTextarea1">注意事項</CFormLabel>
            <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
          </div>
        </CRow>
      </CCard >
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { complete = false }">關閉</CButton>
      <CButton color="primary">完工</CButton>
    </CModalFooter>
  </CModal>

  <!-- 編輯 -->
  <CModal backdrop="static" alignment="center" scrollable size="xl" :visible="personnel" @close="() => { personnel = false }">
    <CModalHeader>
      <CModalTitle>廠商資料</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCard >
        <CRow class="g-3 align-items-center">
          <CCol xs="auto">
            <CFormLabel for="input-default">廠商名稱:</CFormLabel>
          </CCol>
          <CCol xs="auto">
            <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" />
          </CCol>
          <CCol xs="auto">
            <CFormLabel for="input-default">單價:</CFormLabel>
          </CCol>
          <CCol xs="auto">
            <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" />
          </CCol>
          <CCol xs="auto">
            <CFormLabel for="input-default">數量:</CFormLabel>
          </CCol>
          <CCol xs="auto">
            <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" />
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="auto">
            <CFormLabel for="input-default">預計交期:</CFormLabel>
          </CCol>
          <CCol xs="auto">
            <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" />
          </CCol>
        </CRow>
      </CCard >
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { personnel = false }">關閉</CButton>
      <CButton color="primary">開發</CButton>
    </CModalFooter>
  </CModal>
</div>
</template>

<script>


  export default {
    data() {
      return { 
        visibleVerticallyCenteredScrollableDemo: false,
        personnel: false,
        material: false,
        edit: false,
        complete: false
      }
    }
  }
</script>

