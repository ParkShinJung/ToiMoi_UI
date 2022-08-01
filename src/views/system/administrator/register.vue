<template>
  <div class="app-container">
    <label class="infoLabel">| {{ $t('administrator.registerInfo') }}</label>
    <b-card
      id="accountRegister"
      no-body
      bg-variant="light"
      size="sm"
      class="margin-b-40"
    >
      <b-card-body>
        <b-form-group
          :invalid-feedback="invalidFeedback(administrator.accountName, $t('administrator.validation.accountName'))"
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
          />
        </b-form-group>
        <b-form-group
          :invalid-feedback="invalidFeedback(administrator.accountId, $t('administrator.validation.blankAccountId'))"
          :label="$t('administrator.accountId')"
          label-cols="3"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm">
          <b-input-group>
            <form autocomplete="off">
              <b-form-input
                v-model="administrator.accountId"
                :state="checkValid(administrator.accountId)"
                class="display-inline width-350"
                type="text"
                size="sm"
              />
            </form>
            <b-button class="display-inline" size="sm" text="Button" variant="primary" @click="checkAccountId">
              {{ $t('administrator.duplicateAccountId') }}
            </b-button>
          </b-input-group>
          <b-form-invalid-feedback
            v-if="requestSubmit"
            :state="checkValid(isDuplicated)"
            class="text-left"
          >
            {{ $t('administrator.validation.checkDupAccountId') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          :label="$t('common.useYN')"
          label-cols="3"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm">
          <b-form-radio-group
            v-model="administrator.enabled"
            name="partnerStatus"
            size="sm"
            button-variant="outline-primary"
            class="btn1"
            buttons
          >
            <b-form-radio value="true">{{ $t('common.useStatus.Y') }}</b-form-radio>
            <b-form-radio value="false">{{ $t('common.useStatus.N') }}</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group
          :label="$t('administrator.accountRoles')"
          label-cols="3"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm">
          <b-form-checkbox-group
            v-model="administrator.roles"
            :options="roleOptions"
            button-variant="outline-primary"
            size="sm"
            buttons
          />
          <b-form-checkbox
            v-if="allowRoles.length > 0 && (requestSubmit && administrator.roles.length < 1)"
            class="padding-5"
            style="font-size: 80%; margin-top: 0.25rem">
            {{ $t('messages.validAccountRoles') }}
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          :invalid-feedback="invalidFeedback(administrator.accountPassword, $t('administrator.validation.blankPassword'))"
          :label="$t('administrator.password')"
          label-cols="3"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm">
          <form autocomplete="current-password">
            <b-form-input
              id="password"
              v-model="administrator.accountPassword"
              :state="checkValid(administrator.accountPassword)"
              name="password"
              type="password"
              size="sm"
              class="width-350"
              @change="check()"
            />
          </form>
        </b-form-group>

        <b-form-group
          :invalid-feedback="invalidFeedback(administrator.accountPasswordConfirm, $t('administrator.validation.blankMatchPassword'))"
          :label="$t('administrator.confirmPassword')"
          label-cols="3"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm">
          <form autocomplete="off">
            <b-form-input
              id="confirm_password"
              v-model="administrator.accountPasswordConfirm"
              :state="checkValid(administrator.accountPasswordConfirm)"
              name="confirm_password"
              type="password"
              size="sm"
              class="width-350"
              @change="check()"
            />
          </form>
          <span id="message"/>
        </b-form-group>

        <b-form-group
          :invalid-feedback="invalidFeedback(administrator.contact, $t('administrator.validation.contact'))"
          :label="$t('administrator.telNo')"
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
        <div align="center" class="mt-4">
          <b-button size="md" variant="primary" @click="goList">
            <font-awesome-icon icon="list"/>
            {{ $t('common.button.list') }}
          </b-button>
          <b-button size="md" variant="success" @click="registerData">
            <font-awesome-icon icon="plus"/>
            {{ $t('common.button.register') }}
          </b-button>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { registerAccount } from '@/api/account'
// import { getAgencySearchList } from '@/api/agency'
import cookie from '@/utils/cookie'

export default {
  name: 'AdministratorRegister',
  components: {},
  data() {
    const validateId = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error(this.$t('administrator.validation.blankAccountId')))
      } else if (value.length < 4) {
        callback(new Error(this.$t('administrator.validation.lengthAccountId')))
      } else if (this.isDuplicated === '') {
        callback(new Error(this.$t('administrator.validation.checkDupAccountId')))
      } else if (this.isDuplicated === 'Y') {
        callback(new Error(this.$t('administrator.validation.alreadyAccountId')))
      } else {
        this.isDuplicated = 'N'
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error(this.$t('administrator.validation.blankPassword')))
      } else if (value.length < 8) {
        callback(new Error(this.$t('administrator.validation.checkMixPassword')))
      } else if (!this.checkPassword(value)) {
        callback(new Error(this.$t('administrator.validation.checkPassword')))
      } else {
        callback()
      }
    }
    const validateConfirmPass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error(this.$t('administrator.validation.blankMatchPassword')))
      } else if (this.administrator.accountPassword !== value) {
        callback(new Error(this.$t('administrator.validation.matchPassword')))
      } else {
        callback()
      }
    }
    return {
      roleOptions: [
        { text: this.$t('administrator.role.systemAdmin'), value: 'SYSTEM_ADMIN' },
        { text: this.$t('administrator.role.consultant'), value: 'CONSULTANT' },
        { text: this.$t('administrator.role.farmer'), value: 'FARMER' }
      ],
      requestSubmit: false,
      agencyList: [],
      supplierList: [],
      brandList: [],
      useStoreList: [],
      allowRoles: [],
      accountInfo: {},
      isDuplicated: '',
      administrator: {
        accountId: '',
        accountName: '',
        accountType: 'SYSTEM_ADMIN',
        accountPassword: '',
        accountPasswordConfirm: '',
        connectionInfo: '',
        contact: '',
        enabled: true,
        agencyId: '',
        brandId: '',
        supplierId: '',
        storeId: '',
        langType: this.$i18n.locale,
        roles: [],
        regId: cookie.getCookie('userId'),
        modId: cookie.getCookie('userId')
      },
      authRules: {
        accountType: [
          { required: true, message: this.$t('administrator.validation.accountType'), trigger: 'change' }
        ]
      },
      rules: {
        accountId: [
          { required: true, trigger: 'blur', validator: validateId }
        ],
        accountName: [
          { required: true, message: this.$t('administrator.validation.accountName'), trigger: 'blur' }
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
        userAuth: cookie.getCookie('userAuth')
      }
    }
  },
  computed: {
    roleCheckState() {
      return this.administrator.roles.length > 0
    },
    isValidCheck() {
      return !this.isValid(this.registerAdministratorValidation)
    },
    registerAdministratorValidation() {
      return {
        // accountRoles: !(this.administrator.roles.length > 0),
        accountId: !this.administrator.accountId,
        // partnerCode: !this.administrator.partnerCode,
        accountName: !this.administrator.accountName,
        accountPassword: !this.administrator.accountPassword,
        accountPasswordConfirm: !this.administrator.accountPasswordConfirm,
        contact: !this.administrator.contact,
        // agencyAdmin: (this.administrator.accountType === 'AGENCY_ADMIN' || this.administrator.accountType === 'AGENCY_OPERATOR' || this.administrator.accountType === 'SUPPLIER_ADMIN') && this.administrator.agencyId === '',
        // supplierAdmin: this.administrator.accountType === 'SUPPLIER_ADMIN' && this.administrator.supplierId === '',
        // brandAdmin: (this.administrator.accountType === 'BRAND_ADMIN' || this.administrator.accountType === 'STORE_ADMIN') && this.administrator.brandId === '',
        // storeAdmin: this.administrator.accountType === 'STORE_ADMIN' && this.administrator.storeId === '',
        idCheck: !(this.isDuplicated === 'N')
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
    },
    checkAccountId() {
      const checkEng = /[a-zA-Z]/
      const checkSpc = /[~!@#$%^&*()+=|<>?:;`,.{}\][/'"\\']/
      if (this.administrator.accountId === '') {
        this.$message({
          type: 'error',
          message: this.$t('administrator.message.blankAccountId')
        })
        return false
      } else if (this.administrator.accountId.length < 4) {
        this.$message({
          type: 'error',
          message: this.$t('administrator.validation.lengthAccountId')
        })
        return false
      } else if ((!checkEng.test(this.administrator.accountId))) {
        this.$message({
          type: 'error',
          message: this.$t('administrator.validation.checkAccountId')
        })
        return false
      } else if (checkSpc.test(this.administrator.accountId)) {
        this.$message({
          type: 'error',
          message: this.$t('administrator.validation.checkAccountId')
        })
        return false
      } else {
        this.$http.get('accounts/check/id/' + this.administrator.accountId).then((response) => {
          this.accountInfo = response.data
          if (response.data.isExisted === 'Y') {
            this.isDuplicated = 'Y'
            this.$message({
              type: 'error',
              message: this.$t('Admin.Account.Validation.alreadyAccountId')
            })
          } else {
            this.isDuplicated = 'N'
            this.$message({
              type: 'success',
              message: this.$t('Admin.Account.Validation.possibleAccountId')
            })
          }
        })
      }
      // this.$refs.accountId.focus()
    },
    renewalInputId() {
      this.isDuplicated = ''
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
      this.administrator.langType = this.$i18n.locale
      this.administrator.accountType = 'SYSTEM_ADMIN'
      if (!this.isValid(this.registerAdministratorValidation)) {
        console.log('need validation')
        return false
      } else {
        if (this.administrator.accountPassword !== this.administrator.accountPasswordConfirm) {
          this.$message.error(this.$t('administrator.validation.notEqualPwd'))
          return false
        }
        this.$confirm(this.$t('common.message.confirmMessage'), this.$t('common.message.registerMessage'), {
          confirmButtonText: this.$t('common.message.YES'),
          cancelButtonText: this.$t('common.message.NO'),
          type: 'info'
        }).then(() => {
          registerAccount(this.administrator).then(response => {
            if (response.status === 201) {
              this.$message({
                type: 'info',
                message: this.$t('common.message.completeRegistration')
              })
              this.goList()
            }
          })
        }).catch(() => {
        })
      }
    },
    check() {
      if (document.getElementById('password').value === document.getElementById('confirm_password').value) {
        document.getElementById('message').style.color = 'green'
        document.getElementById('message').innerHTML = '비밀번호가 일치합니다.'
      } else {
        document.getElementById('message').style.color = 'red'
        document.getElementById('message').innerHTML = '비밀번호가 일치하지 않습니다.'
      }
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
      if (val.trim() !== '') {
        return true
      } else {
        return false
      }
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
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.active {
  color: white !important;
  background-color: #964B00 !important;
}

.b-form-checkbox.active {
  background-color: #ffffff !important;
}

.label.btn.btn-outline-primary.btn-sm.active {
  background-color: #F9F9F9 !important;
}

.btn-outline-primary.active {
  color: #ffffff !important;
}

.btn-outline-primary2 {
  color: #964B00 !important;
  border-color: #964B00 !important;

  &:focus,
  &:hover {
    color: #fff !important;
    background-color: #783c00 !important;
    border-color: #783c00 !important;
  }
  &:active {
    color: #fff !important;
    background-color: #783c00 !important;
    border-color: #783c00 !important;
  }
  &:after {
    color: #fff !important;
    background-color: #783c00 !important;
    border-color: #783c00 !important;
  }
}
.btn-outline-primary.b-form-checkbox.active {
  background-color: #783c00;
}
.btn22 {
  .active {
    background-color: #783c00 !important;
  }
  font-size: x-large;
}
.btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .show > .btn-outline-primary.dropdown-toggle {
  color: #fff;
  background-color: #783c00;
  border-color: #783c00;
}
</style>
