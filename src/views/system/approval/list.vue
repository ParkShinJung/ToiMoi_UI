<template>
  <div class="app-container dev_guide_index">
    <b-card-group class="mt-0">
      <b-card
        no-body
        bg-variant="light"
        border-variant="secondary"
      >
        <b-card-body>
          <div class="col-5 display-inline">
            <b-form-group
              :description="$t('messages.descriptionApprovalClassification')"
              :label="$t('approval.classification')"
              label-cols-sm="4"
              label-cols-lg="3"
            >
              <b-form-select
                v-model="approval.approvalType"
                :options="approvalType"
                size="sm"
              />
            </b-form-group>
          </div>
          <div class="col-5 display-inline">
            <b-form-group
              :description="$t('messages.descriptionApprovalStatus')"
              :label="$t('approval.approveStatus')"
              label-cols-sm="4"
              label-cols-lg="3"
            >
              <b-form-select
                v-model="approval.status"
                :options="status"
                size="sm"
              />
            </b-form-group>
          </div>
          <div class="col-5 display-inline">
            <b-form-group
              :description="$t('messages.descriptionApprovalRequestDate')"
              :label="$t('approval.requestDate')"
              label-cols-sm="4"
              label-cols-lg="3"
            >
              <el-date-picker v-model="approval.requestStartDate" :placeholder="$t('common.startDate')" type="date" style="width: 150px;"/>
              <span>-</span>
              <el-date-picker v-model="approval.requestEndDate" :placeholder="$t('common.endDate')" type="date" style="width: 150px;"/>
            </b-form-group>
          </div>
        </b-card-body>
        <b-card-footer class="text-right">
          <b-button variant="primary" size="sm" @click="getList"><font-awesome-icon icon="search"/> {{ $t('common.button.select') }}</b-button>
        </b-card-footer>
      </b-card>
    </b-card-group>

    <div class="pagination-container" style="text-align: right; padding-bottom: 5px;">
      <el-pagination :current-page="approval.pageIdx" :page-sizes="[5,10,20,30,50]" :page-size="approval.size" :total="total" background layout="total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <table class="el-table list-table">
      <colgroup>
        <col style="width: 80px;">
        <col style="width: 130px;">
        <col style="width: 120px;">
        <col style="width: 180px;">
        <col >
        <col style="width: 100px;">
        <col style="width: 180px;">
        <col >
        <col style="width: 200px;">
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>{{ $t('approval.classification') }}</th>
          <th>{{ $t('messages.requestNumber') }}</th>
          <th>{{ $t('approval.requestDate') }}</th>
          <th>{{ $t('messages.requester') }}</th>
          <th>{{ $t('common.status') }}</th>
          <th>{{ $t('approval.approvalDate') }}</th>
          <th>{{ $t('approval.approvalId') }}</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody v-if="approvalList.length > 0">
        <tr v-for="(item, index) in approvalList" :key="item.key">
          <td>{{ (total - (approval.page * approval.size)) - index }}</td>
          <td v-if="item.approvalType == 'GREAT_RELEASE'">{{ $t('approval.type.GREAT_RELEASE') }}</td>
          <td v-else-if="item.approvalType == 'GREAT_ISSUE'">{{ $t('approval.type.GREAT_ISSUE') }}</td>
          <td v-else>{{ $t('approval.type.PROMOTION_ISSUE') }}</td>
          <td>{{ item.requestNo }}</td>
          <td>{{ item.regDate }}</td>
          <td>{{ item.regId }}</td>
          <td v-if="item.status == 'REQUEST'">{{ $t('approval.status.REQUEST') }}</td>
          <td v-else-if="item.status == 'COMPLETE'">{{ $t('approval.status.COMPLETE') }}</td>
          <td v-else id="rejected" @click="viewReason(item.rejectedReason)">{{ $t('approval.status.REJECTED') }}</td>
          <td>{{ item.approvalDate }}</td>
          <td>{{ item.approvalId }}</td>
          <td v-if="item.status == 'REQUEST'">
            <button class="filter-item" type="primary" size="small" @click="doApproval(item.requestNo,item.approvalType)">{{ $t('approval.approve') }}</button>
            <button class="filter-item" type="danger" size="small" @click="doRejected(item.requestNo)">{{ $t('approval.status.REJECTED') }}</button>
          </td>
          <td v-else>-</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="9" class="none-data">
            {{ $t('messages.noneDataSearch') }}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="approvalList.length > 0" class="pagination-container margin-b-10 margin-t-10 text-center">
      <el-pagination :current-page="approval.pageIdx" :page-sizes="[5,10,20,30,50]" :page-size="approval.size" :total="total" background layout="prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <modals-container @childs-event="closeModal" />
  </div>
