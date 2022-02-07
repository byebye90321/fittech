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
                    <CFormInput type="text" id="input-default" aria-describedby="emailHelp" placeholder="請輸入交易序號或訂單編號" name="transNo"/>
                </CCol>
                <CCol xs="auto">
                    <CFormLabel for="disabledSelect">開發模式:</CFormLabel>
                    <CFormSelect id="disabledSelect">
                        <option>自行開發</option>
                        <option>委外開發</option>
                    </CFormSelect>
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
                    <CFormLabel for="input-default">預交日期:</CFormLabel>
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
                    <CFormLabel for="input-default">負責人:</CFormLabel>
                </CCol>
                <CCol xs="auto">
                    <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo"/>
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
            <CTableHeaderCell scope="col">開發模式</CTableHeaderCell>
            <CTableHeaderCell scope="col">回覆日</CTableHeaderCell>
            <CTableHeaderCell scope="col">開發交期</CTableHeaderCell>
            <CTableHeaderCell scope="col">開發完成日</CTableHeaderCell>
            <CTableHeaderCell scope="col">是否逾期</CTableHeaderCell>
            <CTableHeaderCell scope="col">細項</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>惠特</CTableDataCell>
            <CTableDataCell>CLDTCCD00012</CTableDataCell>
            <CTableDataCell>Lens-House</CTableDataCell>
            <CTableDataCell>自行開發</CTableDataCell>
            <CTableDataCell>2021-12-22</CTableDataCell>
            <CTableDataCell>2021-12-20</CTableDataCell>
            <CTableDataCell>2021-12-24</CTableDataCell>
            <CAlert color="danger" variant="solid">逾期! 4天</CAlert>
            <CTableDataCell>
                <CButton color="warning" shape="rounded-pill" @click="() => { personnel  = true }">細項</CButton>
            </CTableDataCell>
            </CTableRow>
            <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>惠特</CTableDataCell>
            <CTableDataCell>CLDTCCD00013</CTableDataCell>
            <CTableDataCell>Lens押環-33</CTableDataCell>
            <CTableDataCell>自行開發</CTableDataCell>
            <CTableDataCell>2021-12-22</CTableDataCell>
            <CTableDataCell>2021-12-20</CTableDataCell>
            <CTableDataCell>2021-12-20</CTableDataCell>
            <CAlert color="info" variant="solid">Pass!</CAlert>
            <CTableDataCell>
                <CButton color="warning" shape="rounded-pill" @click="() => { personnel  = true }">細項</CButton>
            </CTableDataCell>
            </CTableRow>
            <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell>惠特</CTableDataCell>
            <CTableDataCell>CLDTCCD00014</CTableDataCell>
            <CTableDataCell>0.5X延伸板</CTableDataCell>
            <CTableDataCell>委外開發</CTableDataCell>
            <CTableDataCell>2021-12-22</CTableDataCell>
            <CTableDataCell>2021-12-20</CTableDataCell>
            <CTableDataCell>2021-12-24</CTableDataCell>
            <CAlert color="danger" variant="solid">逾期! 4天</CAlert>
            <CTableDataCell>
                <CButton color="warning" shape="rounded-pill" @click="() => { outsourcing  = true }">細項</CButton>
            </CTableDataCell>
            </CTableRow>
            <CTableRow>
            <CTableHeaderCell scope="row">4</CTableHeaderCell>
            <CTableDataCell>惠特</CTableDataCell>
            <CTableDataCell>CLDTCCD00015</CTableDataCell>
            <CTableDataCell>Lens-House</CTableDataCell>
            <CTableDataCell>委外開發</CTableDataCell>
            <CTableDataCell>2021-12-22</CTableDataCell>
            <CTableDataCell>2021-12-20</CTableDataCell>
            <CTableDataCell>2021-12-20</CTableDataCell>
            <CAlert color="info" variant="solid">Pass!</CAlert>
            <CTableDataCell>
                <CButton color="warning" shape="rounded-pill" @click="() => { outsourcing  = true }">細項</CButton>
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

    <!-- 自行開發 -->
    <CModal backdrop="static" alignment="center" scrollable size="xl" :visible="personnel" @close="() => { personnel = false }">
        <CModalHeader>
        <CModalTitle>自行開發</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCard >
                <CRow class="g-3 align-items-center">
                    <CCol xs="auto">
                        <CFormLabel for="input-default">受理人:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="劉振翰" disabled/>
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">負責人:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="陳荃豪" disabled/>
                    </CCol>
                </CRow>    
                <CRow class="g-3 align-items-center">
                    <CCol xs="auto">
                        <CFormLabel for="input-default">開發日期:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="2021-12-21" disabled/>
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">預計完成日:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="2021-12-21" disabled/>
                    </CCol>                <CCol xs="auto">
                        <CFormLabel for="input-default">開發完成日:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="2021-12-21" disabled/>
                    </CCol>
                </CRow>
                <hr>
                <CRow class="g-3 align-items-center">
                    <CCol xs="auto">
                        <CFormLabel for="input-default">材料:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="鋁料" disabled/>
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">長度:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="10" disabled/>
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">高度:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="10" disabled/>
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">寬度:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="20" disabled/>
                    </CCol>
                </CRow>
                <CRow class="g-3 align-items-center">
                    <CCol xs="auto">
                        <CFormLabel for="input-default">數量:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="100" disabled/>
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">單價:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="150" disabled/>
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">材質:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="630" disabled/>
                    </CCol>
                </CRow>
                <hr>
                <CRow class="g-3 align-items-center">
                    <div class="mb-3">
                    <CFormLabel for="exampleFormControlTextarea1">開發紀錄</CFormLabel>
                    <CFormTextarea id="exampleFormControlTextarea1" rows="3" placeholder="無" disabled></CFormTextarea>
                    </div>
                </CRow>
                <CRow class="g-3 align-items-center">
                    <fieldset class="row mb-3">
                    <legend class="col-form-label col-sm-2 pt-0">難易度</legend>
                    <CCol xs="auto">
                        <CFormCheck inline type="radio" name="gridRadios" id="gridRadios1" value="option1" label="1" checked disabled/>
                        <CFormCheck inline type="radio" name="gridRadios" id="gridRadios2" value="option2" label="2" disabled/>
                        <CFormCheck inline type="radio" name="gridRadios" id="gridRadios3" value="option3" label="3" disabled/>
                        <CFormCheck inline type="radio" name="gridRadios" id="gridRadios3" value="option3" label="4" disabled/>
                        <CFormCheck inline type="radio" name="gridRadios" id="gridRadios3" value="option3" label="5" disabled/>
                    </CCol>
                    </fieldset>
                </CRow>    
            </CCard >
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" @click="() => { personnel = false }">關閉</CButton>
        </CModalFooter>
    </CModal>

    <!-- 委外開發 -->
    <CModal backdrop="static" alignment="center" scrollable size="xl" :visible="outsourcing" @close="() => { outsourcing = false }">
        <CModalHeader>
            <CModalTitle>委外開發</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCard >
                <CRow class="g-3 align-items-center">
                    <CCol xs="auto">
                        <CFormLabel for="input-default">廠商名稱:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="惠特" disabled/>
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">單價:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="$150" disabled/>
                    </CCol>
                </CRow>
                <CRow class="g-3 align-items-center">
                    <CCol xs="auto">
                        <CFormLabel for="input-default">開發日期:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="2021-12-21" disabled/>
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">預計交期:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="2021-12-21" disabled/>
                    </CCol>
                    <CCol xs="auto">
                        <CFormLabel for="input-default">完成日期:</CFormLabel>
                    </CCol>
                    <CCol xs="auto">
                        <CFormInput type="text" id="input-default" aria-describedby="emailHelp" name="transNo" placeholder="2021-12-21" disabled/>
                    </CCol>
                </CRow>
            </CCard >
        </CModalBody>

        <CModalFooter>
            <CButton color="secondary" @click="() => { outsourcing = false }">關閉</CButton>
        </CModalFooter>
    </CModal>
</div>
</template>

<script>

export default {
    data() {
    return { 
        personnel: false,
        outsourcing: false
    }
    }
}
</script>

