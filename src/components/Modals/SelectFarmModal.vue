<template>
  <b-modal
    id="modal-select-farm"
    :title="$t('Modal.SelectFarmModal.Title')"
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
          :label="$t('Modal.SelectFarmModal.FarmName')"
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
              @keydown.enter="getFarms(1)"
            />
            <b-input-group-append>
              <b-button variant="primary" size="sm" @click="getFarms(1)"><font-awesome-icon icon="search"/> {{ $t('common.button.search') }}</b-button>
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
            <col>
            <col>
            <col>
          </colgroup>
          <thead>
            <tr>
              <th>{{ $t('common.select') }}</th>
              <th>{{ $t('Modal.SelectFarmModal.FarmId') }}</th>
              <th>{{ $t('Modal.SelectFarmModal.FarmName') }}</th>
              <th>{{ $t('common.regDate') }}</th>
            </tr>
          </thead>
          <tbody v-if="farmList.length > 0">
            <tr v-for="(farm, index) in farmList" :key="index" :class="farm.checked ? 'disable-tr':''">
              <td class="text-center">
                <b-form-checkbox
                  v-if="!farm.checked"
                  :id="'farm-' + index"
                  :value="farm.farmId"
                  v-model="selectFarmIds"
                  name="selectFarmId"
                />
              </td>
              <td v-text="farm.farmId"/>
              <td class="text-left" v-text="farm.farmName"/>
              <!-- <td v-html="$options.filters.farmStatusFilter(farm.status)"/>-->
              <td v-text="farm.regDateTime"/>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4" class="none-data">
                <span>
                  <font-awesome-icon icon="exclamation-triangle"/>
                </span>
                {{ $t('Modal.SelectFarmModal.NoneDataSearch') }}
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
          @input="getFarms(currentPage)"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12" class="text-right">
        <b-button size="sm" variant="primary" @click="addFarm()">
          <font-awesome-icon icon="plus"/> {{ $t('common.button.add') }}
        </b-button>
        <b-button size="sm" variant="danger" @click="closeModal()">
          <font-awesome-icon icon="times"/> {{ $t('common.button.cancel') }}
        </b-button>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { Message } from 'element-ui'
import i18n from '@/lang'
import EventBus from '@/utils/eventBus'

export default {
  name: 'SelectStoreModal',
  filters: {
    farmStatusFilter(status) {
      const statusMap = {
        Y: '<span>' + i18n.t('Modal.SelectFarmModal.statusY') + '</span>',
        N: '<span>' + i18n.t('Modal.SelectFarmModal.statusN') + '</span>'
      }
      return statusMap[status]
    }
  },
  props: {
    accountId: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      keyword: '',
      farmList: [],
      selectFarmIds: [],
      search: {
        isPaging: 'Y',
        page: 0,
        size: 10,
        cropsTypeCode: 'C0002',
        regDate: '',
        regId: ''
      },
      addFarmData: {
        productId: this.productId,
        partnerCode: this.partnerCode,
        useable: this.useable,
        farmIds: []
      }
    }
  },
  created() {
    EventBus.$on('checked-list-change', (list) => {
      this.getFarms(1)
    })
  },
  methods: {
    getFarms(page) {
      this.search.page = page
      if (this.brandId) {
        this.search.brandId = this.brandId
      }
      console.log(this.search)
      this.$http.get(
        'farm',
        {
          params: this.search
        }
      ).then(response => {
        console.log(response)
        if (response.status === 200) {
          this.farmList = response.data.farmList
          this.totalCount = response.data.totalCount
          // this.checkedRegisterData()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addFarm() {
      console.log('addFarm', this.selectFarmIds)
      this.addFarmData.farmIds = this.selectFarmIds

      console.log(this.addFarmData)
      if (this.selectFarmIds.length < 1) {
        Message({
          message: this.$t('messages.messageCheckUseStore'),
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      this.addFarmToAccount()
    },
    addFarmToAccount() {
      this.addFarmData.useable = this.useable
      this.$http.post(
        'accounts/' + this.accountId + '/farm',
        this.addFarmData
      ).then(response => {
        console.log(response)
        this.$store.dispatch('reloadInit', new Date())
        Message({
          message: this.$t('Modal.SelectFarmModal.messages.addFarm'),
          type: 'success',
          duration: 5 * 1000
        })
        this.closeModal()
      }).catch(error => {
        console.log(error)
      })
    },
    closeModal() {
      this.selectFarmIds = []
      this.$bvModal.hide('modal-select-farm')
    },
    checkedRegisterData() {
      console.log('set checked data')
      // if (this.checkedStoreList.length > 0) {
      //   this.storeList.forEach(store => {
      //     this.checkedStoreList.forEach(checkedStore => {
      //       if (store.storeId === checkedStore.storeId) {
      //         console.log(store.storeId === checkedStore.storeId)
      //         store.checked = true
      //       }
      //     })
      //   })
      // }
    }
  }
}
</script>

<style scoped>

.disable-tr > td {
  background-color: #fafafa;
  color: #b9bcc4 !important;
}

</style>
