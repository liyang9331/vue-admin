<template>
  <div>
    <el-form
      ref="monitorForm"
      :model="monitorForm"
      :rules="rules"
      label-width="200px"
      class="form"
    >
      <el-form-item label="所在铁路线：" prop="wayId">
        <el-select
          v-model="monitorForm.wayId"
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
        <el-select
          v-model="monitorForm.siteId"
          placeholder="请选择站点"
          @change="changesite()"
        >
          <el-option
            v-for="item in stationSelect2"
            :key="item.id"
            :label="item.siteName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在FSU：" prop="fsuId">
        <el-select v-model="monitorForm.fsuId" placeholder="请选择FSU">
          <el-option
            v-for="item in fsuSelect2"
            :key="item.id"
            :label="item.equipName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备身份编号：" prop="equipCode">
        <el-input
          v-model="monitorForm.equipCode"
          placeholder="请输入设备身份编号"
        />
      </el-form-item>
      <el-form-item label="设备名称：" prop="equipName">
        <el-input
          v-model="monitorForm.equipName"
          placeholder="请输入设备名称"
        />
      </el-form-item>
      <el-form-item label="设备厂商：" prop="equipFactory">
        <el-input
          v-model="monitorForm.equipFactory"
          placeholder="请输入设备厂商"
        />
      </el-form-item>
      <el-form-item label="IP：" prop="ip">
        <el-input v-model="monitorForm.ip" placeholder="请输入设备厂商" />
      </el-form-item>
      <el-form-item label="设备类别：" prop="equipType">
        <el-select v-model="monitorForm.equipType" placeholder="请输入设备类别">
          <el-option
            v-for="item in equipTypeSelect"
            :key="item.id"
            :label="item.dictValue"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备型号：" prop="equipMode">
        <el-select v-model="monitorForm.equipMode" placeholder="请输入设备型号">
          <el-option
            v-for="item in equipModeSelect"
            :key="item.id"
            :label="item.dictValue"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="设备生产序列号：" prop="equipSerialNumber">
        <el-input
          v-model="monitorForm.equipSerialNumber"
          placeholder="请输入设备生产序列号"
        />
      </el-form-item>
      <el-form-item label="设备所在铁路公里标：" prop="kmSign">
        <el-input
          v-model="monitorForm.kmSign"
          placeholder="请输入设备所在铁路公里标"
        />
      </el-form-item>
      <!-- <el-form-item label="安装日期：" prop="installDate">
        <el-date-picker
          v-model="monitorForm.installDate"
          type="datetime"
          placeholder="请选择安装日期"
          format="yyyy-MM-dd HH:mm:ss"
          style="width: 400px"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="	维护日期：" prop="repairDate">
        <el-date-picker
          v-model="monitorForm.repairDate"
          type="datetime"
          placeholder="请选择维护日期"
          format="yyyy-MM-dd HH:mm:ss"
          style="width: 400px"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item> -->
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="submit">确认提交</el-button>
    </div>
  </div>
</template>
<script>
import {
  railWaylist,
  monitorEquipsave,
  selectMonitorItem,
  selectForSite,
  selectForFsu,
} from "../../api";

import { successAlert, warningAlert } from "@/utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {
      railWaySelect: [],
      stationSelect2: [],
      fsuSelect2: [],
      equipTypeSelect: [],
      equipModeSelect: [],
      monitorForm: formInit(),
      params: {
        current: 1,
        size: 10,
      },
      rules: {
        wayId: [{ required: true, message: "请选择铁路线", trigger: "blur" }],
        siteId: [{ required: true, message: "请选择站点", trigger: "blur" }],
        fsuId: [{ required: true, message: "请选择FSU", trigger: "blur" }],
        equipCode: [
          { required: true, message: "请输入设备身份编号", trigger: "blur" },
        ],
        equipFactory: [
          { required: true, message: "请输入设备厂商", trigger: "blur" },
        ],
        ip: [{ required: true, pattern : /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.((1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.){2}(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/ , message: "请输入正确的IP地址", trigger: "blur" }],
        equipMode: [
          { required: true, message: "请选择设备型号", trigger: "blur" },
        ],
        equipName: [
          { required: true, message: "请输入设备名", trigger: "blur" },
        ],
        equipSerialNumber: [
          { required: true, message: "请输入设备生产序列号", trigger: "blur" },
        ],
        equipType: [
          { required: true, message: "请输入设备类别", trigger: "blur" },
        ],
        installDate: [
          { required: true, message: "请输入安装日期", trigger: "blur" },
        ],
        kmSign: [
          {
            required: true,
            message: "请输入设备所在铁路公里标",
            trigger: "blur",
          },
        ],
        repairDate: [
          { required: true, message: "请输入维护日期", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    changerailWay() {
      selectForSite({ wayId: this.monitorForm.wayId }).then((res) => {
        this.stationSelect2 = res;
      });
    },
    changesite() {
      selectForFsu({ siteId: this.monitorForm.siteId }).then((res) => {
        this.fsuSelect2 = res;
        console.log(this.fsuSelect2);
      });
    },
    reset() {
      this.$refs.monitorForm.resetFields();
    },
    submit() {
      this.$refs.monitorForm.validate((valid) => {
        if (valid) {
          this.monitorForm.parentId = this.monitorForm.fsuId;

          monitorEquipsave(this.monitorForm).then((res) => {
            if (res.code == 200) {
              successAlert("添加成功");
            } else {
              warningAlert("添加失败");
            }
          });
        }
        this.monitorForm = formInit();
      });
    },

    getAllWay() {
      railWaylist(this.params).then((res) => {
        this.railWaySelect = res.records;
        if (res.total > this.params.size) {
          this.params.size = res.total;
          this.getAllWay();
        }
      });
    },
  },
  created() {
    selectMonitorItem().then((res) => {
      this.equipTypeSelect = res["03"];
      this.equipModeSelect = res["09"];
    });
  },
  mounted() {
    this.getAllWay();
  },
};
function formInit(data = {}) {
  return {
    wayId: "",
    parentId: "",
    siteId: "",
    fsuId: "",
    equipCode: "",
    ip: "",
    equipFactory: "",
    equipMode: "",
    equipName: "",
    equipSerialNumber: "",
    equipType: "",
    installDate: "",
    kmSign: "",

    repairDate: "",
    ...data,
  };
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