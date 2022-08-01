<template>
  <div class="app-container register_detail">
    <b-card
      no-body
      bg-variant="light"
      border-variant="secondary"
    >
      <b-card-body>
        <div class="col-4 display-inline">
          <b-form-group
            :label="$t('messages.errorDate')"
            :description="$t('messages.descriptionErrorRegDate')"
            label-cols-sm="4"
            label-cols-lg="3"
          >
            <el-date-picker v-model="searchQuery.startDate" :placeholder="$t('common.startDate')" type="date" style="width: 150px;"/>
            <span class="gray-text">&nbsp;-&nbsp;</span>
            <el-date-picker v-model="searchQuery.endDate" :placeholder="$t('common.endDate')" type="date" style="width: 150px;"/>
          </b-form-group>
        </div>
        <div class="col-4 display-inline">
          <b-form-group
            :label="$t('messages.requestUrl')"
            :description="$t('messages.descriptionErrorRequestUrl')"
            label-cols-sm="4"
            label-cols-lg="3"
          >
            <b-form-input v-model="searchQuery.requestUrl" />
          </b-form-group>
        </div>
        <div class="col-3 display-inline">
          <b-form-group
            :label="$t('messages.instance')"
            :description="$t('messages.descriptionErrorInstanceType')"
            label-cols-sm="4"
            label-cols-lg="3"
          >
            <b-form-select
              v-model="searchQuery.instanceType"
              :options="instanceTypeList"
              size="sm"
            />
          </b-form-group>
        </div>
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
        <col style="width: 80px">
        <col style="width: 190px">
        <col style="width: 120px">
        <col style="width: 100px">
        <col >
        <col style="width: 300px">
        <col style="width: 100px">
        <col style="width: 100px">
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>{{ $t('messages.errorDate') }}</th>
          <th>{{ $t('messages.instance') }}</th>
          <th>{{ $t('messages.method') }}</th>
          <th>{{ $t('messages.requestUrl') }}</th>
          <th>{{ $t('messages.errorType') }}</th>
          <th>{{ $t('messages.requestData') }}</th>
          <th>{{ $t('messages.stackTrace') }}</th>
        </tr>
      </thead>
      <tbody v-if="errorList.length > 0">
        <tr v-for="(item, index) in errorList" :key="index">
          <td>{{ totalCount - (pageSize * (currentPage - 1)) - index }}</td>
          <td>{{ item.regDate }}</td>
          <td>{{ item.instanceType | instanceTypeFilter }}</td>
          <td>{{ item.httpMethod }}</td>
          <td class="text-left">{{ item.requestUrl }}</td>
          <td>{{ item.errorType }}</td>
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
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="8" class="none-data">
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
  </div>
</template>
<script>
import moment from 'moment'
import i18n from '../../../lang'
import DetailErrorLogsModal from '../../../components/modals/DetailErrorLogsModal'

export default {
  name: 'ErrorList',
  components: { DetailErrorLogsModal },
  filters: {
    instanceTypeFilter(type) {
      const instanceType = {
        MAIN: i18n.t('messages.instanceType.MAIN'),
        API_GATEWAY: i18n.t('messages.instanceType.API_GATEWAY'),
        ORDER: i18n.t('messages.instanceType.ORDER'),
        PRODUCT: i18n.t('messages.instanceType.PRODUCT'),
        TICKET: i18n.t('messages.instanceType.TICKET'),
        SETTLEMENT: i18n.t('messages.instanceType.SETTLEMENT'),
        FILE: i18n.t('messages.instanceType.FILE'),
        PARTNER: i18n.t('messages.instanceType.PARTNER'),
        ETC: i18n.t('messages.instanceType.ETC')
      }
      return instanceType[type]
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
        instanceType: ''
      },
      errorList: [],
      instanceTypeList: [
        { text: i18n.t('common.search_select'), value: '' },
        { text: i18n.t('messages.instanceType.MAIN'), value: 'MAIN' },
        { text: i18n.t('messages.instanceType.API_GATEWAY'), value: 'API_GATEWAY' },
        { text: i18n.t('messages.instanceType.ORDER'), value: 'ORDER' },
        { text: i18n.t('messages.instanceType.PRODUCT'), value: 'PRODUCT' },
        { text: i18n.t('messages.instanceType.TICKET'), value: 'TICKET' },
        { text: i18n.t('messages.instanceType.SETTLEMENT'), value: 'SETTLEMENT' },
        { text: i18n.t('messages.instanceType.FILE'), value: 'FILE' },
        { text: i18n.t('messages.instanceType.ETC'), value: 'ETC' }
      ],
      detailData: {},
      modalType: 'requestData'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getUrl()
      this.doSearch(1)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.searchQuery.pageSize = val
      this.doSearch(1)
    },
    convertingUrlMomentParameters(value) {
      const momentValue = moment(value).format('YYYY-MM-DD')
      if (momentValue === undefined || momentValue === 'Invalid date') {
        return ''
      } else {
        return momentValue
      }
    },
    setUrl() {
      const htmlHash =
        '#' + (this.searchQuery.page) +
        '#' + this.searchQuery.pageSize +
        // 검색 조건
        '#' + this.convertingUrlMomentParameters(this.searchQuery.startDate) +
        '#' + this.convertingUrlMomentParameters(this.searchQuery.endDate) +
        '#' + this.searchQuery.requestUrl +
        '#' + this.searchQuery.instanceType
      history.pushState(null, null, '/error/logs/' + htmlHash)
    },
    getUrl() {
      const hashVals = document.location.hash.split('#')
      if (hashVals.length === 1) {
        this.searchQuery.page = 1
        this.searchQuery.pageSize = 10
      }
      if (hashVals.length === 7) {
        this.searchQuery.page = Number(hashVals[1])
        this.searchQuery.pageSize = Number(hashVals[2])
        // 검색 조건
        this.searchQuery.startDate = hashVals[3]
        this.searchQuery.endDate = hashVals[4]
        this.searchQuery.requestUrl = hashVals[5]
        this.searchQuery.instanceType = hashVals[6]
      }
    },
    doSearch(page) {
      //
      this.searchQuery.page = page
      if (this.searchQuery.startDate !== null && this.searchQuery.startDate !== undefined && this.searchQuery.startDate !== '') {
        this.searchQuery.startDate = moment(this.searchQuery.startDate).format('YYYY-MM-DD HH:mm:ss')
      }
      if (this.searchQuery.endDate !== null && this.searchQuery.endDate !== undefined && this.searchQuery.endDate !== '') {
        this.searchQuery.endDate = moment(this.searchQuery.endDate).format('YYYY-MM-DD 23:59:59')
      }
      this.setUrl()
      this.$http.get('error/logs', {
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
    callModal(modalId) {
      // modal-error-logs
      this.$bvModal.show(modalId)
    }
  }
}
</script>

<style scoped>

</style>
