<template>
  <div class="app-container">
    <el-input v-model="inputData" placeholder="Please input" style="width:300px;max-width:100%;"/>
    <el-button type="primary" icon="document" @click="handleCopy(inputData,$event)">{{ $t('clipboard.copy') }}</el-button>
  </div>
</template>

<script>

import clip from '@/utils/clipboard'
import i18n from '@/lang'

export default {
  name: 'Clipboard',
  data() {
    return {
      inputData: i18n.t('clipboard.placeholder'),
      successMessage: i18n.t('clipboard.success'),
      failMessage: i18n.t('clipboard.fail')
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event, this.successMessage, this.failMessage)
    }
  }
}

</script>
