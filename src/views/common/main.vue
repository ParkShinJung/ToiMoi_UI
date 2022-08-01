<template>
  <div class="app-container dev_guide_index">
    <el-card v-if="authData.userAuth == 'AGENCY_ADMIN' || authData.userAuth == 'AGENCY_OPERATOR'" class="box-card" style="height:1100px;">
      <div>
        <label class="infoLabel">| {{ $t('main.operationCS') }}</label>&nbsp;<span class="infoSub"> - {{ $t('main.operationCSDesc') }}</span>
        <div style="display: flex; margin-top: 20px; height: 100px; margin-bottom:90px;">
          <div class="transition-box">
            <div class="name">{{ $t('common.supplier') }}</div>
            <div class="count">{{ addComma(operationData[0].totalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="salesChannel" class="transition-box">
            <div class="name">{{ $t('common.salesChannel') }}/{{ $t('common.salesClient') }}</div>
            <div class="count">{{ addComma(operationData[1].totalCount) }}/{{ addComma(operationData[2].totalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="brand" class="transition-box">
            <div class="name">{{ $t('common.brand') }}/{{ $t('common.useStore') }}</div>
            <div class="count">{{ addComma(operationData[3].totalCount) }}/{{ addComma(operationData[4].totalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="approval" class="transition-box">
            <div class="name">{{ $t('approval.status.REQUEST') }}</div>
            <router-link :to="'/approval/list'" tag="a">
              <span class="router_link count">{{ addComma(operationData[5].totalCount) }}건</span>
            </router-link>
          </div>
        </div>
        <label class="infoLabel">| {{ $t('main.productCS') }}</label>&nbsp;<span class="infoSub"> - {{ $t('main.productCSDsc') }}</span>
        <div style="display: flex; margin-top: 20px; height: 100px; margin-bottom:90px;">
          <div class="transition-box">
            <div class="name">{{ $t('main.product') }}</div>
            <div class="count">{{ addComma(productData[1].singleNormalCount) }}/{{ addComma(productData[1].singleTotalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="salesChannel" class="transition-box">
            <div class="name">{{ $t('main.singleProduct') }}</div>
            <div class="count">{{ addComma(productData[0].singleNormalCount) }}/{{ addComma(productData[0].singleTotalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="brand" class="transition-box">
            <div class="name">{{ $t('main.complexProduct') }}</div>
            <div class="count">{{ addComma(productData[0].complexNormalCount) }}/{{ addComma(productData[0].complexTotalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="approval" class="transition-box">
            <div class="name">{{ $t('main.dealProduct') }}</div>
            <div class="count">{{ addComma(productData[0].dealNormalCount) }}/{{ addComma(productData[0].dealTotalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
        </div>
        <label class="infoLabel">| {{ $t('main.issueUseCS') }}</label>&nbsp;<span class="infoSub"> - {{ $t('main.issueUseCSDesc') }}</span>
        <div style="display: flex; margin-top: 20px; height: 100px; margin-bottom:90px;">
          <div class="transition-box">
            <div class="name">{{ $t('main.issue') }}</div>
            <div class="count">{{ addComma(issueUseData.issueCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="salesChannel" class="transition-box">
            <div class="name">{{ $t('main.send') }}</div>
            <div class="count">{{ addComma(issueUseData.sendCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="brand" class="transition-box">
            <div class="name">{{ $t('main.use') }}</div>
            <div class="count">{{ addComma(issueUseData.useCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="approval" class="transition-box">
            <div class="name">{{ $t('main.issueCancel') }}</div>
            <div class="count">{{ addComma(issueUseData.cancelCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
        </div>
        <label class="infoLabel">| {{ $t('main.pinManagementCS') }}</label>&nbsp;<span class="infoSub"> - {{ $t('main.pinManagementCSDesc') }}</span>
        <div style="margin-top: 20px; height: 0px; width: 100%; position: relative; padding-bottom: 7%; margin-bottom:190px;">
          <el-form ref="postForm2" class="form-container" label-position="left" style="border: 1px solid #eef1f6; width: 100%; height: 100%; position: absolute;">
            <el-row>
              <el-col :span="24">
                <el-table
                  :data="pinList"
                  height="264"
                  style="width: 100%;"
                >
                  <el-table-column :label="$t('pin.manageNumber')" align="center" width="200px">
                    <template slot-scope="scope">
                      <span>{{ scope.row.pin_mng_no }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('common.brand')" align="center" width="200px">
                    <template slot-scope="scope">
                      <span>{{ scope.row.brand_nm }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('product.productName')" align="center" width="auto">
                    <template slot-scope="scope">
                      <span>{{ scope.row.goods_nm }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesProduct.pinRemainCount')" align="center" width="200px">
                    <template slot-scope="scope">
                      <span>{{ addComma(scope.row.remain_cnt) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('product.expireDate')" align="center" width="200px">
                    <template slot-scope="scope">
                      <span v-if="scope.row.expire_div_cd == '1'">{{ $t('pin.validityPeriod.INDEFINITELY') }}</span>
                      <span v-else>{{ scope.row.expire_dt }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card v-if="authData.userAuth == 'BRAND_ADMIN'" class="box-card" style="height:1300px;">
      <div>
        <label class="infoLabel">{{ $t('main.productCS') }}</label>&nbsp;<span class="infoSub"> - {{ $t('main.productCSDsc') }}</span>
        <div style="display: flex; margin-top: 20px; height: 100px; margin-bottom:90px;">
          <div class="transition-box">
            <div class="name">{{ $t('main.product') }}</div>
            <div class="count">{{ addComma(productBrandData[1].singleNormalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="salesChannel" class="transition-box">
            <div class="name">{{ $t('main.singleProduct') }}</div>
            <div class="count">{{ addComma(productBrandData[0].singleNormalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="brand" class="transition-box">
            <div class="name">{{ $t('main.complexProduct') }}</div>
            <div class="count">{{ addComma(productBrandData[0].complexNormalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="approval" class="transition-box">
            <div class="name">{{ $t('main.dealProduct') }}</div>
            <div class="count">{{ addComma(productBrandData[0].dealNormalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
        </div>
        <label class="infoLabel">{{ $t('main.salesCS') }}</label>&nbsp;<span class="infoSub"> - {{ $t('main.salesCSDesc') }}</span>
        <br>
        <label class="infoLabel">{{ $t('main.salesChannels') }}</label>
        <div class="chart-container" style="display: flex; margin-top: 20px; height: 100px; margin-bottom:220px;">
          <bar-chart :chart-data="salesChannel" style="height: 300px;"/>
        </div>
        <label class="infoLabel">{{ $t('main.salesProducts') }}</label>
        <div class="chart-container" style="display: flex; margin-top: 20px; height: 100px; margin-bottom:220px;">
          <bar-chart :chart-data="salesProduct" style="height: 300px;"/>
        </div>
        <label class="infoLabel">{{ $t('main.transactionCS') }}</label>&nbsp;<span class="infoSub"> - {{ $t('main.transactionCSDesc') }}</span>
        <div style="display: flex; margin-top: 20px; height: 100px; margin-bottom:90px;">
          <div class="transition-box">
            <div class="name">{{ $t('main.transaction') }}</div>
            <div class="count">{{ addComma(transactionData.useCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="salesChannel" class="transition-box">
            <div class="name">{{ $t('transaction.status.CANCEL_COMPLETE') }}</div>
            <div class="count">{{ addComma(transactionData.cancelCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="brand" class="transition-box">
            <div class="name">{{ $t('issue.ticketStatusList.USE_COMPLETE') }}</div>
            <div class="count">{{ addComma(transactionData.totalCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
          <div id="approval" class="transition-box">
            <div class="name">{{ $t('issue.ticketStatusList.USE_CANCEL_COMPLETE') }}</div>
            <div class="count">{{ addComma(transactionData.useCancelCount) }}{{ $t('common.unitProduct') }}</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMainData } from '@/api/dashBoard'
import cookie from '@/utils/cookie.js'
import store from '@/store'
import numeral from 'numeral'
import moment from 'moment'
import BarChart from '@/components/Chart/BarChart'
import i18n from '@/lang'
export default {
  name: 'Main',
  components: { BarChart },
  filters: {
    DefCurrency: function(number) {
      if (number) {
        return numeral(number).format('0,0')
      } else if (number === 0) {
        return '0'
      }
      return '0'
    }
  },
  data() {
    return {
      username: store.getters.name,
      roles: store.getters.roles,
      authData: {
        agencyId: cookie.getCookie('agencyId'),
        supplierId: cookie.getCookie('supplierId'),
        brandId: cookie.getCookie('brandId'),
        storeId: cookie.getCookie('storeId'),
        userAuth: cookie.getCookie('userAuth')
      },
      pinList: [],
      operationData: [{ totalCount: '' }, { totalCount: '' }, { totalCount: '' }, { totalCount: '' }, { totalCount: '' }, { totalCount: '' }],
      productData: [{ singleNormalCount: '', singleTotalCount: '', complexTotalCount: '', complexNormalCount: '', dealTotalCount: '', dealNormalCount: '' },
        { singleNormalCount: '', singleTotalCount: '', complexTotalCount: '', complexNormalCount: '', dealTotalCount: '', dealNormalCount: '' }],
      issueUseData: [],
      salesData: [],
      transactionData: [],
      salesChannel: [],
      salesProduct: [],
      productBrandData: [{ singleNormalCount: '', singleTotalCount: '', complexTotalCount: '', complexNormalCount: '', dealTotalCount: '', dealNormalCount: '' },
        { singleNormalCount: '', singleTotalCount: '', complexTotalCount: '', complexNormalCount: '', dealTotalCount: '', dealNormalCount: '' }]
    }
  },
  created() {
    if (this.authData.userAuth === 'AGENCY_ADMIN' || this.authData.userAuth === 'AGENCY_OPERATOR' || this.authData.userAuth === 'BRAND_ADMIN') {
      // this.getData()
    }
  },
  methods: {
    getData() {
      getMainData(this.authData).then(response => {
        if (this.authData.userAuth === 'AGENCY_ADMIN' || this.authData.userAuth === 'AGENCY_OPERATOR') {
          this.operationData = response.data.operationData
          this.productData = response.data.productData
          this.issueUseData = response.data.issueUseData
          const pinMngList = []

          for (const pinMngData in response.data.pinList.pin_mng_list) {
            if (response.data.pinList.pin_mng_list[pinMngData].remain_cnt <= 1000) {
              response.data.pinList.pin_mng_list[pinMngData].expire_dt = moment(response.data.pinList.pin_mng_list[pinMngData].expire_dt).format('YYYY-MM-DD')
              pinMngList.push(response.data.pinList.pin_mng_list[pinMngData])
            }
          }

          this.pinList = pinMngList
        }

        if (this.authData.userAuth === 'BRAND_ADMIN') {
          this.salesData = response.data.salesData
          this.transactionData = response.data.transactionData
          this.productBrandData = response.data.productBrandData

          const salesName = []
          const data_01 = []
          const data_02 = []

          for (const i in this.salesData) {
            if (this.salesData[i].rownum <= 5) {
              salesName.push(i18n.t(this.salesData[i].salesName))
              data_01.push(this.salesData[i].yesterdayCount)
              data_02.push(this.salesData[i].todayCount)
            }
          }

          const salesChannel = {
            info: {
              // 범례 및 데이터 이름
              legend: [this.$t('main.beforeDay'), this.$t('main.today')],

              // X축 데이터 항목
              xAxis: salesName
            },
            data_01: data_01,
            data_02: data_02
          }

          this.salesChannel = salesChannel

          const salesName2 = []
          const data_012 = []
          const data_022 = []

          for (const i in this.salesData) {
            if (this.salesData[i].rownum > 5) {
              salesName2.push(i18n.t(this.salesData[i].salesName.substring(0, 20))) // 차트항목에 최대 20자리까지만 표현가능 21자리부터 버그생김
              data_012.push(this.salesData[i].yesterdayCount)
              data_022.push(this.salesData[i].todayCount)
            }
          }

          const salesProduct = {
            info: {
              // 범례 및 데이터 이름
              legend: [this.$t('main.beforeDay'), this.$t('main.today')],

              // X축 데이터 항목
              xAxis: salesName2
            },
            data_01: data_012,
            data_02: data_022
          }

          this.salesProduct = salesProduct
        }
      })
    }
  }
}

</script>
<style>
  .transition-box {
    margin-bottom: 10px;
    width: 250px;
    height: 130px;
    border-radius: 4px;
    background-color: #409EFF;
    /* vertical-align: top; */
    color: #fff;
    padding: 15px 20px;
    box-sizing: border-box;
    margin-right: 20px;
    position: absolute;
  }

  .count {
    position: absolute;
    right: 15px;
    bottom: 15px;
    font-size: 25px;
  }

  .router_link {
    text-decoration: underline;
  }

  .name {
    font-size: 22px;
  }

  #salesChannel {
    left: 25%;
  }

  #brand {
    left: 47.3%;
  }

  #approval {
    left: 69.5%;
  }

  .chart-container{
    position: relative;
    width: 100%;
    height: 100px;
    background-color: #344b58;
  }

  .infoSub {
    font-size: 13px;
  }
</style>
