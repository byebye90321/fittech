<template>
<!-- 新增訂單 -->
<div>
  <div>
    <CButton color="primary" @click="() => { visibleVerticallyCenteredScrollableDemo = true }">新增訂單</CButton>
  </div>

  <div>
  <CTable>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">編號</CTableHeaderCell>
        <CTableHeaderCell scope="col">客戶</CTableHeaderCell>
        <CTableHeaderCell scope="col">品號</CTableHeaderCell>
        <CTableHeaderCell scope="col">品名</CTableHeaderCell>
        <CTableHeaderCell scope="col">開發模式</CTableHeaderCell>
        <CTableHeaderCell scope="col">回覆日期</CTableHeaderCell>
        <CTableHeaderCell scope="col">編輯</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow>
        <CTableHeaderCell scope="row">1</CTableHeaderCell>
        <CTableDataCell>惠特</CTableDataCell>
        <CTableDataCell>CLDTCCD00012</CTableDataCell>
        <CTableDataCell>Lens-House</CTableDataCell>
        <CTableDataCell>自行開發</CTableDataCell>
        <CTableDataCell>2021-12-21</CTableDataCell>
        <CTableDataCell>
          <CButton color="success" shape="rounded-pill" @click="() => { edit  = true }">編輯</CButton>
          <CButton color="danger" shape="rounded-pill" @click="() => { del  = true }">刪除</CButton>
        </CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row">2</CTableHeaderCell>
        <CTableDataCell>惠特</CTableDataCell>
        <CTableDataCell>CLDTCCD00013</CTableDataCell>
        <CTableDataCell>Lens押環-33</CTableDataCell>
        <CTableDataCell>委外開發</CTableDataCell>
        <CTableDataCell>2021-12-22</CTableDataCell>
        <CTableDataCell>
          <CButton color="success" shape="rounded-pill" @click="() => { edit  = true }">編輯</CButton>
          <CButton color="danger" shape="rounded-pill" @click="() => { del  = true }">刪除</CButton>
        </CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row">3</CTableHeaderCell>
        <CTableDataCell>惠特</CTableDataCell>
        <CTableDataCell>CLDTCCD00014</CTableDataCell>
        <CTableDataCell>0.5X延伸板</CTableDataCell>
        <CTableDataCell>委外開發</CTableDataCell>
        <CTableDataCell>2021-12-23</CTableDataCell>
        <CTableDataCell>
          <CButton color="success" shape="rounded-pill" @click="() => { edit  = true }">編輯</CButton>
          <CButton color="danger" shape="rounded-pill" @click="() => { del  = true }">刪除</CButton>
        </CTableDataCell>    
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row">4</CTableHeaderCell>
        <CTableDataCell>惠特</CTableDataCell>
        <CTableDataCell>CLDTCCD00014</CTableDataCell>
        <CTableDataCell>0.5X延伸板</CTableDataCell>
        <CTableDataCell>自行開發</CTableDataCell>
        <CTableDataCell>2021-12-23</CTableDataCell>
        <CTableDataCell>
          <CButton color="success" shape="rounded-pill" @click="() => { edit  = true }">編輯</CButton>
          <CButton color="danger" shape="rounded-pill" @click="() => { del  = true }">刪除</CButton>
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

  <!-- 人員視窗 -->
    <CModal backdrop="static" alignment="center" scrollable size="xl" :visible="personnel" @close="() => { personnel = false }">
      <CModalHeader>
        <CModalTitle>人員調配</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard >
          <CRow class="g-3 align-items-center">
            <CCol xs="auto">
              <CFormLabel for="input-default">負責人:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>
            <CCol xs="auto">
              <CFormLabel for="input-default">參與者:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>
            <CCol xs="auto">
              <CFormLabel for="input-default">預計交期:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>
            <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-2 pt-0">難易度</legend>
              <CCol xs="auto">
                <CFormCheck inline type="radio" name="gridRadios" id="gridRadios1" value="option1" label="1" checked/>
                <CFormCheck inline type="radio" name="gridRadios" id="gridRadios2" value="option2" label="2"/>
                <CFormCheck inline type="radio" name="gridRadios" id="gridRadios3" value="option3" label="3"/>
                <CFormCheck inline type="radio" name="gridRadios" id="gridRadios3" value="option3" label="4"/>
                <CFormCheck inline type="radio" name="gridRadios" id="gridRadios3" value="option3" label="5"/>
              </CCol>
            </fieldset>
          </CRow>
        </CCard >
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { personnel = false }">關閉</CButton>
        <CButton color="primary">儲存</CButton>
      </CModalFooter>
    </CModal>

  <!-- 委外視窗 -->
    <CModal backdrop="static" alignment="center" scrollable size="xl" :visible="outsourcing" @close="() => { outsourcing = false }">
      <CModalHeader>
        <CModalTitle>委外廠商</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard >
          <CRow class="g-3 align-items-center">
            <CCol xs="auto">
              <CFormLabel for="input-default">廠商名稱:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>
            <CCol xs="auto">
              <CFormLabel for="input-default">委外單價:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>

            <CCol xs="auto">
              <CFormLabel for="input-default">預計交期:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>
          </CRow>
        </CCard >
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { outsourcing = false }">關閉</CButton>
        <CButton color="primary">儲存</CButton>
      </CModalFooter>
    </CModal>

  <!-- 新增訂單 -->
    <CModal backdrop="static" alignment="center" scrollable size="xl" :visible="visibleVerticallyCenteredScrollableDemo" @close="() => { visibleVerticallyCenteredScrollableDemo = false }">
      <CModalHeader>
        <CModalTitle>新增訂單</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CContainer fluid>
          <CCard >
            <CRow class="g-3 align-items-center">
              <CCol xs="auto">
                <CFormLabel for="input-default">客戶名稱:</CFormLabel>
              </CCol>
              <CFormSelect size="sm" class="mb-3" aria-label="Small select example">
                <option value="1">惠特1</option>
                <option value="2">惠特2</option>
              </CFormSelect>
              <CCol xs="auto">
                <CFormLabel for="input-default">採購單號:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>

              <CCol xs="auto">
                <CFormLabel for="input-default">單據日期:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs="auto">
                <CFormLabel for="input-default">品號:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>
              <CCol xs="auto">
                <CFormLabel for="input-default">品名:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>
              <CCol xs="auto">
                <CFormLabel for="input-default">數量:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>

            </CRow>

            <CRow>
              <CCol xs="auto">
                <CFormLabel for="input-default">預交日期:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>
              <CCol xs="auto">
                <CFormLabel for="input-default">回覆日:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>
            </CRow>
          </CCard >
        </CContainer>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { visibleVerticallyCenteredScrollableDemo = false }">關閉</CButton>
        <CButton color="primary">儲存</CButton>
      </CModalFooter>
    </CModal>

    <!-- 材料視窗 -->
    <CModal backdrop="static" alignment="center" scrollable size="xl" :visible="material" @close="() => { material = false }">
      <CModalHeader>
        <CModalTitle>新增材料</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard >
          <CFormSelect size="sm" class="mb-3" aria-label="Small select example">
            <option value="1">鋁料</option>
            <option value="2">鐵料</option>
          </CFormSelect>
          <CRow class="g-3 align-items-center">
            <CCol xs="auto">
              <CFormLabel for="input-default">長度:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>
            <CCol xs="auto">
              <CFormLabel for="input-default">寬度:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>
            <CCol xs="auto">
              <CFormLabel for="input-default">高度:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="auto">
              <CFormLabel for="input-default">數量:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>
            <CCol xs="auto">
              <CFormLabel for="input-default">單價:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>
            <CCol xs="auto">
              <CFormLabel for="input-default">材質:</CFormLabel>
            </CCol>
            <CCol xs="auto">
              <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
            </CCol>
          </CRow>
        </CCard >
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { material = false }">關閉</CButton>
        <CButton color="primary">儲存</CButton>
      </CModalFooter>
    </CModal>

      <!-- 編輯視窗 -->
    <CModal backdrop="static" alignment="center" scrollable size="xl" :visible="edit" @close="() => { edit = false }">
      <CModalHeader>
        <CModalTitle>編輯訂單</CModalTitle>
      </CModalHeader>
      <CModalBody>
              <CContainer fluid>
          <CCard >
            <CRow class="g-3 align-items-center">
              <CCol xs="auto">
                <CFormLabel for="input-default">客戶名稱:</CFormLabel>
              </CCol>
              <CFormSelect size="sm" class="mb-3" aria-label="Small select example">
                <option value="1">惠特1</option>
                <option value="2">惠特2</option>
              </CFormSelect>
              <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-2 pt-0">開發模式</legend>
              <CCol xs="auto">
                <CFormCheck inline type="radio" name="gridRadios" id="gridRadios1" value="option1" label="自行開發" checked/>
                <CFormCheck inline type="radio" name="gridRadios" id="gridRadios2" value="option2" label="委外開發"/>
                <CFormCheck inline type="radio" name="gridRadios" id="gridRadios3" value="option3" label="兩者同時"/>
              </CCol>
              </fieldset>
              <CCol xs="auto">
                <CFormLabel for="input-default">採購單號:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>
              <CCol xs="auto">
                <CFormLabel for="input-default">單據日期:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs="auto">
                <CFormLabel for="input-default">品號:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>
              <CCol xs="auto">
                <CFormLabel for="input-default">品名:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>
              <CCol xs="auto">
                <CFormLabel for="input-default">數量:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>

            </CRow>
            <CRow>
              <CCol xs="auto">
                <CFormLabel for="input-default">預交日期:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>
              <CCol xs="auto">
                <CFormLabel for="input-default">回覆日:</CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
              </CCol>
            </CRow>
          </CCard >
          </CContainer>

      <CModalFooter>
        <CButton color="secondary" @click="() => { edit = false }">
          關閉
        </CButton>
        <CButton color="primary">儲存</CButton>
      </CModalFooter>

      </CModalBody>
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
        outsourcing: false
      }
    }
  }
</script>

