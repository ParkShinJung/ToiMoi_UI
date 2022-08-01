<template>
  <b-modal
    id="change-password"
    :title="$t('popup.changePassword.title')"
    size="lg"
    header-bg-variant="primary"
    header-text-variant="light"
    footer-bg-variant="light"
    footer-text-variant="light"
    hide-footer
    scrollable
    ok-only
  >
    <div>
      <b-card
        id="productInfo"
        no-body
        bg-variant="light"
        size="sm"
      >
        <b-card-body>
          <b-card-title class="font-weight-bold">{{ $t('popup.changePassword.description1') }}</b-card-title>
          <b-card-title class="margin-b-40 font-weight-bold">{{ $t('popup.changePassword.description2') }}.</b-card-title>
          <b-form-group
            :label="$t('popup.changePassword.newPassword')"
            :description="$t('popup.changePassword.checkPassword')"
            label-cols="3"
            label-cols-lg="2"
            label-cols-md="3"
            label-size="sm"
            label-align-sm="right"
            label-for="input-sm"
          >
            <b-form-input
              v-model="administrator.accountPassword"
              :state="checkPassword(administrator.accountPassword)"
              type="password"
              size="sm"
              style="min-width: 300px"
            />
            <div v-if="requestSubmit">
              <div
                v-if="!administrator.accountPassword"
                class="validation-text"
              >
                {{ $t('administrator.validation.blankPassword') }}
              </div>
              <div
                v-else-if="!checkPassword(administrator.accountPassword)"
                class="validation-text"
              >
                {{ $t('administrator.validation.checkMixPassword') }}
              </div>
            </div>
          </b-form-group>
          <b-form-group
            :label="$t('popup.changePassword.confirmPassword')"
            :description="$t('popup.changePassword.checkPassword')"
            label-cols="3"
            label-cols-lg="2"
            label-cols-md="3"
            label-size="sm"
            label-align-sm="right"
            label-for="input-sm"
          >
            <b-form-input
              v-model="administrator.accountPasswordConfirm"
              :state="checkPasswordConfirm()"
              type="password"
              size="sm"
              style="min-width: 300px"
            />
            <div v-if="requestSubmit">
              <div
                v-if="!administrator.accountPassword"
                class="validation-text"
              >
                {{ $t('administrator.validation.blankPassword') }}
              </div>
              <div
                v-else-if="!administrator.accountPasswordConfirm"
                class="validation-text"
              >
                {{ $t('administrator.validation.blankMatchPassword') }}
              </div>
              <div
                v-else-if="administrator.accountPassword !== administrator.accountPasswordConfirm"
                class="validation-text"
              >
                {{ $t('administrator.validation.matchPassword') }}
              </div>
            </div>
          </b-form-group>
        </b-card-body>
        <b-card-footer class="text-right">
          <b-button
            variant="primary"
            @click="confirmPassword"
          >
            {{ $t('common.button.confirm') }}
          </b-button>
        </b-card-footer>
      </b-card>
    </div>
  </b-modal>

</template>

<script>
import { modifyAccountFirstPassword } from '@/api/account'

export default {
  name: 'ChangePassword',
  props: {
    accountId: {
      type: String,
      default: ''
    }
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error(this.$t('administrator.validation.blankPassword')))
      } else if (value.length < 8) {
        callback(new Error(this.$t('administrator.validation.lengthPassword')))
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
      administrator: {
        accountId: '',
        accountPassword: '',
        accountPasswordConfirm: ''
      },
      rules: {
        accountPassword: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        accountPasswordConfirm: [
          { required: true, trigger: 'blur', validator: validateConfirmPass }
        ]
      },
      requestSubmit: false
    }
  },
  methods: {
    checkPassword(pwd) {
      if (!this.requestSubmit) {
        return null
      }
      const passwordPatten = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      let result = false
      if (passwordPatten.test(pwd)) {
        result = true
      }
      return result
    },
    checkPasswordConfirm() {
      if (!this.requestSubmit) {
        return null
      }
      if (this.administrator.accountPassword.length === 0) {
        return false
      }
      if (!this.checkPassword(this.administrator.accountPassword)) {
        return false
      }
      return this.administrator.accountPassword === this.administrator.accountPasswordConfirm
    },
    confirmPassword() {
      this.requestSubmit = true
      if (!this.checkPassword(this.administrator.accountPassword)) {
        return false
      } else if (this.administrator.accountPassword !== this.administrator.accountPasswordConfirm) {
        return false
      }
      this.administrator.accountId = this.accountId
      modifyAccountFirstPassword(this.administrator).then(response => {
        if (response.status === 201) {
          this.$message({
            type: 'success',
            message: this.$t('popup.changePassword.completeChangePassword')
          })
          this.$bvModal.hide('change-password')
        } else {
          this.$message({
            type: 'error',
            message: this.$t('popup.changePassword.errorChangePassword')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .validation-text {
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
  }
</style>
