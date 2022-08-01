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
              :description="$t('messages.descriptionDownHistoryType')"
              :label="$t('downloadHistory.downloadClassification')"
              label-cols-sm="4"
              label-cols-lg="3"
            >
              <b-form-select
                v-model="searchQuery.downloadClassification"
                :options="downloadType"
                size="sm"
              />
            </b-form-group>
          </div>
          <div class="col-5 display-inline">
            <b-form-group
              :description="$t('messages.descriptionDownHistoryOrderDate')"
              :label="$t('downloadHistory.requestDate')"
              label-cols-sm="4"
              label-cols-lg="3"
            >
              <el-date-picker v-model="searchQuery.reqStartDt" :placeholder="$t('common.startDate')" type="date" style="width: 150px;"/>
              <span>-</span>
              <el-date-picker v-model="searchQuery.reqEndDt" :placeholder="$t('common.endDate')" type="date" style="width: 150px;"/>
            </b-form-group>
          </div>
        </b-card-body>
        <b-card-footer class="text-right">
          <b-button variant="primary" size="sm" @click="doSearch"><font-awesome-icon icon="search"/> {{ $t('common.button.select') }}</b-button>
          <!--<b-button variant="success" size="sm" @click="doExcelDownload"><font-awesome-icon icon="file-download"/> {{ $t('common.button.excel_download') }}</b-button>-->
        </b-card-footer>
      </b-card>
    </b-card-group>

    <div class="pagination-container" style="text-align: right; padding-bottom: 5px;">
      <el-pagination :current-page="searchQuery.pageIdx" :page-sizes="[5,10,20,30,50]" :page-size="searchQuery.size" :total="total" background layout="total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <table class="el-table list-table">
      <colgroup>
        <col style="width: 80px;">
        <col >
        <col style="width: 120px">
        <col style="width: 70px">
        <col >
        <col style="width: 100px;">
        <col style="width: 100px;">
        <col style="width: 80px;">
        <col style="width: 150px;">
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>{{ $t('messages.downLoadType') }}</th>
          <th>{{ $t('downloadHistory.requestDate') }}</th>
          <th>{{ $t('downloadHistory.requestTime') }}</th>
          <th>{{ $t('downloadHistory.requestId') }}</th>
          <th>{{ $t('downloadHistory.fileClassification') }}</th>
          <th>{{ $t('messages.fileStatus') }}</th>
          <th>{{ $t('downloadHistory.count') }}</th>
          <th>{{ $t('downloadHistory.download') }}</th>
        </tr>
      </thead>
      <tbody v-if="list.length > 0">
        <tr v-for="(item, index) in list" :key="item.key">
          <td>{{ (total - (searchQuery.page * searchQuery.size)) - index }}</td>
          <td v-if="item.downloadClassification === 'PIN_CANCEL'">{{ $t('downloadHistory.type.PIN_CANCEL') }}</td>
          <td v-if="item.downloadClassification === 'PIN_MASSFORWORD'">{{ $t('downloadHistory.type.PIN_MASSFORWORD') }}</td>
          <td v-if="item.downloadClassification === 'ISSUE_USE'">{{ $t('downloadHistory.type.ISSUE_USE') }}</td>
          <td v-if="item.downloadClassification === 'TRANSACTION'">{{ $t('downloadHistory.type.TRANSACTION') }}</td>
          <td v-if="item.downloadClassification === 'PRODUCT_EC'">{{ $t('downloadHistory.type.PRODUCT_EC') }}</td>
          <td v-if="item.downloadClassification === 'SUPPLIER_EC'">{{ $t('downloadHistory.type.SUPPLIER_EC') }}</td>
          <td v-if="item.downloadClassification === 'GREAT_RELEASE'">{{ $t('downloadHistory.type.GREAT_RELEASE') }}</td>
          <td v-if="item.downloadClassification === 'GREAT_ISSUE'">{{ $t('downloadHistory.type.GREAT_ISSUE') }}</td>
          <td v-if="item.downloadClassification === 'PROMOTION_ISSUE'">{{ $t('downloadHistory.type.PROMOTION_ISSUE') }}</td>
          <td v-if="item.downloadClassification === 'PROMOTION_MESSAGE'">{{ $t('downloadHistory.type.PROMOTION_MESSAGE') }}</td>
          <td>{{ item.requestDate | DefDateFormat }}</td>
          <td>{{ item.requestDate | DefTimeFormat }}</td>
          <td>{{ item.requestId }}</td>
          <td>{{ item.fileClassification }}</td>
          <td v-if="item.processStatus === 'WAITING'">{{ $t('downloadHistory.status.WAITING') }}</td>
          <td v-if="item.processStatus === 'PROGRESS'" style="color: blue">{{ $t('downloadHistory.status.PROGRESS') }}</td>
          <td v-if="item.processStatus === 'COMPLETE'" style="color: green">{{ $t('downloadHistory.status.COMPLETE') }}</td>
          <td v-if="item.processStatus === 'FAILURE'" style="color: red">{{ $t('downloadHistory.status.FAILURE') }}</td>
          <td class="text-right">{{ addComma(item.downloadCount) }}</td>
          <td v-if="!isExpiredDownload(item.requestDate) && item.processStatus === 'COMPLETE'"><a :href="item.downloadUrl"><button type="success" size="mini" @click="doDownload(item.row)">{{ $t('common.button.download') }}</button></a></td>
          <td v-else-if="'WAITING, PROGRESS, FAILURE'.indexOf(item.processStatus) > -1">&nbsp;></td>
          <td v-else>{{ $t('downloadHistory.saveExpired') }}</td>
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
    <div v-if="list.length > 0" class="pagination-container margin-b-10 margin-t-10 text-center">
      <el-pagination :current-page="searchQuery.pageIdx" :page-sizes="[5,10,20,30,50]" :page-size="searchQuery.size" :total="total" background layout="prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { getDownloadHistory } from '@/api/downloadHistory'
