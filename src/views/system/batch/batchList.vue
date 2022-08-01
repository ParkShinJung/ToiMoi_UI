<template>
  <div class="app-container register_detail">
    <label class="infoLabel">| {{ $t('messages.batch') }}</label>
    <b-card
      no-body
      bg-variant="light"
      border-variant="secondary"
    >
      <b-card-body>
        <div class="col-5 display-inline">
          <b-form-group
            :label="$t('messages.processTime')"
            :description="$t('messages.descriptionBatchSearchDate')"
            label-cols-sm="4"
            label-cols-lg="3"
          >
            <el-date-picker v-model="searchQuery.startDate" :placeholder="$t('common.startDate')" type="date" style="width: 150px;"/>
            <span class="gray-text">&nbsp;-&nbsp;</span>
            <el-date-picker v-model="searchQuery.endDate" :placeholder="$t('common.endDate')" type="date" style="width: 150px;"/>
          </b-form-group>
        </div>
        <div class="col-5 display-inline">
          <b-form-group
            :label="$t('messages.targetDate')"
            :description="$t('messages.descriptionBatchTargetDate')"
            label-cols-sm="4"
            label-cols-lg="3"
          >
            <el-date-picker v-model="searchQuery.targetDate" :placeholder="$t('messages.targetDate')" type="date"/>
          </b-form-group>
        </div>
      </b-card-body>
      <b-card-footer class="text-right">
        <b-button variant="primary" size="sm" @click="getBatchExecutionData(1)">
          <font-awesome-icon icon="search"/> {{ $t('common.button.select') }}
        </b-button>
      </b-card-footer>
    </b-card>
    <div class="pagination-container" style="text-align: right; padding-bottom: 5px;">
      <el-pagination :current-page="currentPage" :page-sizes="[5,10,20,30,50]" :page-size="pageSize" :total="totalCount" background layout="total, sizes" @size-change="handleSizeChange"/>
    </div>
    <table class="list-table margin-b-20">
      <colgroup>
        <col >
        <col >
        <col >
        <col >
        <col >
        <col >
        <col >
        <col >
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>{{ $t('messages.jobExecutionId') }}</th>
          <th>{{ $t('messages.version') }}</th>
          <th>{{ $t('messages.batchStatus') }}</th>
          <th>{{ $t('messages.targetDate') }}</th>
          <th>{{ $t('messages.startTime') }}</th>
          <th>{{ $t('messages.endTime') }}</th>
          <th>{{ $t('common.button.detail') }}</th>
        </tr>
      </thead>
      <tbody v-if="executionList.length > 0">
        <tr v-for="(item, index) in executionList" :key="index">
          <td>{{ totalCount - (pageSize * (currentPage - 1)) - index }}</td>
          <td>{{ item.jobExecutionId }}</td>
          <td>{{ item.version }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.parameters.targetDate }}</td>
          <td>{{ item.startTime }}</td>
          <td>{{ item.endTime }}</td>
          <td>
            <b-button variant="primary" size="xs" @click="goDetail(item.jobExecutionId)"><font-awesome-icon icon="search"/> {{ $t('common.button.detail') }}</b-button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="8" class="none-data">
            <span>
              <font-awesome-icon icon="store"/>
            </span>
            배치 실행 정보가 없습니다.
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
      @input="getBatchExecutionData(currentPage)"
    />
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'BatchProcessingList',
  filters: {
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      executionList: [],
      searchQuery: {
        isPaging: 'Y',
        page: 1,
        pageSize: 10,
        startDate: '',
        endDate: '',
        targetDate: ''
      },
      searchMonthRange: moment().add(1, 'months'),
      monthPickerOptions: {
        // defaultValue: moment().subtract(1, 'month')
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getUrl()
      this.getBatchExecutionData(1)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getBatchExecutionData(1)
    },
    getBatchExecutionData(page) {
      this.currentPage = page
      this.searchQuery.page = page
      this.searchQuery.pageSize = this.pageSize
      const startDate = moment(this.searchQuery.startDate, 'YYYY-MM-DD').format('YYYY-MM-DD 00:00:00')
      this.searchQuery.startDate = startDate === 'Invalid date' ? '' : startDate
      const endDate = moment(this.searchQuery.endDate, 'YYYY-MM-DD').format('YYYY-MM-DD 23:59:59')
      this.searchQuery.endDate = endDate === 'Invalid date' ? '' : endDate
      const targetDate = moment(this.searchQuery.targetDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
      this.searchQuery.targetDate = targetDate === 'Invalid date' ? '' : targetDate
      this.setUrl()
      this.$http.get('/batch/data', {
        params: this.searchQuery
      }).then(result => {
        this.executionList = []
        this.totalCount = result.data.totalCount
        result.data.executionList.forEach(execution => {
          execution.parameters = JSON.parse(execution.parameters)
          Object.getOwnPropertyNames(execution.parameters).forEach(key => {
            if (key === 'targetDate') {
              execution.targetDate = execution.parameters[key]
            }
          })
          this.executionList.push(execution)
        })
        // this.executionList = result.data.executionList
      }).catch(error => {
        console.log(error)
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    goDetail(executionId) {
      console.log('detail')
      this.$router.push('/batch/process/detail/' + executionId)
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
        '#' + this.searchQuery.targetDate +
        '#' + this.convertingUrlMomentParameters(this.searchQuery.startDate) +
        '#' + this.convertingUrlMomentParameters(this.searchQuery.endDate)
      history.pushState(null, null, '/batch/process/list' + htmlHash)
    },
    getUrl() {
      const hashVals = document.location.hash.split('#')
      console.log(hashVals.length)
      if (hashVals.length === 1) {
        this.searchQuery.page = 1
        this.searchQuery.pageSize = 10
      }
      if (hashVals.length === 6) {
        this.searchQuery.page = Number(hashVals[1])
        this.searchQuery.pageSize = Number(hashVals[2])
        // 검색 조건
        this.searchQuery.targetDate = hashVals[3]
        this.searchQuery.startDate = hashVals[4]
        this.searchQuery.endDate = hashVals[5]
      }
    }
  }
}
</script>

<style scoped>

</style>