</template>

<script>
import { getApprovalList } from '@/api/systemManagement'
import { modifyApproval } from '@/api/systemManagement'
import approvalModal from '@/views/modals/approvalModal'
import cookie from '@/utils/cookie.js'
import moment from 'moment'
export default {
  name: 'ApprovalList',
  data() {
    return {
      // --------------------------------
      // table 관련
      listLoading: false,
      total: 0,
      // --------------------------------
      showHeader: false,
      dialogVisible: false,
      approval: {
        isPaging: 'Y',
        page: 0,
        size: 10,
        approvalType: null,
        status: null,
        requestStartDate: '',
        requestEndDate: '',
        requestNo: '',
        approvalId: cookie.getCookie('userId'),
        agencyId: cookie.getCookie('agencyId'),
        registerApprovalType: ''
      },
      formLabelHeight: '160px',
      approvalType: [
        { text: this.$t('approval.type.GREAT_RELEASE'), value: 'GREAT_RELEASE' },
        { text: this.$t('approval.type.GREAT_ISSUE'), value: 'GREAT_ISSUE' },
        { text: this.$t('approval.type.PROMOTION_ISSUE'), value: 'PROMOTION_ISSUE' }
      ],
      status: [
        { text: this.$t('approval.status.REQUEST'), value: 'REQUEST' },
        { text: this.$t('approval.status.COMPLETE'), value: 'COMPLETE' },
        { text: this.$t('approval.status.REJECTED'), value: 'REJECTED' }
      ],
      approvalList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    indexMethod(index) {
      return this.total - (index + (this.approval.page * this.approval.size))
    },
    handleSizeChange(val) {
      this.approval.size = val
      this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.approval.page = val - 1
      this.getList()
    },
    getList() {
      this.approval.requestStartDate = this.approval.requestStartDate ? moment(this.approval.requestStartDate).format('YYYY-MM-DD HH:mm:ss') : ''
      this.approval.requestEndDate = this.approval.requestEndDate ? moment(this.approval.requestEndDate).format('YYYY-MM-DD HH:mm:ss') : ''

      getApprovalList(this.approval).then(response => {
        this.approvalList = response.data.content
        this.total = response.data.totalElements
      })
    },
    doApproval(requestNo, approvalType) {
      this.$confirm(this.$t('approval.message.confirmApprovalProcess'), this.$t('approval.message.approvalProcess'), {
        confirmButtonText: this.$t('common.message.YES'),
        cancelButtonText: this.$t('common.message.NO'),
        type: 'info'
      }).then(() => {
        this.approval.requestNo = requestNo
        this.approval.registerApprovalType = approvalType
        modifyApproval(this.approval).then(response => {
          if (response.status === 201) {
            this.$message({
              type: 'info',
              message: this.$t('approval.message.completeApprovalProcess')
            })
            this.getList()
          }
        })
      }).catch(() => {
      })
    },
    doRejected(requestNo) {
      this.$modal.show(approvalModal, {
        modal: this.$modal,
        rejectedReason: '', requestNo: requestNo }, {
        width: '600px',
        height: '410px',
        adaptive: true,
        scrollable: true }, {
        'closed': (event) => { }
      })
    },
    viewReason(rejectedReason) {
      this.$modal.show(approvalModal, {
        modal: this.$modal,
        rejectedReason: rejectedReason, requestNo: '' }, {
        width: '600px',
        height: '410px',
        adaptive: true,
        scrollable: true }, {
        'closed': (event) => { }
      })
    },
    closeModal() {
      this.getList()
    }
  }
}

</script>
