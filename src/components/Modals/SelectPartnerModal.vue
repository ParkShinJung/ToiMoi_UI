<template>
  <b-modal
    id="modal-select-partner"
    :title="$t('route.partnerRegister')"
    size="lg"
    header-bg-variant="primary"
    header-text-variant="light"
    footer-bg-variant="primary"
    footer-text-variant="light"
    scrollable
    hide-footer
  >
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-form-group
          :label="$t('messages.partnerName')"
          label-cols="2"
          label-cols-lg="2"
          label-cols-md="3"
          label-size="sm"
          label-align-sm="right"
          label-for="input-sm">
          <b-input-group>
            <b-form-input
              v-model="search.keyword"
              type="text"
              size="sm"
              @keydown.enter="getPartnerSearchList(1)"
            />
            <b-input-group-append>
              <b-button variant="primary" size="sm" @click="getPartnerSearchList(1)"><font-awesome-icon icon="search"/> {{ $t('messages.search') }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <table class="list-table mb-2">
          <colgroup>
            <col style="width: 50px;">
            <col style="width: 150px;">
            <col>
            <col style="width: 100px;">
          </colgroup>
          <thead>
            <tr>
              <th>{{ $t('common.select') }}</th>
              <th>{{ $t('brand.brandId') }}</th>
              <th>{{ $t('brand.brandName') }}</th>
              <th>{{ $t('brand.settlementTargetStatus') }}</th>
            </tr>
          </thead>
          <tbody v-if="partners.length > 0">
            <tr v-for="(partner, index) in partners" :key="index">
              <td class="text-center">
                <b-form-checkbox
                  :id="'partner-' + index"
                  :value="partner.partnerCode"
                  v-model="selectPartnerCodes"
                  name="selectBrandId"
                />
              </td>
              <td v-text="partner.partnerCode"/>
              <td class="text-left" v-text="partner.partnerName"/>
              <td >
                {{ partner.settlementUse | useFilter }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4" class="none-data">
                <span>
                  <font-awesome-icon icon="exclamation-triangle"/>
                </span>
                {{ $t('messages.noneDataSearch') }}
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
          align="center"
          @input="getPartnerSearchList(currentPage)"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12" class="text-right">
        <b-button size="sm" variant="primary" @click="addPartner()">
          <font-awesome-icon icon="plus"/> {{ $t('common.button.add') }}
        </b-button>
        <b-button size="sm" variant="danger" @click="closeModal()">
          <font-awesome-icon icon="times"/> {{ $t('messages.cancel') }}
        </b-button>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { Message } from 'element-ui'
// import { getBrandSearchList } from '@/api/brand'
import i18n from '../../lang'

export default {
  name: 'SelectPartnerModal',
  filters: {
    useFilter: function(status) {
      const statusMap = {
        Y: i18n.t('messages.settlementStatus.Y'),
        N: i18n.t('messages.settlementStatus.N')
      }
      return statusMap[status]
    }
  },
  props: {
    managerId: {
      type: String,
      default: '',
      required: false
    },
    accountId: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      selectedPartner: {},
      selectPartnerIndex: null,
      keyword: '',
      partners: [],
      selectPartnerCodes: [],
      listLoading: false,
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      search: {
        isPaging: 'Y',
        page: 0,
        size: 10,
        brandId: '',
        regDate: '',
        regId: '',
        settlementTargetStatus: '',
        brandClassification: ''
      },
      addPartnerData: {
        managerId: this.managerId,
        partnerCodes: [],
        partnerCode: ''
      }
    }
  },
  methods: {
    getPartnerSearchList(currentPage) {
      this.search.page = currentPage
      this.$http.get(
        '/partner',
        {
          params: this.search
        }
      ).then(response => {
        console.log(response)
        this.partners = response.data.partnerList
        this.totalCount = response.data.totalCount
      }).catch(error => {
        console.log(error)
      })
      // getBrandSearchList(this.search).then(response => {
      //   console.log(response)
      //   this.brands = response.data.content
      //   this.total = response.data.totalElements
      // })
    },
    addPartner() {
      this.addPartnerData.partnerCodes = this.selectPartnerCodes

      if (this.selectPartnerCodes.length < 1) {
        Message({
          message: this.$t('messages.messageCheckPartner'),
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }

      if (this.accountId && this.selectPartnerCodes.length > 1) {
        Message({
          message: this.$t('messages.messageCheckOnlyOnePartner'),
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }

      let endPoint = ''
      if (this.accountId) {
        endPoint = 'accounts/' + this.accountId + '/partner'
        this.addPartnerData.partnerCode = this.selectPartnerCodes[0]
      } else if (this.managerId) {
        endPoint = 'manager/' + this.managerId + '/partners'
      }
      this.$http.post(
        endPoint,
        this.addPartnerData
      ).then(response => {
        console.log(response)
        this.$store.dispatch('reloadInit', new Date())
        Message({
          message: this.$t('messages.messageAddPartner'),
          type: 'success',
          duration: 5 * 1000
        })
        this.closeModal()
      }).catch(error => {
        console.log(error)
      })
    },
    closeModal() {
      this.selectPartnerCodes = []
      this.$bvModal.hide('modal-select-partner')
    }
  }
}
</script>

<style scoped>

</style>
