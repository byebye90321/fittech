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
                </CCol>                <CCol xs="auto">
                    <CFormLabel for="input-default">負責人:</CFormLabel>
                </CCol>
                <CCol xs="auto">
                    <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
                </CCol>
                <CCol xs="auto">
                    <CFormLabel for="disabledSelect">開發狀態:</CFormLabel>
                    <CFormSelect id="disabledSelect">
                        <option>未分配</option>
                        <option>開發中</option>
                        <option>待確認</option>
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
                    <CTableHeaderCell scope="col">採購單號</CTableHeaderCell>
                    <CTableHeaderCell scope="col">品號</CTableHeaderCell>
                    <CTableHeaderCell scope="col">品名</CTableHeaderCell>
                    <CTableHeaderCell scope="col">回覆日</CTableHeaderCell>
                    <CTableHeaderCell scope="col">預計完成日</CTableHeaderCell>
                    <CTableHeaderCell scope="col">受理人</CTableHeaderCell>
                    <CTableHeaderCell scope="col">開發負責人</CTableHeaderCell>
                    <CTableHeaderCell scope="col">開發狀態</CTableHeaderCell>
                    <CTableHeaderCell scope="col">編輯</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>惠特</CTableDataCell>
                    <CTableDataCell>1101112004</CTableDataCell>
                    <CTableDataCell>CLDTCCD00012</CTableDataCell>
                    <CTableDataCell>Lens-House</CTableDataCell>
                    <CTableDataCell>2021-12-21</CTableDataCell>
                    <CTableDataCell> </CTableDataCell>
                    <CTableDataCell> </CTableDataCell>
                    <CTableDataCell> </CTableDataCell>
                    <CTableDataCell>未分配</CTableDataCell>
                    <CTableDataCell>
                        <CButton color="info" shape="rounded-pill" @click="() => { edit  = true }">編輯</CButton>
                        <CButton color="info" shape="rounded-pill" @click="() => { complete  = true }">開發完成</CButton>
                        <CButton color="primary" shape="rounded-pill" @click="() => { eee  = true }">確認</CButton>
                    </CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>惠特</CTableDataCell>
                    <CTableDataCell>1101112004</CTableDataCell>
                    <CTableDataCell>CLDTCCD00013</CTableDataCell>
                    <CTableDataCell>Lens押環-33</CTableDataCell>
                    <CTableDataCell>2021-12-22</CTableDataCell>
                    <CTableDataCell> </CTableDataCell>
                    <CTableDataCell> </CTableDataCell>
                    <CTableDataCell> </CTableDataCell>
                    <CTableDataCell>未分配</CTableDataCell>
                    <CTableDataCell>
                        <CButton color="info" shape="rounded-pill" @click="() => { edit  = true }">編輯</CButton>
                    </CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell>惠特</CTableDataCell>
                    <CTableDataCell>1101112004</CTableDataCell>
                    <CTableDataCell>CLDTCCD00014</CTableDataCell>
                    <CTableDataCell>0.5X延伸板</CTableDataCell>
                    <CTableDataCell>2021-12-23</CTableDataCell>
                    <CTableDataCell>2021-12-23</CTableDataCell>
                    <CTableDataCell>劉振翰</CTableDataCell>
                    <CTableDataCell>劉振翰</CTableDataCell>
                    <CTableDataCell>開發中</CTableDataCell>
                    <CTableDataCell>
                        <CButton color="info" shape="rounded-pill" @click="() => { complete  = true }">開發完成</CButton>
                    </CTableDataCell>    
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">4</CTableHeaderCell>
                    <CTableDataCell>惠特</CTableDataCell>
                    <CTableDataCell>1101112004</CTableDataCell>
                    <CTableDataCell>CLDTCCD00015</CTableDataCell>
                    <CTableDataCell>Lens-House</CTableDataCell>
                    <CTableDataCell>2021-12-23</CTableDataCell>
                    <CTableDataCell>2021-12-23</CTableDataCell>
                    <CTableDataCell>劉振翰</CTableDataCell>
                    <CTableDataCell>劉振翰</CTableDataCell>
                    <CTableDataCell>待確認</CTableDataCell>
                    <CTableDataCell>
                        <CButton color="primary" shape="rounded-pill" @click="() => { ee  = true }">確認</CButton>
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

    <!-- 開發完成紀錄 -->
    <CModal backdrop="static" alignment="center" scrollable size="xl" :visible="complete" @close="() => { complete = false }">
        <CModalHeader>
            <CModalTitle>開發完成紀錄</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCard >
                <CRow class="g-3 align-items-center">
                <CCol xs="auto">
                    <CFormLabel for="disabledSelect">材質:</CFormLabel>
                    <CFormSelect id="disabledSelect">
                        <option value="1">鋁料</option>
                        <option value="2">鐵料</option>
                    </CFormSelect>
                </CCol>
                </CRow>
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
                <div>
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
                </div>
                <CRow class="g-3 align-items-center">
                    <div class="mb-3">
                    <CFormLabel for="exampleFormControlTextarea1">開發紀錄</CFormLabel>
                    <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
                    </div>
                </CRow>
            </CCard >
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" @click="() => { complete = false }">關閉</CButton>
            <CButton color="primary">完成</CButton>
        </CModalFooter>
    </CModal>
    <!-- 編輯 -->
    <CModal backdrop="static" alignment="center" scrollable size="xl" :visible="edit" @close="() => { edit = false }">
        <CModalHeader>
            <CModalTitle>編輯</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCard >
                <CRow class="g-3 align-items-center">
                    <CCol xs="auto">
                        <CFormLabel for="input-default">受理人:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" />
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">開發負責人:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" />
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">預計完成日:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" />
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
            <CButton color="secondary" @click="() => { edit = false }">關閉</CButton>
            <CButton color="primary">開發</CButton>
        </CModalFooter>
    </CModal>
</div>
</template>

<script>

export default {
    data() {
    return { 
        edit: false,
        complete: false
    }
    }
}
</script>

