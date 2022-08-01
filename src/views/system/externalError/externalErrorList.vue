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
              :label="$t('externalError.regDate')"
              :description="$t('externalError.description.regDate')"
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
              :label="$t('externalError.requestUrl')"
              :description="$t('externalError.description.requestUrl')"
              label-cols-sm="3"
              label-cols-lg="2"
            >
              <b-form-input
                v-model="searchQuery.requestUrl"
                :placeholder="$t('externalError.placeholder.requestUrl')"
                type="text"
                size="sm"
                @keydown.enter="doSearch(1)"
              />
            </b-form-group>
          </div>
          <div class="col-4 display-inline">
            <b-form-group
              :label="$t('externalError.orderInfo')"
              :description="$t('externalError.description.orderInfo')"
              label-cols-sm="3"
              label-cols-lg="2"
            >
              <b-form-input
                v-model="searchQuery.orderKeyword"
                :placeholder="$t('externalError.placeholder.orderInfo')"
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
              :label="$t('externalError.externalProcessingType')"
              :description="$t('externalError.description.externalProcessingType')"
              label-cols-sm="3"
              label-cols-lg="2"
            >
              <b-form-select
                v-model="searchQuery.externalProcessingType"
                :options="externalProcessingTypeOptions"
                size="sm"
                style="width: 70%" />
            </b-form-group>
          </div>
          <div class="col-4 display-inline">
            <b-form-group
              :label="$t('externalError.externalType')"
              :description="$t('externalError.description.externalType')"
              label-cols-sm="3"
              label-cols-lg="2"
            >
              <b-form-select
                v-model="searchQuery.externalType"
                :options="externalTypeOptions"
                size="sm"
                class="w-75" />
            </b-form-group>
          </div>
          <div class="col-4 display-inline">
            <b-form-group
              :label="$t('externalError.channel')"
              :description="$t('externalError.description.channel')"
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
        <col style="width: 170px">
        <col style="width: 100px">
        <col style="width: 130px">
        <col style="width: 130px">
        <col>
        <col style="width: 200px">
        <col style="width: 120px">
        <col style="width: 90px">
        <col style="width: 90px">
        <col style="width: 90px">
        <!-- <col style="width: 100px"> -->
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>{{ $t('externalError.regDate') }}</th> <!--발생일자-->
          <th>{{ $t('externalError.externalType') }}</th> <!--채널타입-->
          <th>{{ $t('externalError.channelName') }}</th> <!--채널명-->
          <th>{{ $t('externalError.externalProcessingType') }}</th> <!--처리구분-->
          <th>{{ $t('externalError.requestUrl') }}</th> <!--요청URL-->
          <th>{{ $t('externalError.errorType') }}</th>
          <th>{{ $t('externalError.errorProcessingStatus') }}</th>
          <th>{{ $t('externalError.detailInfo') }}</th>
          <th>{{ $t('externalError.requestData') }}</th>
          <th>{{ $t('externalError.stackTrace') }}</th>
          <!-- <th>{{ $t('externalError.detailInfo') }}</th> -->
        </tr>
      </thead>
      <tbody v-if="errorList.length > 0">
        <tr v-for="(item, index) in errorList" :key="index">
          <td>{{ totalCount - (pageSize * (currentPage - 1)) - index }}</td>
          <td>{{ item.regDate }}</td>
          <td :class="item.externalType | externalTypeClass">
            {{ item.externalType | externalTypeFilter }}
          </td>
          <td>
            {{ item.channelName }}
          </td>
          <td>
            {{ item.externalProcessingType | externalProcessingTypeFilter }}
          </td>
          <td class="text-left">{{ item.requestUrl }}</td>
          <td class="text-left">{{ item.errorType }}</td>
          <td >
            {{ item.errorProcessingStatus | errorProcessingStatusFilter }}<br>
            <span v-if="item.procDate != null && item.procDate != '' && item.procDate != undefined">
              {{ item.procDate }}
            </span>
          </td>
          <td>
            <b-button size="xs" variant="primary" @click="calOtherDetail('modal-error-detail', item)">
              <font-awesome-icon icon="search"/>
              {{ $t('messages.showDetail') }}
            </b-button>
          </td>
          <td>
            <b-button size="xs" variant="warning" @click="calErrorLogsDetail('modal-error-logs', 'requestData', item)">
              <font-awesome-icon icon="file-invoice"/>
              {{ $t('messages.showDetail') }}
            </b-button>
          </td>
          <td>
            <b-button size="xs" variant="warning" @click="calErrorLogsDetail('modal-error-logs', 'stackTrace', item)">
              <font-awesome-icon icon="file-invoice"/>
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
            {{ $t('messages.messagesNoSearchErrorList') }}
          </td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalCount"
      :per-page="pageSize"
      aria-controls="my-table"
      size="sm"
      limit="10"
      @input="doSearch(currentPage)"
    />
    <detail-error-logs-modal :modal-type="modalType" :detail-data="detailData" />
    <detail-external-error-modal :detail-data="detailData" />
  </div>
</template>
<script>
import moment from 'moment'
import i18n from '../../../lang'
import { getSalesChannelSearchList } from '@/api/salesChannel'
import DetailErrorLogsModal from '../../../components/modals/DetailErrorLogsModal'
import DetailExternalErrorModal from '../../../components/modals/DetailExternalErrorModal'

