<template>
  <div class="app-container register_detail">
    <b-card
      no-body
      bg-variant="light"
      border-variant="secondary"
    >
      <b-card-body>
        <b-row>
          <div class="col-4 display-inline">
            <b-form-group
              :label="$t('managerError.regDate')"
              :description="$t('managerError.description.regDate')"
              label-cols-sm="3"
              label-cols-lg="2"
            >
              <el-date-picker v-model="searchQuery.startDate" :placeholder="$t('common.startDate')" type="date" style="width: 150px;"/>
              <span class="gray-text">&nbsp;-&nbsp;</span>
              <el-date-picker v-model="searchQuery.endDate" :placeholder="$t('common.endDate')" type="date" style="width: 150px;"/>
            </b-form-group>
          </div>
          <div class="col-4 display-inline">
            <b-form-group
              :label="$t('managerError.errorProcessingStatus')"
              label-cols-sm="3"
              label-cols-lg="2"
            >
              <b-form-input
                v-model="searchQuery.orderKeyword"
                :placeholder="$t('managerError.placeholder.orderInfo')"
                type="text"
                size="sm"
                @keydown.enter="doSearch(1)"
              />
            </b-form-group>
          </div>
        </b-row>
        <b-row>
          <div class="col-4 display-inline">
            <b-form-group
              :label="$t('managerError.externalType')"
              :description="$t('managerError.description.externalType')"
              label-cols-sm="3"
              label-cols-lg="2"
            >
              <b-form-radio-group
                v-model="searchQuery.externalType"
                :options="externalTypeOptions"
              />
            </b-form-group>
          </div>
          <div class="col-4 display-inline">
            <b-form-group
              :label="$t('managerError.channel')"
              :description="$t('managerError.description.channel')"
              label-cols-sm="3"
              label-cols-lg="2"
            >
              <b-form-select
                v-model="searchQuery.channelCode"
                :options="channelList"
                :disabled="searchQuery.externalType !== 'SUPPLY_CHANNEL' && searchQuery.externalType !== 'SALES_CHANNEL'"
                size="sm" />
            </b-form-group>
          </div>
          <!--          <div class="col-4 display-inline">-->
          <!--            <b-form-group-->
          <!--              :label="$t('managerError.requestUrl')"-->
          <!--              :description="$t('managerError.description.requestUrl')"-->
          <!--              label-cols-sm="3"-->
          <!--              label-cols-lg="2"-->
          <!--            >-->
          <!--              <b-form-input-->
          <!--                v-model="searchQuery.requestUrl"-->
          <!--                :placeholder="$t('managerError.placeholder.requestUrl')"-->
          <!--                type="text"-->
          <!--                size="sm"-->
          <!--                @keydown.enter="doSearch(1)"-->
          <!--              />-->
          <!--            </b-form-group>-->
          <!--          </div>-->
        </b-row>
      </b-card-body>
      <b-card-footer class="text-right">
        <b-button variant="primary" size="sm" @click="doSearch(1)">
          <font-awesome-icon icon="search"/> {{ $t('messages.search') }}
        </b-button>
      </b-card-footer>
    </b-card>
    <div class="pagination-container" style="text-align: right; padding-bottom: 5px;">
      <el-pagination :current-page="currentPage" :page-sizes="[5,10,20,30,50]" :page-size="pageSize" :total="totalCount" background layout="total, sizes" @size-change="handleSizeChange"/>
    </div>
    <table class="list-table margin-b-20">
      <colgroup>
        <col style="width: 70px">
        <col style="width: 120px">
        <col style="width: 100px">
        <col style="width: 100px">
        <col style="width: 100px">
        <col style="width: 80px">
        <col style="width: 80px">
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>{{ $t('managerError.orderNum') }}</th> <!--주문번호-->
          <th>{{ $t('managerError.optionTicketNumber') }}</th> <!--옵션 주문번호-->
          <th>{{ $t('managerError.ticketNumber') }}</th> <!--티켓 번호-->
          <th>{{ $t('managerError.channelName') }}</th> <!--채널명-->
          <th>{{ $t('managerError.errorProcessingStatus') }}</th> <!--상태-->
          <th>상세 내역</th>
        </tr>
      </thead>
      <tbody v-if="errorList.length > 0">
        <tr v-for="(item, index) in errorList" :key="index">
          <td>{{ totalCount - (pageSize * (currentPage - 1)) - index }}</td>
          <td>
            <router-link :to="'/ticket/sales/detail/' + item.orderNum" target="_blank">
              {{ item.orderNum }}
            </router-link>
          </td>
          <td>
            {{ item.ticketNumber }}
          </td>
          <td>
            {{ item.pinNumber }}
          </td>
          <td>
            {{ item.channelName }}
          </td>
          <td>
            {{ item.errorProcessingStatus | errorProcessingStatusFilter }}
          </td>
          <td>
            <b-button size="xs" variant="warning" @click="calErrorLogsDetail('modal-manager-error-logs', 'requestData', item)">
              <font-awesome-icon icon="search"/>
              {{ $t('messages.showDetail') }}
            </b-button>
          </td>
          <!-- <td>
            <b-button size="xs" variant="primary" @click="calErrorLogsDetail('modal-error-logs', 'stackTrace', item)">
              <font-awesome-icon icon="search"/>
              {{ $t('messages.showDetail') }}
            </b-button>
          </td> -->
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="10" class="none-data">
            <span>
              <font-awesome-icon icon="exclamation-triangle"/>
            </span>
            {{ $t('managerError.message.noResult') }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="errorList.length > 0" class="pagination-container margin-b-10 margin-t-10 text-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalCount"
        :per-page="pageSize"
        aria-controls="my-table"
        align="center"
        size="sm"
        limit="10"
        @input="doSearch(currentPage)"
      />
    </div>
    <detail-manager-error-logs-modal :modal-type="modalType" :detail-data="detailData" />
  </div>
</template>
<script>
import moment from 'moment'
import i18n from '../../../lang'
import { getSalesChannelSearchList } from '@/api/salesChannel'
import DetailManagerErrorLogsModal from '../../../components/modals/DetailManagerErrorLogsModal'

export default {
  name: 'ManagerErrorList',
  components: { DetailManagerErrorLogsModal },
  filters: {
    externalProcessingTypeFilter(type) {
      const externalProcessingType = {
        ISSUE_TICKET: i18n.t('managerError.externalProcessingTypeValue.ISSUE_TICKET'),
        ISSUE_CANCEL_TICKET: i18n.t('managerError.externalProcessingTypeValue.ISSUE_CANCEL_TICKET'),
        USE_TICKET: i18n.t('managerError.externalProcessingTypeValue.USE_TICKET'),
        USE_CANCEL_TICKET: i18n.t('managerError.externalProcessingTypeValue.USE_CANCEL_TICKET')
      }
      return externalProcessingType[type]
    },
    externalTypeFilter(type) {
      const externalType = {
        SUPPLY_CHANNEL: i18n.t('managerError.externalTypeValue.SUPPLY_CHANNEL'),
        SALES_CHANNEL: i18n.t('managerError.externalTypeValue.SALES_CHANNEL')
      }
      return externalType[type]
    },
    externalTypeClass(type) {
      const externalType = {
        SUPPLY_CHANNEL: 'green-text-2',
        SALES_CHANNEL: 'blue-text-2'
      }
      return externalType[type]
    },
    errorProcessingStatusClass(status) {
      const classMap = {
        UNPROCESSED: 'blue-text-2',
        PROCESSING: 'green-text-2',
        PROCESSED: 'gray-text',
        PROCESSING_FAILURE: 'red-text'
      }
      return classMap[status]
    },
    errorProcessingStatusFilter(type) {
      const status = {
        UNPROCESSED: i18n.t('managerError.errorProcessingStatusValue.UNPROCESSED'),
        PROCESSING: i18n.t('managerError.errorProcessingStatusValue.PROCESSING'),
        PROCESSED: i18n.t('managerError.errorProcessingStatusValue.PROCESSED'),
        PROCESSING_FAILURE: i18n.t('managerError.errorProcessingStatusValue.PROCESSING_FAILURE')
      }
      return status[type]
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      searchKeyword: {
        isPaging: 'Y',
        page: 1,
        pageSize: 10,
        // ----------------검색 조건-------------------
        startDate: '',
        endDate: '',
        requestUrl: '',
        orderKeyword: '',
        orderChannelCode: '',
        externalType: '',
        channelCode: ''
      },
      searchQuery: {
        isPaging: 'Y',
        page: 1,
        pageSize: 10,
        startDate: '',
        endDate: '',
        requestUrl: '',
        orderKeyword: '',
        externalProcessingType: '',
        externalType: '',
        channelCode: ''
      },
      errorList: [],
      channelList: [
        { text: i18n.t('managerError.search.channelAll'), value: '' }
      ],
      detailData: {},
      modalType: 'requestData',
      externalProcessingTypeOptions: [
        { text: i18n.t('common.search_select'), value: '' },
        { text: i18n.t('managerError.externalProcessingTypeValue.ISSUE_TICKET'), value: 'ISSUE_TICKET' },
        { text: i18n.t('managerError.externalProcessingTypeValue.ISSUE_CANCEL_TICKET'), value: 'ISSUE_CANCEL_TICKET' },
        { text: i18n.t('managerError.externalProcessingTypeValue.USE_TICKET'), value: 'USE_TICKET' },
        { text: i18n.t('managerError.externalProcessingTypeValue.USE_CANCEL_TICKET'), value: 'USE_CANCEL_TICKET' }
      ],
      externalTypeOptions: [
        { text: i18n.t('managerError.search.externalType'), value: '' },
        { text: i18n.t('managerError.externalTypeValue.NONE'), value: 'NONE' },
        { text: i18n.t('managerError.externalTypeValue.SUPPLY_CHANNEL'), value: 'SUPPLY_CHANNEL' },
        { text: i18n.t('managerError.externalTypeValue.SALES_CHANNEL'), value: 'SALES_CHANNEL' }
      ],
      channelCodeOptions: [
        { text: i18n.t('common.search_select'), value: '' }
      ]
    }
  },
  watch: {
    'searchQuery.externalType'() {
      if (this.searchQuery.externalType === 'SUPPLY_CHANNEL') {
        this.channelList = [{ text: i18n.t('managerError.search.supplyChannelAll'), value: '' }]
        // console
      } else if (this.searchQuery.externalType === 'SALES_CHANNEL') {
        this.getSupplyChannelList()
      } else {
        this.channelList = [{ text: i18n.t('managerError.search.channelAll'), value: '' }]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.doSearch(1)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.searchQuery.pageSize = val
      this.doSearch(1)
    },
    doSearch(page) {
      console.log('currentPage', page)
      console.log('this.pageSize', this.pageSize)
      this.searchQuery.page = page
      this.searchQuery.pageSize = this.pageSize
      if (this.searchQuery.startDate !== null && this.searchQuery.startDate !== undefined && this.searchQuery.startDate !== '') {
        this.searchQuery.startDate = moment(this.searchQuery.startDate).format('YYYY-MM-DD HH:mm:ss')
      }
      if (this.searchQuery.endDate !== null && this.searchQuery.endDate !== undefined && this.searchQuery.endDate !== '') {
        this.searchQuery.endDate = moment(this.searchQuery.endDate).format('YYYY-MM-DD 23:59:59')
      }
      this.$http.get('manager/error', {
        params: this.searchQuery
      }).then(response => {
        this.errorList = response.data.errorList
        this.totalCount = response.data.totalCount
      })
    },
    calErrorLogsDetail(modalId, type, item) {
      this.modalType = type
      this.detailData = {
        pinNumber: item.pinNumber
      }
      this.callModal(modalId)
    },
    callModal(modalId) {
      // modal-error-logs
      this.$bvModal.show(modalId)
    },
    getSupplyChannelList() {
      getSalesChannelSearchList().then(response => {
        this.channelList = [{ text: i18n.t('managerError.search.salesChannelhannelAll'), value: '' }]
        response.data.forEach((saleChannel) => {
          const data = {
            text: '', value: ''
          }
          data.text = saleChannel.salesChannelName
          data.value = saleChannel.salesChannelId
          this.channelList.push(data)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-table {
    td {
      word-break: break-all;
    }
  }
</style>
