<template>
  <div>
    <el-form
      ref="leakyCableForm"
      :model="leakyCableForm"
      :rules="rules"
      label-width="200px"
      class="form"
    >
      <el-form-item label="所在铁路线：" prop="wayId">
        <el-select
          v-model="leakyCableForm.wayId"
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
          v-model="leakyCableForm.siteId"
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
        <el-select
          v-model="leakyCableForm.fsuId"
          placeholder="请选择FSU"
          @change="changefsu()"
        >
          <el-option
            v-for="item in fsuSelect2"
            :key="item.id"
            :label="item.equipName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在监测设备：" prop="equipId">
        <el-select
          v-model="leakyCableForm.equipId"
          placeholder="请选择监测设备"
        >
          <el-option
            v-for="item in monitor2"
            :key="item.id"
            :label="item.equipName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="漏缆编号：" prop="leakyCableCode">
        <el-input
          v-model="leakyCableForm.leakyCableCode"
          placeholder="请输入漏缆编号"
        />
      </el-form-item>
      <el-form-item label="漏缆描述：" prop="leakyCableDescribe">
        <el-input
          v-model="leakyCableForm.leakyCableDescribe"
          placeholder="请输入漏缆描述"
        />
      </el-form-item>

      <el-form-item label="漏缆型号：" prop="leakyCableMode">
        <el-input
          v-model="leakyCableForm.leakyCableMode"
          placeholder="请输入漏缆型号"
        />
      </el-form-item>
      <el-form-item label="漏缆长度：" prop="leakyCableLength">
        <el-input
          v-model="leakyCableForm.leakyCableLength"
          placeholder="请输入漏缆长度"
        />
      </el-form-item>
      <el-form-item label="漏缆百米损耗：" prop="hundredMetersLoss">
        <el-input
          v-model="leakyCableForm.hundredMetersLoss"
          placeholder="请输入漏缆百米损耗"
        />
      </el-form-item>
      <el-form-item label="漏缆速度衰减系数：" prop="reductRatio">
        <el-input
          v-model="leakyCableForm.reductRatio"
          placeholder="请输入漏缆速度衰减系数"
        />
      </el-form-item>
      <el-form-item label="漏缆测试信号发射功率：" prop="sendPower">
        <el-input
          v-model="leakyCableForm.sendPower"
          placeholder="请输入漏缆测试信号发射功率"
        />
      </el-form-item>
      <el-form-item label="跳线长度：" prop="jumperLength">
        <el-input
          v-model="leakyCableForm.jumperLength"
          placeholder="请输入跳线长度"
        />
      </el-form-item>
      <el-form-item label="插入器长度：" prop="inserterLength">
        <el-input
          v-model="leakyCableForm.inserterLength"
          placeholder="请输入插入器长度"
        />
      </el-form-item>
      <el-form-item label="天馈线长度：" prop="antennaFeederLength">
        <el-input
          v-model="leakyCableForm.antennaFeederLength"
          placeholder="请输入天馈线长度"
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
import {
  leakyCablesave,
  selectForSite,
  selectForFsu,
  selectForEquip,
  railWaylist,
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
      monitor2: [],
      FSUrailway: [],
      leakyCableForm: formInit(),
      params: {
        current: 1,
        size: 10,
      },
      rules: {
        wayId: [{ required: true, message: "请选择铁路线", trigger: "blur" }],
        siteId: [{ required: true, message: "请选择站点", trigger: "blur" }],
        fsuId: [{ required: true, message: "请选择FSU", trigger: "blur" }],
        equipId: [
          { required: true, message: "请选择监测设备", trigger: "blur" },
        ],

        antennaFeederLength: [
          { required: true, message: "请输入天馈线长度", trigger: "blur" },
        ],
        // hundredMetersLoss: [
        //   { required: true, message: "请输入漏缆百米损耗", trigger: "blur" },
        // ],
        inserterLength: [
          { required: true, message: "请输入插入器长度", trigger: "blur" },
        ],
        jumperLength: [
          { required: true, message: "请输入跳线长度", trigger: "blur" },
        ],
        leakyCableCode: [
          { required: true, message: "请输入漏缆编号", trigger: "blur" },
        ],
        leakyCableDescribe: [
          { required: true, message: "请输入漏缆描述", trigger: "blur" },
        ],
        leakyCableLength: [
          { required: true, message: "请输入漏缆长度", trigger: "blur" },
        ],
        leakyCableMode: [
          {
            required: true,
            message: "请输入漏缆型号",
            trigger: "blur",
          },
        ],
        reductRatio: [
          {
            required: true,
            message: "请输入漏缆速度衰减系数",
            trigger: "blur",
          },
        ],
        sendPower: [
          {
            required: true,
            message: "请输入漏缆测试信号发射功率",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    changerailWay() {
      selectForSite({ wayId: this.leakyCableForm.wayId }).then((res) => {
        this.stationSelect2 = res;
      });
    },
    changesite() {
      selectForFsu({ siteId: this.leakyCableForm.siteId }).then((res) => {
        this.fsuSelect2 = res;
      });
    },
    changefsu() {
      selectForEquip({ fsuId: this.leakyCableForm.fsuId }).then((res) => {
        this.monitor2 = res;
      });
    },
    reset() {
      this.$refs.leakyCableForm.resetFields();
    },
    submit() {
      this.$refs.leakyCableForm.validate((valid) => {
        if (valid) {
          console.log(this.leakyCableForm);
            this.leakyCableForm.parentId = this.leakyCableForm.equipId;
          leakyCablesave(this.leakyCableForm).then((res) => {
            if (res.code == 200) {
              successAlert("添加成功");
            } else {
              warningAlert("添加失败");
            }
          });
        }
        this.leakyCableForm = formInit();
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
  mounted() {
    this.getAllWay();
  },
};
function formInit(data = {}) {
  return {
    parentId: "",
    siteId: "",
    fsuId: "",
    equipId: "",
    antennaFeederLength: 0,
    hundredMetersLoss: "",
    inserterLength: 0,
    jumperLength: 0,
    leakyCableCode: "",
    leakyCableDescribe: "",
    leakyCableLength: 0,
    leakyCableMode: "",
    parentId: 0,
    reductRatio: 0,
    sendPower: 0,
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