export default {
  name: 'ExternalErrorList',
  components: { DetailErrorLogsModal, DetailExternalErrorModal },
  filters: {
    externalProcessingTypeFilter(type) {
      const externalProcessingType = {
        ISSUE_TICKET: i18n.t('externalError.externalProcessingTypeValue.ISSUE_TICKET'),
        ISSUE_CANCEL_TICKET: i18n.t('externalError.externalProcessingTypeValue.ISSUE_CANCEL_TICKET'),
        USE_TICKET: i18n.t('externalError.externalProcessingTypeValue.USE_TICKET'),
        USE_CANCEL_TICKET: i18n.t('externalError.externalProcessingTypeValue.USE_CANCEL_TICKET'),
        WEBHOOK: i18n.t('externalError.externalProcessingTypeValue.WEBHOOK')
      }
      return externalProcessingType[type]
    },
    externalTypeFilter(type) {
      const externalType = {
        SUPPLY_CHANNEL: i18n.t('externalError.externalTypeValue.SUPPLY_CHANNEL'),
        SALES_CHANNEL: i18n.t('externalError.externalTypeValue.SALES_CHANNEL'),
        NONE: i18n.t('externalError.externalTypeValue.NONE')
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
    errorProcessingStatusFilter(type) {
      const status = {
        UNPROCESSED: i18n.t('externalError.errorProcessingStatusValue.UNPROCESSED'),
        PROCESSING: i18n.t('externalError.errorProcessingStatusValue.PROCESSING'),
        PROCESSED: i18n.t('externalError.errorProcessingStatusValue.PROCESSED'),
        PROCESSING_FAILURE: i18n.t('externalError.errorProcessingStatusValue.PROCESSING_FAILURE')
      }
      return status[type]
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
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
        { text: i18n.t('externalError.search.channelAll'), value: '' }
      ],
      detailData: {},
      modalType: 'requestData',
      externalProcessingTypeOptions: [
        { text: i18n.t('common.search_select'), value: '' },
        { text: i18n.t('externalError.externalProcessingTypeValue.ISSUE_TICKET'), value: 'ISSUE_TICKET' },
        { text: i18n.t('externalError.externalProcessingTypeValue.ISSUE_CANCEL_TICKET'), value: 'ISSUE_CANCEL_TICKET' },
        { text: i18n.t('externalError.externalProcessingTypeValue.USE_TICKET'), value: 'USE_TICKET' },
        { text: i18n.t('externalError.externalProcessingTypeValue.USE_CANCEL_TICKET'), value: 'USE_CANCEL_TICKET' },
        { text: i18n.t('externalError.externalProcessingTypeValue.WEBHOOK'), value: 'WEBHOOK' }
      ],
      externalTypeOptions: [
        { text: i18n.t('externalError.search.externalType'), value: '' },
        { text: i18n.t('externalError.externalTypeValue.SUPPLY_CHANNEL'), value: 'SUPPLY_CHANNEL' },
        { text: i18n.t('externalError.externalTypeValue.SALES_CHANNEL'), value: 'SALES_CHANNEL' },
        { text: i18n.t('externalError.externalTypeValue.NONE'), value: 'NONE' }
      ]
    }
  },
  computed: {
    currentExternalType() {
      return this.searchQuery.externalType
    }
  },
  watch: {
    currentExternalType() {
      if (this.searchQuery.externalType === '') {
        this.channelList = [{ text: i18n.t('externalError.search.channelAll'), value: '' }]
      } else if (this.searchQuery.externalType === 'SUPPLY_CHANNEL') {
        this.channelList = [{ text: i18n.t('externalError.search.supplyChannelAll'), value: '' }]
        // console
      } else if (this.searchQuery.externalType === 'SALES_CHANNEL') {
        this.getSupplyChannelList()
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
      this.searchQuery.page = page
      if (this.searchQuery.startDate !== null && this.searchQuery.startDate !== undefined && this.searchQuery.startDate !== '') {
        this.searchQuery.startDate = moment(this.searchQuery.startDate).format('YYYY-MM-DD HH:mm:ss')
      }
      if (this.searchQuery.endDate !== null && this.searchQuery.endDate !== undefined && this.searchQuery.endDate !== '') {
        this.searchQuery.endDate = moment(this.searchQuery.endDate).format('YYYY-MM-DD 23:59:59')
      }
      this.$http.get('error/external', {
        params: this.searchQuery
      }).then(response => {
        this.errorList = response.data.errorList
        this.totalCount = response.data.totalCount
      })
    },
    calErrorLogsDetail(modalId, type, item) {
      this.modalType = type
      this.detailData = { data: item[type] }
      this.callModal(modalId)
    },
    calOtherDetail(modalId, item) {
      this.detailData = {
        orderNum: item.orderNum,
        pinNumber: item.pinNumber,
        retryCount: item.retryCount,
        externalTargetUrl: item.externalTargetUrl
      }
      this.callModal(modalId)
    },
    callModal(modalId) {
      // modal-error-logs
      this.$bvModal.show(modalId)
    },
    getSupplyChannelList() {
      getSalesChannelSearchList().then(response => {
        this.channelList = [{ text: i18n.t('externalError.search.salesChannelAll'), value: '' }]
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
