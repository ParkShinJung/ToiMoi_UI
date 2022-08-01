<template>
  <div class="app-container dev_guide_index">
    <b-card
      no-body
      bg-variant="light"
      size="sm"
      class="margin-b-40"
    >
      <b-card-header>
        <h6>{{ $t('route.administrator_store_manager_config') }}</h6>
      </b-card-header>
      <b-card-body>
        <b-row>
          <b-col sm="12">
            <b-form-group
              :label="$t('messages.managerId')"
              label-cols="2"
              label-cols-lg="2"
              label-cols-md="3"
              label-size="sm"
              label-align-sm="right"
              label-for="input-sm"
            >
              <b-form-input
                :value="managerConfigData.managerId"
                size="sm"
                class="width-200"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
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
              <b-form-input
                :value="$options.filters.levelFilter(managerConfigData.level)"
                size="sm"
                class="width-200"
                readonly
              />
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
                v-model="managerConfigData.levelName"
                type="text"
                size="sm"
                placeholder="레벨 명을 입력해주세요."
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card-body>
      <b-card-footer class="text-right">
        <b-button variant="warning" size="sm" @click="updateConfig"><font-awesome-icon icon="check"/> {{ $t('messages.useStoreManagerConfigMod') }}</b-button>
      </b-card-footer>
    </b-card>

    <label class="infoLabel" for="partnerInfo">| {{ $t('messages.partnerInfo') }}</label>
    <b-card
      id="partnerInfo"
      no-body
      bg-variant="light"
      size="sm"
      class="margin-b-40">
      <b-card-body>
        <b-row>
          <b-col sm="12" md="12" lg="12">
            <b-button size="sm" variant="primary" class="float-right mb-2" @click="callModal('modal-select-partner')">
              <font-awesome-icon icon="plus"/> {{ $t('messages.addPartner') }}
            </b-button>
            <table class="list-table">
              <colgroup>
                <col style="width: 200px;">
                <col>
                <col style="width: 100px;">
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t('messages.partnerCode') }}</th>
                  <th>{{ $t('messages.partnerName') }}</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="managerConfigData.partners.length > 0">
                <tr v-for="(partner, index) in managerConfigData.partners" :key="index">
                  <td v-text="partner.partnerCode"/>
                  <td class="text-left" v-text="partner.partnerName"/>
                  <td>
                    <b-button variant="danger" size="xs" @click="delPartner(index)">
                      <font-awesome-icon icon="times"/> {{ $t('common.button.del') }}
                    </b-button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="none-data">
                    <span>
                      <font-awesome-icon icon="exclamation-triangle"/>
                    </span>
                    {{ $t('messages.noneDataManagerConfigPartner') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <label v-if="managerConfigData.level !== 'L1'" class="infoLabel" for="brandsInfo">| {{ $t('messages.brandInfo') }}</label>
    <b-card
      v-if="managerConfigData.level !== 'L1'"
      id="brandsInfo"
      no-body
      bg-variant="light"
      size="sm"
      class="margin-b-40">
      <b-card-body>
        <b-row>
          <b-col sm="12" md="12" lg="12">
            <b-button size="sm" variant="primary" class="float-right mb-2" @click="callModal('modal-select-brand')">
              <font-awesome-icon icon="plus"/> {{ $t('common.brand') }} {{ $t('common.button.add') }}
            </b-button>
            <table class="list-table">
              <colgroup>
                <col style="width: 200px;">
                <col>
                <col style="width: 100px;">
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t('brand.brandId') }}</th>
                  <th>{{ $t('brand.brandName') }}</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="managerConfigData.brands.length > 0">
                <tr v-for="(brand, index) in managerConfigData.brands" :key="index">
                  <td v-text="brand.brandId"/>
                  <td class="text-left" v-text="brand.brandName"/>
                  <td>
                    <b-button variant="danger" size="xs" @click="delBrand(index)">
                      <font-awesome-icon icon="times"/> {{ $t('common.button.del') }}
                    </b-button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="none-data">
                    <span>
                      <font-awesome-icon icon="exclamation-triangle"/>
                    </span>
                    {{ $t('messages.noneDataManagerConfigBrand') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <label v-if="managerConfigData.level !== 'L1'" class="infoLabel">| {{ $t('messages.useStoreInfo') }}</label>
    <b-card
      v-if="managerConfigData.level !== 'L1'"
      id="storeInfo"
      no-body
      bg-variant="light"
      size="sm"
      class="margin-b-40"
    >
      <b-card-body>
        <b-row>
          <b-col sm="12" md="12" lg="12">
            <b-button size="sm" variant="primary" class="float-right mb-2" @click="callModal('modal-select-store')">
              <font-awesome-icon icon="plus"/> {{ $t('common.useStore') }} {{ $t('common.button.add') }}
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="12" lg="12">
            <table class="el-table list-table">
              <colgroup>
                <col style="width: 300px;">
                <col style="width: 200px;">
                <col>
                <col style="width: 100px;">
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t('useStore.storeName') }}</th>
                  <th>{{ $t('useStore.contact') }}</th>
                  <th>{{ $t('useStore.address') }}</th>
                  <th>{{ $t('common.button.del') }}</th>
                </tr>
              </thead>
              <tbody v-if="managerConfigData.stores.length > 0">
                <tr v-for="(store, index) in managerConfigData.stores" :key="index">
                  <td class="text-left" v-html="store.storeName"/>
                  <td v-html="store.contact"/>
                  <td class="text-left" v-html="store.address"/>
                  <td>
                    <b-button variant="danger" size="xm" style="padding: 2px; width: 50px; font-size: 12px;" @click="delStore(index)">삭제</b-button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td class="none-data" colspan="4">
                    <span>
                      <font-awesome-icon icon="exclamation-triangle"/>
                    </span>
                    {{ $t('messages.noneDataManagerConfigUseStore') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-row>
      <b-col >
        <b-button variant="secondary" size="sm" @click="goList">
          <font-awesome-icon icon="list"/> {{ $t('common.button.list') }}
        </b-button>
      </b-col>
    </b-row>
    <SelectPartnerModal :manager-id="managerId"/>
    <SelectBrandModal :manager-id="managerId"/>
    <SelectStoreModal :brand-list="brandList" :manager-id="managerId" :checked-store-list="managerConfigData.stores" />
  </div>
</template>

<script>
import SelectStoreModal from '@/components/modals/SelectStoreModal'
import SelectBrandModal from '../../../components/modals/SelectBrandModal'
import SelectPartnerModal from '../../../components/modals/SelectPartnerModal'
import selectBrand from '../../../mixins/selectBrand'
import reload from '../../../mixins/reload'

export default {
  name: 'ConfigModify',
  filters: {
    levelFilter(level) {
      const statusMap = {
        L1: 'LEVEL 1',
        L2: 'LEVEL 2',
        L3: 'LEVEL 3'
      }
      return statusMap[level]
    }
  },
  components: {
    SelectPartnerModal,
    SelectStoreModal,
    SelectBrandModal
  },
  mixins: [selectBrand, reload],
  data() {
    return {
      managerId: this.$route.params.managerId,
      managerConfigData: {
        partners: [],
        brands: [],
        stores: []
      },
      partnerCode: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getBrands()
      this.getManagerConfigInfo()
    },
    getManagerConfigInfo() {
      console.log('getInfo')
      this.$http.get(
        '/manager/' + this.managerId
      ).then(response => {
        console.log(response)
        this.managerConfigData = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    delPartner(index) {
      const partnerCode = this.managerConfigData.partners[index].partnerCode
      this.$http.delete(
        '/manager/' + this.managerId + '/partner/' + partnerCode
      ).then(response => {
        console.log(response)
        this.$message({
          type: 'success',
          message: this.$t('messages.messageDeletePartner')
        })
        this.managerConfigData.partners.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: this.$t('messages.messageDeletePartnerError')
        })
      })
    },
    delBrand(index) {
      console.log(this.managerConfigData.brands[index])
      const brandId = this.managerConfigData.brands[index].brandId
      this.$http.delete(
        '/manager/' + this.managerId + '/brand/' + brandId
      ).then(response => {
        console.log(response)
        this.$message({
          type: 'success',
          message: this.$t('messages.messageDeleteBrand')
        })
        this.managerConfigData.brands.splice(index, 1)
      }).catch(error => {
        console.log(error)
      })
    },
    delStore(index) {
      console.log(this.managerConfigData.stores[index])
      const storeId = this.managerConfigData.stores[index].storeId
      this.$http.delete(
        '/manager/' + this.managerId + '/store/' + storeId
      ).then(response => {
        console.log(response)
        this.$message({
          type: 'success',
          message: this.$t('messages.messageDeleteUseStore')
        })
        this.managerConfigData.stores.splice(index, 1)
      }).catch(error => {
        console.log(error)
      })
    },
    goList() {
      this.$router.history.go(-1)
    },
    callModal(modalId) {
      console.log(modalId)
      this.$bvModal.show(modalId)
    },
    updateConfig() {
      this.$http.put('/manager', this.managerConfigData).then(response => {
        this.$message({
          type: 'success',
          message: '시설 관리자 수정이 완료되었습니다'
        })
        this.init()
      }).catch(error => {
        console.log('error', error)
      })
    }
  }
}
</script>

<style scoped>

</style>
