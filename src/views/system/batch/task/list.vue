<template>
  <div class="app-container register_detail">
    <label class="infoLabel">| {{ $t('batchTask.batchTaskManagement') }}</label>
    <b-card
      no-body
      bg-variant="light"
      border-variant="secondary"
    >
      <b-card-body>
        <div class="col-5 display-inline">
          <b-form-group
            :label="$t('batchTask.register')"
            :description="$t('batchTask.description.inputRegister')"
            label-cols-sm="2"
            label-cols-lg="2"
          >
            <b-form-input
              v-model="searchQuery.regId"
              type="text"
            />
          </b-form-group>
        </div>
        <div class="col-6 display-inline">
          <b-form-group
            :description="$t('batchTask.description.inputRegistDate')"
            :label="$t('batchTask.regDate')"
            label-cols-sm="2"
            label-cols-lg="2"
          >
            <div>
              <el-date-picker
                v-model="searchQuery.regStartDate"
                :placeholder="$t('common.startDate')"
                type="date"
              />
              <span>-</span>
              <el-date-picker
                v-model="searchQuery.regEndDate"
                :placeholder="$t('common.endDate')"
                type="date"
              />
            </div>
          </b-form-group>
        </div>
        <div class="col-5 display-inline">
          <b-form-group
            :label="$t('batchTask.targetDate')"
            :description="$t('batchTask.description.inputTargetDate')"
            label-cols-sm="2"
            label-cols-lg="2"
          >
            <div>
              <el-date-picker
                v-model="searchQuery.targetStartDate"
                :placeholder="$t('common.startDate')"
                type="date"
              />
              <span>-</span>
              <el-date-picker
                v-model="searchQuery.targetEndDate"
                :placeholder="$t('common.endDate')"
                type="date"
              />
            </div>
          </b-form-group>
        </div>
        <div class="col-6 display-inline">
          <b-form-group
            :label="$t('batchTask.settlementStatus')"
            :description="$t('batchTask.description.inputSettlementStatus')"
            label-cols-sm="2"
            label-cols-lg="2"
          >
            <b-form-select
              v-model="searchQuery.settlementStatus"
              size="sm"
              class="width-350"
            >
              <option :value="''">{{ $t('common.select') }}</option>
              <option :value="'COMPLETE'">{{ $t('batchTask.status.complete') }}</option>
              <option :value="'WAIT'">{{ $t('batchTask.status.wait') }}</option>
              <option :value="'FAILED'">{{ $t('batchTask.status.fail') }}</option>
            </b-form-select>
          </b-form-group>
        </div>
      </b-card-body>
      <b-card-footer class="text-right">
        <b-button variant="success" size="sm" @click="register">
          <font-awesome-icon icon="plus"/> {{ $t('common.button.register') }}
        </b-button>
        <b-button variant="primary" size="sm" @click="getList">
          <font-awesome-icon icon="search"/> {{ $t('common.button.select') }}
        </b-button>
      </b-card-footer>
    </b-card>
    <div class="pagination-container" style="text-align: right; padding-bottom: 5px;">
      <el-pagination
        :current-page="searchQuery.page"
        :page-sizes="[5,10,20,30,50]"
        :page-size="searchQuery.pageSize"
        :total="totalCount"
        background
        layout="total, sizes"
        @size-change="handlePageSize"
      />
    </div>
    <table class="list-table margin-b-20">
      <colgroup>
        <col width="80px">
        <col >
        <col >
        <col >
        <col >
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>{{ $t('messages.batchStatus') }}</th>
          <th @click="changeSortColumn('targetDate')">
            <font-awesome-icon :icon="sortIcon[sort['targetDate']]" />
            {{ $t('batchTask.targetDate') }}
          </th>
          <th @click="changeSortColumn('regDate')">
            {{ $t('batchTask.regDate') }}
            <font-awesome-icon :icon="sortIcon[sort['regDate']]"/>
          </th>
          <th>{{ $t('common.regId') }}</th>
        </tr>
      </thead>
      <tbody v-if="settlementTaskList.length > 0">
        <tr v-for="(item, index) in settlementTaskList" :key="index">
          <td>{{ totalCount - (searchQuery.pageSize * (searchQuery.page - 1)) - index }}</td>
          <td>
            <b-badge v-if="item.settlementStatus === 'COMPLETE'">
              {{ $t('batchTask.status.complete') }}
            </b-badge>
            <b-badge v-else-if="item.settlementStatus === 'WAIT'" variant="success">
              {{ $t('batchTask.status.wait') }}
            </b-badge>
            <b-badge v-else-if="item.settlementStatus === 'FAILED'" variant="danger">
              {{ $t('batchTask.status.fail') }}
            </b-badge>
            <span v-else>
              -
            </span>
          </td>
          <td>
            {{ item.targetDate }}
          </td>
          <td>{{ item.regDate }}</td>
          <td>{{ item.regId }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="5" class="none-data">
            {{ $t('batchTask.messages.noData') }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="settlementTaskList.length > 0" class="pagination-container margin-b-10 margin-t-10 text-center">
      <b-pagination
        v-model="searchQuery.page"
        :total-rows="totalCount"
        :per-page="searchQuery.pageSize"
        aria-controls="my-table"
        size="sm"
        limit="10"
        align="center"
        @input="getList"
      />
    </div>
    <register-modal
      @reload-data="init()"
    />
  </div>
</template>

<script>
import moment from 'moment'
import RegisterModal from '@/components/modals/RegisterSettlementTaskModal'
export default {
  name: 'BatchTaskList',
  components: {
    RegisterModal
  },
  data() {
    return {
      searchQuery: {
        page: 1,
        pageSize: 10,
        targetStartDate: '',
        targetEndDate: '',
        regId: '',
        regStartDate: '',
        regEndDate: '',
        settlementStatus: '',
        sort: 'regDate',
        direction: 'DESC'
      },
      totalCount: 0,
      settlementTaskList: [],
      sortIcon: {
        NONE: 'sort',
        ASC: 'sort-down',
        DESC: 'sort-up'
      },
      sort: {
        regDate: 'DESC',
        targetDate: 'NONE'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    handlePageSize(value) {
      this.searchQuery.pageSize = value
      this.searchQuery.page = 1
      this.getList()
    },
    getList() {
      const params = {
        page: this.searchQuery.page,
        pageSize: this.searchQuery.pageSize,
        targetStartDate: '',
        targetEndDate: '',
        regId: '',
        regStartDate: '',
        regEndDate: '',
        settlementStatus: this.searchQuery.settlementStatus,
        sort: this.searchQuery.sort,
        direction: this.searchQuery.direction
      }
      if (this.searchQuery.targetStartDate) {
        params.targetStartDate = moment(this.searchQuery.targetStartDate).format('YYYY-MM-DD')
      }
      if (this.searchQuery.targetEndDate) {
        params.targetEndDate = moment(this.searchQuery.targetEndDate).format('YYYY-MM-DD')
      }
      if (this.searchQuery.regStartDate) {
        params.regStartDate = moment(this.searchQuery.regStartDate).format('YYYY-MM-DD 00:00:00')
      }
      if (this.searchQuery.regEndDate) {
        params.regEndDate = moment(this.searchQuery.regEndDate).format('YYYY-MM-DD 23:59:59')
      }
      this.$http.get('/batch/data/task', {
        params: params
      }).then(response => {
        this.settlementTaskList = response.data.settlementTaskItemList
        this.totalCount = response.data.totalCount
      })
    },
    register() {
      this.$bvModal.show('register-batch-task-modal')
    },
    changeSortColumn(column) {
      Object.keys(this.sort).forEach(data => {
        if (data !== column) {
          this.sort[data] = 'NONE'
        }
      })
      this.sort[column] = this.sortTypeChange(column)
      this.searchQuery.sort = column
      this.searchQuery.direction = this.sort[column]
      this.getList()
    },
    sortTypeChange(column) {
      if (this.sort[column] === 'NONE') {
        return 'ASC'
      } else if (this.sort[column] === 'ASC') {
        return 'DESC'
      } else if (this.sort[column] === 'DESC') {
        return 'ASC'
      }
    }
  }
}
</script>

<style scoped>

</style>
