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
              label="관리자정보"
              description="관리자 ID / 관리자 명 검색"
              label-cols-sm="4"
              label-cols-lg="3"
            >
              <b-form-input
                v-model="searchQuery.keyword"
                placeholder=""
                type="text"
                size="sm"
                @keydown.enter="getAccountList(1)"
              />
            </b-form-group>
          </div>
          <div class="col-5 display-inline">
            <b-form-group
              label="계정 구분"
              label-cols-sm="4"
              label-cols-lg="3"
            >
              <b-form-select
                v-model="searchQuery.accountType"
                size="sm"
              >
                <option value="">전체</option>
                <option v-for="accountType in userAccountType" :key="accountType.key" :value="accountType.value">{{ accountType.text }}</option>
              </b-form-select>
            </b-form-group>
          </div>
        </b-card-body>
        <b-card-footer>
          <b-button variant="primary" size="sm" class="float-right" @click="getAccountList(1)">
            <font-awesome-icon icon="search"/> {{ $t('common.button.select') }}
          </b-button>
          <b-button variant="success" size="sm" @click="doRequest">
            <font-awesome-icon icon="plus"/> {{ $t('common.button.register') }}
          </b-button>
        </b-card-footer>
      </b-card>
    </b-card-group>

    <div class="pagination-container" style="text-align: right; padding-bottom: 5px;">
      <el-pagination :current-page="currentPage" :page-sizes="[5,10,20,30,50]" :page-size="pageSize" :total="totalCount" background layout="total, sizes" @size-change="handleSizeChange"/>
    </div>

    <table class="el-table list-table">
      <colgroup>
        <col style="width: 80px;">
        <col style="width: 130px;">
        <col >
        <col >
        <col style="width: 150px;">
        <col style="width: 180px;">
      </colgroup>
      <thead>
        <tr>
          <th>{{ $t('administrator.number') }}</th>
          <th>{{ $t('administrator.accountType') }}</th>
          <th>{{ $t('administrator.accountId') }}</th>
          <th>{{ $t('administrator.accountName') }}</th>
          <th>{{ $t('common.regId') }}</th>
          <th>{{ $t('common.regDate') }}</th>
        </tr>
      </thead>
      <tbody v-if="administratorList.length > 0">
        <tr v-for="(item, index) in administratorList" :key="item.key">
          <td>{{ totalCount - (pageSize * (currentPage - 1)) - index }}</td>
          <td>
            <span v-for="role in item.roles" :key="role.key" style="display: block" v-html="$options.filters.accountTypeFilter(role)"/>
          </td>
          <td class="text-left"><router-link :to="'/administrator/modify/' + item.accountId" tag="a">{{ item.accountId }}</router-link></td>
          <td class="text-left">{{ item.accountName }}</td>
          <td>{{ item.regId }}</td>
          <td>{{ item.regDate }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="6" class="none-data">
            검색 결과가 없습니다.
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="administratorList.length > 0" class="pagination-container margin-b-10 margin-t-10 text-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalCount"
        :per-page="pageSize"
        aria-controls="my-table"
        size="sm"
        limit="10"
        align="center"
        @input="getAccountList(currentPage)"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import i18n from '@/lang'
// import cookie from '@/utils/cookie.js'

export default {
  name: 'AdministratorList',
  filters: {
    DefDateTimeFormat: function(value) {
      if (value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    accountTypeFilter(role) {
      const statusMap = {
        SYSTEM_ADMIN: '<span class="badge badge-secondary width-100p mb-1">' + i18n.t('administrator.role.systemAdmin') + '</span>',
        CONSULTANT: '<span class="badge badge-success width-100p mb-1">' + i18n.t('administrator.role.consultant') + '</span>',
        FARMER: '<span class="badge badge-primary width-100p mb-1">' + i18n.t('administrator.role.farmer') + '</span>'
      }
      return statusMap[role]
    },
    partnerNameFilter(partnerName) {
      if (partnerName) {
        return partnerName
      } else {
        return '<span class="text-danger">' + i18n.t('messages.partnerUnSet') + '</span>'
      }
    }
  },
  data() {
    return {
      // --------------------------------
      // table 관련
      listLoading: false,
      totalCount: 0,
      currentPage: 1,
      pageSize: 20,
      // --------------------------------
      showHeader: false,
      dialogVisible: false,
      searchQuery: {
        isPaging: 'Y',
        page: 1,
        pageSize: 10,
        keyword: '',
        accountType: '',
        enabled: ''
      },
      userAccountType: [
        { text: this.$t('administrator.role.systemAdmin'), value: 'SYSTEM_ADMIN' },
        { text: this.$t('administrator.role.consultant'), value: 'CONSULTANT' },
        { text: this.$t('administrator.role.farmer'), value: 'FARMER' }
      ],
      useStatus: [
        { text: this.$t('common.useStatus.Y'), value: 'Y' },
        { text: this.$t('common.useStatus.N'), value: 'N' }
      ],
      administratorList: []
    }
  },
  created() {
    this.init()
    // console.log(this.$t('navBar.authList.systemAdmin'))
  },
  methods: {
    init() {
      this.getUrl()
      this.getAccountList(this.searchQuery.page)
    },
    getRoleName() {
      return this.$t('navBar.authList.systemAdmin')
    },
    indexMethod(index) {
      return this.total - (index + (this.searchQuery.page * this.searchQuery.size))
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getAccountList(1)
    },
    getAccountList(page) {
      this.currentPage = page
      this.searchQuery.page = page
      this.searchQuery.pageSize = this.pageSize
      this.setUrl()
      this.$http.get('/accounts/list', {
        params: this.searchQuery
      }).then(result => {
        this.administratorList = result.data.accountList
        this.totalCount = result.data.totalCount
      }).catch(error => {
        console.log(error)
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    doRequest() {
      this.$router.push('/administrator/register')
    },
    setUrl() {
      const htmlHash =
        '#' + (this.searchQuery.page) +
        '#' + this.searchQuery.size +
        // 검색 조건
        '#' + this.searchQuery.keyword +
        '#' + this.searchQuery.accountType +
        '#' + this.searchQuery.enabled
      history.pushState(null, null, '/administrator/list' + htmlHash)
    },
    getUrl() {
      // console.log(this.searchQuery)
      const hashVals = document.location.hash.split('#')
      if (hashVals.length === 1) {
        this.searchQuery.page = 1
        this.searchQuery.size = 10
        // 검색 조건
        this.searchQuery.keyword = ''
        this.searchQuery.accountType = ''
        this.searchQuery.enabled = ''
      }
      if (hashVals.length === 6) {
        this.searchQuery.page = Number(hashVals[1])
        this.searchQuery.size = Number(hashVals[2])
        // 검색 조건
        this.searchQuery.keyword = decodeURI(hashVals[3])
        this.searchQuery.accountType = hashVals[4]
        this.searchQuery.enabled = hashVals[5]
      }
      this.currentPage = this.searchQuery.page
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
