<template>
  <div class="app-container register_detail">
    <b-card
      id="partnerInfo"
      no-body
      bg-variant="light"
      size="sm"
      class="margin-b-40"
    >
      <b-card-header>
        <h6>{{ $t('messages.useStoreManagerConfigReg') }}</h6>
      </b-card-header>
      <b-card-body>
        <!--<b-row>
          <b-col sm="12">
            <b-form-group
              label-cols="2"
              label-cols-lg="2"
              label-cols-md="3"
              label-size="sm"
              label="협력사"
              label-align-sm="right"
              label-for="input-sm">
              <b-form-select
                v-model="managerConfigData.partnerCode"
                size="sm"
                class="width-300"
              >
                <option :value="''">선택</option>
                <option v-for="partner in partners" :key="partner.key" :value="partner.partnerCode">[{{ partner.partnerCode }}] {{ partner.partnerName }}</option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>-->
        <b-row>
          <b-col sm="12">
            <b-form-group
              :label="$t('messages.authLevel')"
              label-cols="2"
              label-cols-lg="2"
              label-cols-md="3"
              label-size="sm"
              label-align-sm="right"
              label-for="input-sm"
            >
              <b-form-select
                v-model="managerConfigData.level"
                size="sm"
                class="width-200"
              >
                <option :value="''">{{ $t('common.select') }}</option>
                <option value="L1"> LEVEL1</option>
                <option value="L2"> LEVEL2</option>
                <option value="L3"> LEVEL3</option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="12" lg="6">
            <b-form-group
              :label="$t('messages.authLevelName')"
              label-cols="2"
              label-cols-lg="4"
              label-cols-md="3"
              label-size="sm"
              label-align-sm="right"
              label-for="input-sm"
            >
              <b-form-input
                :placeholder="$t('messages.placeholderLevelName')"
                v-model="managerConfigData.levelName"
                type="text"
                size="sm"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card-body>
      <b-card-footer class="text-right">
        <b-button variant="success" size="sm" @click="registerManagerConfig">
          <font-awesome-icon icon="plus"/> {{ $t('messages.useStoreManagerConfigReg') }}
        </b-button>
      </b-card-footer>
    </b-card>
    <label class="infoLabel">| {{ $t('messages.useStoreManagerConfig') }}</label>
    <table class="list-table margin-b-20">
      <colgroup>
        <col style="width: 100px;">
        <col style="width: 100px;">
        <col >
        <col style="width: 100px;">
        <col style="width: 100px;">
        <col style="width: 100px;">
        <col style="width: 100px;">
      </colgroup>
      <thead>
        <tr>
          <th>{{ $t('messages.managerId') }}</th>
          <th>{{ $t('messages.level') }}</th>
          <th>{{ $t('messages.managerGroupName') }}</th>
          <th>{{ $t('messages.partner') }}</th>
          <th>{{ $t('messages.brandCount') }}</th>
          <th>{{ $t('messages.useStoreCount') }}</th>
          <th>{{ $t('common.button.modify') }}</th>
        </tr>
      </thead>
      <tbody v-if="managerConfigList.length > 0">
        <tr v-for="(config, index) in managerConfigList" :key="index">
          <td v-html="config.managerId"/>
          <td v-html="$options.filters.levelFilter(config.level)"/>
          <td class="text-left" v-html="config.levelName"/>
          <td v-html="config.partnerCount"/>
          <td v-html="config.brandCount"/>
          <td v-html="config.storeCount"/>
          <td>
            <b-button variant="warning" size="xs" @click="goModify(config.managerId)"><font-awesome-icon icon="edit"/> {{ $t('common.button.modify') }}</b-button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="7" class="none-data">
            <span>
              <font-awesome-icon icon="store"/>
            </span>
            등록된 시설 관리자 설정 정보가 없습니다.
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
      @input="getManagerConfigs(currentPage)"
    />
  </div>
</template>
<script>
export default {
  name: 'ConfigList',
  filters: {
    levelFilter(level) {
      const statusMap = {
        L1: '<span class="badge badge-primary width-100p mb-1">LEVEL 1</span>',
        L2: '<span class="badge badge-success width-100p mb-1">LEVEL 2</span>',
        L3: '<span class="badge badge-danger width-100p mb-1">LEVEL 3</span>'
      }
      return statusMap[level]
    }
  },
  data() {
    return {
      managerConfigList: [],
      currentPage: 1,
      totalCount: 0,
      pageSize: 10,
      managerConfigData: {
        level: '',
        levelName: '',
        partnerCode: ''
      },
      partners: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getPartners()
      this.getManagerConfigs()
    },
    getManagerConfigs(page) {
      this.$http.get(
        '/manager/config',
        {
          params: {
            page: page,
            pageSize: this.pageSize,
            forAdmin: 'Y'
          }
        }
      ).then(response => {
        console.log(response)
        this.managerConfigList = response.data.managerConfigList
        this.totalCount = response.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },
    registerManagerConfig() {
      if (!this.managerConfigData.level) {
        this.$message({
          type: 'error',
          message: this.$t('messages.messageCheckAuthLevel')
        })
        return false
      }
      if (!this.managerConfigData.levelName) {
        this.$message({
          type: 'error',
          message: this.$t('messages.messageCheckLevelName')
        })
        return false
      }

      this.$http.post(
        '/manager',
        this.managerConfigData
      ).then(response => {
        console.log(response)
        this.getManagerConfigs(1)
      }).catch(error => {
        console.log(error)
      })
    },
    goModify(managerId) {
      console.log(managerId)
      this.$router.push('/store/manager/config/' + managerId)
    },
    getPartners() {
      this.$http.get(
        '/partner/role/STORE'
      ).then(response => {
        this.partners = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
