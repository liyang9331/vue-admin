<template>
  <div>
    <el-form
      ref="FSUForm"
      :rules="rules"
      :model="FSUForm"
      label-width="200px"
      class="form"
    >
      <el-form-item label="所在铁路线：" prop="wayId">
        <el-select
          v-model="FSUForm.wayId"
          placeholder="请选择铁路线"
          @change="changerailWay()"
        >
          <el-option
            v-for="item in railWaySelect"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在站点：" prop="siteId">
        <el-select v-model="FSUForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in stationSelect2"
            :key="item.id"
            :label="item.siteName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="FSU身份编号：" prop="fsuCode">
        <el-input v-model="FSUForm.fsuCode" placeholder="请输入FSU身份编号" />
      </el-form-item>
      <el-form-item label="FSU端口数：" prop="fsuPort">
        <el-input v-model="FSUForm.fsuPort" placeholder="请输入FSU端口数" />
      </el-form-item>
      <el-form-item label="设备名称：" prop="equipName">
        <el-input v-model="FSUForm.equipName" placeholder="请输入设备名称" />
      </el-form-item>
      <el-form-item label="IP地址：" prop="ip">
        <el-input v-model="FSUForm.ip" placeholder="请输入IP地址" />
      </el-form-item>
      <el-form-item label="设备厂商：" prop="equipFactory">
        <el-input v-model="FSUForm.equipFactory" placeholder="请输入设备厂商" />
      </el-form-item>

      <el-form-item label="设备备用方式：" prop="backupMode">
        <el-select
          v-model="FSUForm.backupMode"
          placeholder="请选择设备备用方式"
        >
          <el-option
            v-for="item in backupModeSelect"
            :key="item.id"
            :label="item.dictValue"
            :value="item.id"
          ></el-option
        ></el-select>
      </el-form-item>
      <el-form-item label="通信方式：" prop="connectMode">
        <el-select v-model="FSUForm.connectMode" placeholder="请选择通信方式">
          <el-option
            v-for="item in connectModeSelect"
            :key="item.id"
            :label="item.dictValue"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型：" prop="equipType">
        <el-select v-model="FSUForm.equipType" placeholder="请选择设备类型">
          <el-option
            v-for="item in equipTypeSelect"
            :key="item.id"
            :label="item.dictValue"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备子类型：" prop="equipSubType">
        <el-select
          v-model="FSUForm.equipSubType"
          placeholder="请选择设备子类型"
        >
          <el-option
            v-for="item in equipSubTypeSelect"
            :key="item.id"
            :label="item.dictValue"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="软件版本号：" prop="softVersion">
        <el-input
          v-model="FSUForm.softVersion"
          placeholder="请输入软件版本号"
        />
      </el-form-item>
      <el-form-item label="设备生产序列号：" prop="equipSerialNumber">
        <el-input
          v-model="FSUForm.equipSerialNumber"
          placeholder="请输入设备生产序列号"
        />
      </el-form-item>
      <el-form-item label="设备所在铁路公里标：" prop="kmSign">
        <el-input
          v-model="FSUForm.kmSign"
          placeholder="请输入设备所在铁路公里标"
        />
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="submit">确认提交</el-button>
    </div>
  </div>
</template>
<script>
import { fsusave, selectFsuItem, selectForSite, railWaylist } from "../../api";
import { successAlert, warningAlert } from "@/utils/alert";
export default {
  data() {
    return {
      type: 1,
      railWaySelect: [],
      stationSelect: [],
      stationSelect2: [],
      backupModeSelect: [],
      connectModeSelect: [],
      equipTypeSelect: [],
      equipSubTypeSelect: [],
      FSUForm: formInit(),
      params: {
        current: 1,
        size: 10
      },
      rules: {
        wayId: [{ required: true, message: "请选择铁路线", trigger: "blur" }],
        siteId: [{ required: true, message: "请选择站点", trigger: "blur" }],
        fsuCode: [
          { required: true, message: "请输入FSU身份编号", trigger: "blur" }
        ],
        fsuPort: [
          { required: true, pattern: /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/, message: "请输入FSU端口数", trigger: "blur" }
        ],
        equipName: [
          { required: true, message: "请输入设备名称", trigger: "blur" }
        ],
        ip: [{ required: true, pattern: /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.((1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.){2}(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/, message: "请输入正确的IP地址", trigger: "blur" }],
        equipFactory: [
          { required: true, message: "请输入设备厂商", trigger: "blur" }
        ],
        backupMode: [
          { required: true, message: "请选择设备备用方式", trigger: "blur" }
        ],
        connectMode: [
          { required: true, message: "请选择通信方式", trigger: "blur" }
        ],
        equipType: [
          { required: true, message: "请选择设备类型", trigger: "blur" }
        ],
        equipSubType: [
          { required: true, message: "请选择设备子类型", trigger: "blur" }
        ],
        softVersion: [
          { required: true, message: "请输入软件版本号", trigger: "blur" }
        ],
        equipSerialNumber: [
          { required: true, message: "请输入设备生产序列号", trigger: "blur" }
        ],
        kmSign: [
          {
            required: true,
            message: "请输入设备所在铁路公里标",
            trigger: "blur"
          }
        ]
      }
    }
  },
  created() {
    selectFsuItem().then((res) => {
      this.backupModeSelect = res["01"]
      this.connectModeSelect = res["02"]
      this.equipTypeSelect = res["03"]
      this.equipSubTypeSelect = res["04"]
    })
  },
  mounted() {
    this.getAllWay()
  },
  methods: {
    changerailWay() {
      selectForSite({ wayId: this.FSUForm.wayId }).then((res) => {
        this.stationSelect2 = res;
      });
    },
    readNodes(aaa = [], arrarea = []) {
      for (let item of aaa) {
        arrarea.push({ id: item.id, siteName: item.name })
        if (item.children) {
          this.readNodes(item.children, arrarea)
        }
      }
      return arrarea
    },
    reset() {
      this.$refs.FSUForm.resetFields()
    },
    submit() {
      this.$refs.FSUForm.validate((valid) => {
        if (valid) {
          this.FSUForm.parentId = this.FSUForm.siteId
          this.FSUForm.fsuPort = Number(this.FSUForm.fsuPort)
          fsusave(this.FSUForm).then((res) => {
            successAlert('操作成功')
          })
        }
        this.FSUForm = formInit()
      })
    },
    getAllWay() {
      railWaylist(this.params).then((res) => {
        this.railWaySelect = res.records || []
        if (res.total > this.params.size) {
          this.params.size = res.total
          this.getAllWay()
        }
      })
    }
  }
}

function formInit(data = {}) {
  return {
    parentId: "",
    wayId: "",
    fsuCode: "",
    fsuPort: "",
    equipName: "",
    ip: "",
    equipFactory: "",
    backupMode: "",
    connectMode: "",
    equipType: "",
    equipSubType: "",
    softVersion: "",
    equipSerialNumber: "",
    kmSign: "",
    ...data,
  }
}
</script>
<style lang="scss" scoped>
.form {
  padding: 20px 0;
  width: 600px;
  margin: 0 auto;
}
.btn {
  padding: 20px 0 50px 0;
  text-align: center;
}
</style>
