<template>
  <div class="app-container dev_guide_index">
    <label class="infoLabel">| {{ $t('messages.batchDetail') }}</label>
    <div class="margin-b-40">
      <table class="list-table margin-b-20">
        <colgroup>
          <col >
          <col >
          <col >
          <col >
          <col >
          <col >
          <col >
          <col >
        </colgroup>
        <thead>
          <tr>
            <th>{{ $t('messages.stepExecutionId') }}</th>
            <th>{{ $t('messages.version') }}</th>
            <th>{{ $t('messages.stepName') }}</th>
            <th>{{ $t('messages.processTime') }}</th>
            <th>{{ $t('messages.batchStatus') }}</th>
            <th>{{ $t('messages.commitCount') }}</th>
            <th>{{ $t('messages.readCount') }}</th>
            <th>{{ $t('messages.filterCount') }}</th>
            <th>{{ $t('messages.writeCount') }}</th>
            <th>{{ $t('messages.readSkipCount') }}</th>
            <th>{{ $t('messages.writeSkipCount') }}</th>
            <th>{{ $t('messages.processSkipCount') }}</th>
            <th>{{ $t('messages.rollbackCount') }}</th>
          </tr>
        </thead>
        <tbody v-if="stepData.length > 0">
          <tr v-for="(item, index) in stepData" :key="index">
            <td>{{ item.stepExecutionId }}</td>
            <td>{{ item.version }}</td>
            <td>{{ item.stepName }}</td>
            <td>{{ item.startTime }}<br>{{ item.endTime }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.commitCount }}</td>
            <td>{{ item.readCount }}</td>
            <td>{{ item.filterCount }}</td>
            <td>{{ item.writeCount }}</td>
            <td>{{ item.readSkipCount }}</td>
            <td>{{ item.writeSkipCount }}</td>
            <td>{{ item.processSkipCount }}</td>
            <td>{{ item.rollbackCount }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="8" class="none-data">
              <span>
                <font-awesome-icon icon="store"/>
              </span>
              배치 실행 정보가 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BatchDetail',
  components: {
  },
  filters: {
  },
  data() {
    return {
      executionId: this.$route.params.executionId,
      stepData: []
    }
  },
  computed: {
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log('init' + this.executionId)
      this.getBatchStepData()
    },
    getBatchStepData() {
      this.$http.get('/batch/data/' + this.executionId, {
        params: this.searchQuery
      }).then(result => {
        this.stepData = result.data
      }).catch(error => {
        console.log(error)
        this.$message({
          type: 'error',
          message: error
        })
      })
    }
  }
}

</script>

<style scoped>

</style>
