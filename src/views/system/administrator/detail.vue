<template>
  <div class="app-container">
    <label class="infoLabel">| {{ $t('Admin.Account.ModifyInfo') }}</label>
    <b-card
      id="mypage"
      no-body
      bg-variant="light"
      size="sm"
      class="margin-b-40"
    >
      <b-card-body>
        <b-form-group
          :invalid-feedback="invalidFeedback(administrator.number, '계정명을 입력해주세요.')"
          :label="$t('administrator.number')"
          label-cols="3"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm">
          <b-form-input
            v-model="administrator.number"
            :state="checkValid(administrator.number)"
            type="text"
            size="sm"
            class="width-350"
            disabled
          />
        </b-form-group>
        <b-form-group
          :invalid-feedback="invalidFeedback(administrator.accountName, '계정명을 입력해주세요.')"
          :label="$t('administrator.accountName')"
          label-cols="3"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm">
          <b-form-input
            v-model="administrator.accountName"
            :state="checkValid(administrator.accountName)"
            type="text"
            size="sm"
            class="width-350"
            disabled
          />
        </b-form-group>
        <b-form-group
          :label="$t('Admin.Account.AccountId')"
          label-cols="3"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm"
        >
          <b-form-input
            v-model="administrator.accountId"
            type="text"
            size="sm"
            class="width-350"
            disabled
          />
          <div>
            <b-button size="xs" variant="danger" class="float-left mt-3" @click="resetPassword">{{ $t('Admin.Account.resetPassword') }}</b-button>
          </div>
        </b-form-group>
        <b-form-group
          :invalid-feedback="invalidFeedback(administrator.contact, '전화번호를 입력해주세요.')"
          :label="$t('Admin.Account.TelNo')"
          label-cols="3"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm">
          <b-form-input
            v-model="administrator.contact"
            :state="checkValid(administrator.contact)"
            type="text"
            size="sm"
            class="width-350"
          />
        </b-form-group>
        <b-form-group
          label="수정내용*"
          label-cols="3"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm">
          <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="수정한 내용을 적으세요."
            rows="3"
            max-rows="6"
            class="width-350"
          />
        </b-form-group>

        <b-form-group
          label="수정이력"
          label-cols="3"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm"
          class="mt-4">
          <div class="wrapper">
            <div class="tableBox">
              <table class="tableData" align="left">
                <colgroup>
                  <col style="width: 30%;">
                  <col>
                  <col style="width: 40%;">
                </colgroup>
                <thead>
                  <tr>
                    <th>수정일</th>
                    <th>수정자</th>
                    <th>수정내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-center">
                      2022-01-05
                    </td>
                    <td>Anny young</td>
                    <td>비밀번호 수정함</td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      2022-01-01
                    </td>
                    <td>admin01</td>
                    <td>[System] 등록</td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      2022-01-02
                    </td>
                    <td>Jeny park</td>
                    <td>비밀번호 초기화함</td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      2022-01-05
                    </td>
                    <td>Anny young</td>
                    <td>비밀번호 수정함</td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      2022-01-05
                    </td>
                    <td>admin</td>
                    <td>재배작물 변경</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-form-group>
      </b-card-body>
    </b-card>
    <b-row>
      <b-col >
        <b-button variant="success" size="sm" class="float-right" @click="registerData"><font-awesome-icon icon="check"/> {{ $t('Admin.Account.ModifyInfo') }} {{ $t('common.button.modify') }}</b-button>
      </b-col>
    </b-row>
    <label class="infoLabel">| {{ $t('Admin.Account.FarmList') }}</label>
    <b-card
      id="farmList"
      no-body
      bg-variant="light"
      size="sm"
      class="margin-b-40"
    >
      <b-card-body>
        <b-row>
          <b-col sm="12" md="12" lg="12">
            <b-button size="sm" variant="primary" class="float-right mb-2" @click="callModal('modal-select-farm')">
              <font-awesome-icon icon="plus"/> {{ $t('Admin.Account.AddFarm') }}
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="12" lg="12">
            <table class="el-table list-table">
              <colgroup>
                <col style="width: 80px;">
                <col style="width: 300px;">
                <col>
                <col style="width: 100px;">
              </colgroup>
              <thead>
                <tr>
                  <th>No</th>
                  <th>{{ $t('Admin.Account.FarmCode') }}</th>
                  <th>{{ $t('Admin.Account.FarmName') }}</th>
                  <th>{{ $t('Admin.Account.FarmDelete') }}</th>
                </tr>
              </thead>
              <tbody v-if="farmList.length > 0">
                <tr v-for="(farm, index) in farmList" :key="index">
                  <td class="text-center" v-html="farmList.length - index"/>
                  <td v-html="farm.farmId"/>
                  <td class="text-left" v-html="farm.farmName"/>
                  <td>
                    <b-button variant="danger" size="xm" style="padding: 2px; width: 50px; font-size: 12px;" @click="removeFarm(farm.farmId)">
                      {{ $t('common.button.del') }}
                    </b-button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td class="none-data" colspan="4">
                    {{ $t('Admin.Account.NoneFarm') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-row>
      <b-col>
        <b-button variant="primary" size="sm" @click="goList"><font-awesome-icon icon="list"/> {{ $t('common.button.list') }}</b-button>
      </b-col>
    </b-row>
    <SelectFarmModal :account-id="accountId"/>
  </div>
</template>

<script>
import SelectFarmModal from '@/components/Modals/SelectFarmModal'
import cookie from '@/utils/cookie'
import i18n from '@/lang'
import { deleteFarmOfUser } from '../../../api/account'

export default {
  name: 'AdministratorModify',
  filters: {
    manaberLevelFilter: function(level) {
      const statusMap = {
        L1: i18n.t('messages.level1'),
        L2: i18n.t('messages.level2'),
        L3: i18n.t('messages.level3')
      }
      return statusMap[level]
    }
  },
  components: {
    SelectFarmModal
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value) {
        if (value.length < 8) {
          callback(new Error(this.$t('Admin.Account.ModifyInfo.Validation.CheckMixPassword')))
        } else if (!this.checkPassword(value)) {
          callback(new Error(this.$t('Admin.Account.ModifyInfo.Validation.CheckPassword')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateConfirmPass = (rule, value, callback) => {
      if (value) {
        if (this.administrator.accountPassword !== value) {
          callback(new Error(this.$t('Admin.Account.Validation.MatchPassword')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      text: '',
      requestSubmit: false,
      farmList: [],
      allowRoles: [],
      accountId: this.$route.params.accountId,
      managerLevelIndex: '',
      administrator: {
        roles: [],
        farms: []
      },
      authRules: {
        accountType: [
          { required: true, message: this.$t('Admin.Account.Validation.AccountType'), trigger: 'change' }
        ]
      },
      partner: {},
      rules: {
        accountName: [
          { required: true, message: this.$t('Admin.Account.Validation.AccountName'), trigger: 'blur' }
        ],
        accountPassword: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        accountPasswordConfirm: [
          { required: true, trigger: 'blur', validator: validateConfirmPass }
        ]
      },
      selectAccountType: [
        { label: this.$t('navBar.authList.systemAdmin'), value: 'SYSTEM_ADMIN' },
        { label: this.$t('navBar.authList.agencyAdmin'), value: 'AGENCY_ADMIN' },
        { label: this.$t('navBar.authList.agencyOperator'), value: 'AGENCY_OPERATOR' },
        { label: this.$t('navBar.authList.supplierAdmin'), value: 'SUPPLIER_ADMIN' },
        { label: this.$t('navBar.authList.brandAdmin'), value: 'BRAND_ADMIN' },
        { label: this.$t('navBar.authList.storeAdmin'), value: 'STORE_ADMIN' }
      ],
      defaultSearchQuery: {
        isPaging: 'N',
        page: 0,
        size: 100,
        status: 'Y',
        userAuth: cookie.getCookie('userAuth'),
        agencyId: cookie.getCookie('agencyId'),
        supplierId: cookie.getCookie('supplierId'),
        brandId: cookie.getCookie('brandId'),
        storeId: cookie.getCookie('storeId')
      },
      addFarmList: [],
      selectStoreIndex: 1000,
      selectStore: '',
      selectBrandId: '',
      agencyCheck: false
    }
  },
  computed: {
    reloadInit() {
      return this.$store.getters.reload
    },
    isValidCheck() {
      return !this.isValid(this.registerAdministratorValidation)
    },
    registerAdministratorValidation() {
      return {
        accountRoles: !(this.administrator.roles.length > 0),
        accountId: !this.administrator.accountId,
        accountName: !this.administrator.accountName,
        contact: !this.administrator.contact
      }
    }
  },
  watch: {
    reloadInit() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getAccountInfo()
    },
    getAccountInfo() {
      this.$http.get(
        '/accounts/' + this.accountId
      ).then(response => {
        console.log('account info', response.data)
        this.administrator = response.data
        console.log(this.administrator)
        this.farmList = this.administrator.farms
        this.administrator.enabled = response.data.enabled === true ? 'true' : 'false'
      })
    },
    checkPassword(pwd) {
      const passwordPatten = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      let result = false
      if (passwordPatten.test(pwd)) {
        result = true
      }
      return result
    },
    goList() {
      this.$router.push('/administrator/list')
    },
    registerData() {
      this.requestSubmit = true
      if (!this.isValid(this.registerAdministratorValidation)) {
        console.log('need validation')
        return false
      }
      this.$confirm(this.$t('Admin.Account.ModifyConfirm'), this.$t('Admin.Account.ModifyConfirmTitle'), {
        confirmButtonText: this.$t('common.message.YES'),
        cancelButtonText: this.$t('common.message.NO'),
        type: 'info'
      }).then(() => {
        // 수정할 정보 데이터 가공
        const modifyAcocountInfo = {
          accountId: this.administrator.accountId,
          accountName: this.administrator.accountName,
          contact: this.administrator.contact,
          enabled: this.administrator.enabled,
          brandId: this.selectBrandId,
          storeIdList: [],
          roles: this.administrator.roles
        }
        if (this.administrator.storeList) {
          this.administrator.storeList.forEach((store) => {
            modifyAcocountInfo.storeIdList.push(store.storeId)
          })
        }
        // 계정 수정
        this.$http.put(
          '/accounts/' + this.accountId,
          modifyAcocountInfo
        ).then((result) => {
          if (result.status === 201) {
            this.$message({
              type: 'success',
              message: this.$t('messages.messageModifyAccountInfo')
            })
          }
        }).catch(error => {
          console.log(error)
          this.$message({
            type: 'error',
            message: error.response.data.message
          })
        })
      })
    },
    addFarm() {
      this.addStoreList.push(this.useStoreList[this.selectStoreIndex])
      // this.addStoreList.push(this.selectStore)
      console.log(this.addStoreList)
    },
    delFarm(index) {
      this.addStoreList.splice(index, 1)
    },
    callModal(modalId) {
      this.$bvModal.show(modalId)
    },
    invalidFeedback(val, invalidMsg) {
      if (this.checkValid(val) === false) {
        return invalidMsg
      } else {
        return ''
      }
    },
    checkValid(val) {
      if (!this.requestSubmit) {
        return null
      }
      return val.trim() !== ''
    },
    isValid(validationFunc) {
      const validation = validationFunc
      let valid = true
      Object.keys(validation).forEach((key) => {
        if (validation[key]) {
          valid = false
          return false
        }
      })
      return valid
    },
    resetPassword() {
      this.$confirm(this.$t('Admin.Account.ResetPassword'), this.$t('Admin.Account.ResetPasswordTitle'), {
        confirmButtonText: this.$t('common.message.YES'),
        cancelButtonText: this.$t('common.message.NO'),
        type: 'info'
      }).then(() => {
        this.$http.put(
          'accounts/reset/password/' + this.administrator.accountId
        ).then(() => {
          this.$alert(this.$t('messages.messagesCompleteResetFourPassword'))
          console.log('reset password')
        })
      }).catch(() => {
      })
    },
    async removeFarm(farmId) {
      const response = await deleteFarmOfUser(this.accountId, farmId)
      if (response.status === 204) {
        this.getAccountInfo()
      }
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrapper .tableBox{
  height: 20vh;
  width: 60vh;
  overflow-y: scroll;
  font-size: 14px;
  color: #606266;
  background-color: white
}
.tableData{
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.tableData thead tr th{
  position: sticky;
  top: 0;
  background: #c28140;
  color: white;
  height: 30px;
  font-size: small}
.tableData tbody tr td{
  font-size: small;
  padding: 8px 15px;
  box-sizing: border-box;
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  word-break: break-all;
}
</style>
