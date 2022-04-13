<template>
  <div class="parameter">
    <div class="content">
      <div class="content-title">
        温馨提示：告警门限参数设置，数据如无异常，请勿修改告警门限参数！
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="200px"
        class="content-form"
      >
        <el-form-item label="漏缆型号：" prop="equipType">
          <el-select
            v-model="form.equipType"
            style="width: 100%"
            filterable
            placeholder="请选择漏缆型号"
            @change="checkMode"
          >
            <el-option
              v-for="item in equipTypeList"
              :key="item.leakyCableMode"
              :label="item.leakyCableMode"
              :value="item.leakyCableMode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="一般告警门限：" prop="normalAlarmLimit">
          <el-input v-model="form.normalAlarmLimit" placeholder="请输入一般告警门限" />
        </el-form-item>
        <el-form-item label="重要告警门限：" prop="majorAlarmLimit">
          <el-input v-model="form.majorAlarmLimit" placeholder="请输入重要告警门限" />
        </el-form-item>
        <el-form-item label="紧急告警门限：" prop="emergAlarmLimit">
          <el-input v-model="form.emergAlarmLimit" placeholder="请输入紧急告警门限" />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <div class="footer-btn">
        <el-button
          type="primary"
          :loading="loading"
          @click="submit"
        >确认修改</el-button>
      </div>
      <div class="footer-tips">当前未修改漏缆告警门限参数</div>
    </div>
  </div>
</template>

<script>
import { rules } from './const'
import { cableTypeEnum, saveParam, selectEquipByType } from '../api'
export default {
  data() {
    return {
      loading: false,
      form: {
        equipType: '',
        normalAlarmLimit: '',
        majorAlarmLimit: '',
        emergAlarmLimit: ''
      },
      rules,
      equipTypeList: []
    }
  },
  mounted() {
    this.getLeakyCablel()
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          saveParam(this.form).then(res => {
            this.$message.success('操作成功')
          })
        }
      })
    },
    getLeakyCablel() {
      cableTypeEnum().then(res => {
        let list = res || []
        this.equipTypeList = list
      })
    },
    checkMode(data) {
      selectEquipByType({equipType:data}).then(res => {
        this.form = res
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.parameter {
  padding: 10px;
  .content {
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    .content-title {
      width: 100%;
      height: 60px;
      background: rgba(226, 235, 255, 0.39);
      line-height: 60px;
      font-size: 18px;
      color: #333;
      font-weight: 500;
      text-align: center;
      border-bottom: 1px solid #e3e3e3;
    }
    .content-form {
      margin: 0 auto;
      padding: 20px 0;
      width: 600px;
    }
  }
  .footer {
    text-align: center;
    padding-top: 50px;
    .footer-btn {
      margin-bottom: 50px;
    }
    .footer-tips {
      color: #1E64F6;
      font-weight: 500;
      font-size: 18px;
    }
  }
}

</style>
