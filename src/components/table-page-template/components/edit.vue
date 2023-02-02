<template>
  <el-dialog
    :title="editText"
    :visible.sync="visible"
    width="700px"
    :close-on-click-modal="false"
    @close="cancel"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="form-container"
      label-position="right"
      label-width="110px"
      size="normal"
    >
      <!-- template start flag:1,添加 flag:2,编辑-->
      <el-form-item label="算法编号" prop="algorithmNumber">
        <el-input v-model="form.algorithmNumber" placeholder="请输入算法编号" />
      </el-form-item>
      <el-form-item label="算法名称" prop="algorithmName">
        <el-input v-model="form.algorithmName" placeholder="请输入算法名称" />
      </el-form-item>
      <el-form-item label="算法版本" prop="algorithmVersion">
        <el-input
          v-model="form.algorithmVersion"
          placeholder="请输入算法版本"
        />
      </el-form-item>
      <el-form-item label="算法描述" prop="algorithmDescription">
        <el-input
          v-model="form.algorithmDescription"
          type="textarea"
          placeholder="请输入算法描述"
        />
      </el-form-item>

      <el-form-item label="使用状态" prop="algorithmStatus">
        <el-select
          v-model="form.algorithmStatus"
          placeholder="请选择使用状态"
          style="width: 100%"
        >
          <el-option
            v-for="item in usage_status"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="算法模型" prop="modelFile">
        <el-upload
          class="upload-demo mr10"
          action="#"
          :auto-upload="true"
          :show-file-list="false"
          :http-request="toBatchImport"
        >
          <el-button slot="trigger" type="info" class="textBtn"><svg-icon class="mr10" icon-class="batch_import" />上传</el-button>
        </el-upload>
      </el-form-item>
      <!-- template end -->
    </el-form>
    <span slot="footer">
      <el-button class="reset-btn" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confrim">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editFormModel, rules, usage_status } from '../const'
import mixinsInit from '../mixins/dialogFormMixins'
import { getDict } from '@/api/dict.js'
import { addAlgorithmModel, editAlgorithmModel } from '@/api/algorithmModel'

const mixins = mixinsInit({
  defaultText: '算法模型',
  formInit: editFormModel,
  rules,
  apiMap: {
    1: addAlgorithmModel,
    2: editAlgorithmModel
  }
})
export default {
  name: 'Edit',
  mixins: [mixins],
  data() {
    return {
      usage_status: usage_status,
      detectorStatusList: [],
      factoryList: []
    }
  },
  computed: {},
  mounted() {
    // this.getInit()
  },
  methods: {
    // 获取字典值
    getInit() {
      this.detectorStatusList = getDict('detector_status')
      this.factoryList = getDict('factory_type')
    },
    // 算法模型上传
    toBatchImport(data) {
      this.form.modelFile = data.fiile
    }
  }
}
</script>
<style scoped>
.notice {
  margin-left: 110px;
  margin-bottom: 10px;
}
</style>