import cookie from '@/utils/cookie'
import moment from 'moment'

export default {
  name: 'DownloadHistory',
  filters: {
    DefDateTimeFormat: function(value) {
      if (value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    DefDateFormat: function(value) {
      if (value) {
        return moment(value).format('YYYY-MM-DD')
      }
    },
    DefTimeFormat: function(value) {
      if (value) {
        return moment(value).format('HH:mm:ss')
      }
    }
  },
  data() {
    return {
      // --------------------------------
      // table 관련
      listLoading: false,
      total: 0,
      // --------------------------------
      showHeader: false,
      searchQuery: {
        isPaging: 'Y',
        page: 0,
        size: 10,
        downloadClassification: '',
        reqId: cookie.getCookie('userId'),
        regId: cookie.getCookie('userId'),
        reqStartDt: '',
        reqEndDt: ''
      },
      downloadType: [
        { text: this.$t('downloadHistory.type.PIN_CANCEL'), value: 'PIN_CANCEL' },
        { text: this.$t('downloadHistory.type.PIN_MASSFORWORD'), value: 'PIN_MASSFORWORD' },
        { text: this.$t('downloadHistory.type.ISSUE_USE'), value: 'ISSUE_USE' },
        { text: this.$t('downloadHistory.type.TRANSACTION'), value: 'TRANSACTION' },
        { text: this.$t('downloadHistory.type.PRODUCT_EC'), value: 'PRODUCT_EC' },
        { text: this.$t('downloadHistory.type.SUPPLIER_EC'), value: 'SUPPLIER_EC' },
        { text: this.$t('downloadHistory.type.SALES_CHANNEL_EC'), value: 'SALES_CHANNEL_EC' },
        { text: this.$t('downloadHistory.type.SALES_CLIENT_EC'), value: 'SALES_CLIENT_EC' },
        { text: this.$t('downloadHistory.type.GREAT_RELEASE'), value: 'GREAT_RELEASE' },
        { text: this.$t('downloadHistory.type.GREAT_ISSUE'), value: 'GREAT_ISSUE' },
        { text: this.$t('downloadHistory.type.PROMOTION_ISSUE'), value: 'PROMOTION_ISSUE' },
        { text: this.$t('downloadHistory.type.PROMOTION_MESSAGE'), value: 'PROMOTION_MESSAGE' }
      ],
      list: []
    }
  },
  created() {
    this.doSearch()
  },
  methods: {
    indexMethod(index) {
      return this.total - (index + (this.searchQuery.page * this.searchQuery.size))
    },
    handleSizeChange(val) {
      this.searchQuery.size = val
      this.doSearch()
    },
    handleCurrentChange(val) {
      this.searchQuery.page = val - 1
      this.doSearch()
    },
    doSearch() {
      if (this.searchQuery.reqStartDt) {
        this.searchQuery.reqStartDt = moment(this.searchQuery.reqStartDt).format('YYYY-MM-DD HH:mm:ss')
      }
      if (this.searchQuery.reqEndDt) {
        this.searchQuery.reqEndDt = moment(this.searchQuery.reqEndDt).format('YYYY-MM-DD 23:59:59')
      }

      getDownloadHistory(this.searchQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
      })
    },
    doDownload(downloadHistoryInfo) {
      // addDownloadCount(downloadHistoryInfo).then(response => {
      //   if (response.status === 201) {
      //     this.doSearch()
      //   }
      // })
    },
    isExpiredDownload(requestDate) {
      const baseDay = 30
      return baseDay < moment().diff(requestDate, 'days')
    }
  }
}

</script>
