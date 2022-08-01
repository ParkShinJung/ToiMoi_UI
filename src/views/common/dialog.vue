<template>
  <div class="app-container">
    <el-button type="primary" @click="alertDialogVisible = true">{{ $t('dialog.btn_alert') }}</el-button>
    <el-button type="primary" @click="confirmDialogVisible = true">{{ $t('dialog.btn_confirm') }}</el-button>
    <el-button type="primary" @click="inputDialogVisible = true">{{ $t('dialog.btn_input') }}</el-button>

    <!--  alert dialog -->
    <el-dialog
      :visible.sync="alertDialogVisible"
      :title="$t('dialog.title')"
      width="30%">
      <span>{{ $t('dialog.message') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="alertDialogVisible = false">{{ $t('dialog.btn_ok') }}</el-button>
      </span>
    </el-dialog>

    <!-- confirm dialog -->
    <el-dialog
      :visible.sync="confirmDialogVisible"
      :title="$t('dialog.title')"
      width="30%">
      <span>{{ $t('dialog.message') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialogVisible = false">{{ $t('dialog.btn_cancel') }}</el-button>
        <el-button type="primary" @click="confirmDialogVisible = false">{{ $t('dialog.btn_ok') }}</el-button>
      </span>
    </el-dialog>

    <!-- input dialog -->
    <el-dialog
      :visible.sync="inputDialogVisible"
      :title="$t('dialog.title')"
      width="35%">
      <el-form ref="dataForm" :model="input" label-position="left" label-width="100px">
        <el-form-item :label="$t('dialog.input.name')" prop="title">
          <el-input v-model="input.name"/>
        </el-form-item>
        <el-form-item :label="$t('dialog.input.phone')" prop="title">
          <el-input v-model="input.phone"/>
        </el-form-item>
        <el-form-item :label="$t('dialog.input.gender')" prop="type">
          <el-select v-model="input.gender" class="filter-item" placeholder="$t('dialog.input.gender_none')">
            <el-option v-for="item in genderOptions" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="inputDialogVisible = false">{{ $t('dialog.btn_cancel') }}</el-button>
        <el-button type="primary" @click="inputDialogVisible = false">{{ $t('dialog.btn_ok') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import i18n from '@/lang'

export default {
  name: 'Dialog',
  data() {
    return {
      formInline: true,
      alertDialogVisible: false,
      confirmDialogVisible: false,
      inputDialogVisible: false,
      genderOptions: [
        { key: '', value: i18n.t('dialog.input.gender_none') },
        { key: 'M', value: i18n.t('dialog.input.gender_male') },
        { key: 'F', value: i18n.t('dialog.input.gender_female') }
      ],
      input: {
        name: '',
        phone: '',
        gender: ''
      }
    }
  }
}

</script>
