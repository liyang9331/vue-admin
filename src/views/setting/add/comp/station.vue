<template>
  <div>
    <el-form
      ref="stationform"
      :model="stationForm"
      :rules="rules"
      label-width="200px"
      class="form"
    >
      <el-form-item label="站点所属铁路线：" prop="wayId">
        <el-select v-model="stationForm.wayId" placeholder="请选择铁路线">
          <el-option
            v-for="item in railWaySelect"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="站点编号：" prop="siteCode">
        <el-input v-model="stationForm.siteCode" placeholder="请输入站点编号" />
      </el-form-item>
      <el-form-item label="站名：" prop="siteName">
        <el-input v-model="stationForm.siteName" placeholder="请输入站名" />
      </el-form-item>
      <el-form-item label="站点地址：" prop="siteAddress">
        <el-input
          v-model="stationForm.siteAddress"
          placeholder="请输入站点地址"
        />
      </el-form-item>
      <el-form-item label="站点所在局：" prop="siteArea">
        <el-input
          v-model="stationForm.siteArea"
          placeholder="请输入站点所在局"
        />
      </el-form-item>
      <el-form-item label="站点所在段号：" prop="siteSectionCode">
        <el-input
          v-model="stationForm.siteSectionCode"
          placeholder="请输入站点所在段号"
        />
      </el-form-item>
      <el-form-item label="站点所在公里标：" prop="siteKmSign">
        <el-input
          v-model="stationForm.siteKmSign"
          placeholder="请输入站点所在公里标"
        />
      </el-form-item>
      <el-form-item label="站点经度：" prop="siteLatitude">
        <el-input
          v-model="stationForm.siteLatitude"
          placeholder="请输入站点经度"
        />
      </el-form-item>
      <el-form-item label="站点纬度：" prop="siteLongitude">
        <el-input
          v-model="stationForm.siteLongitude"
          placeholder="请输入站点纬度"
        />
      </el-form-item>
      <el-form-item label="站点其他信息：" prop="siteOtherMessage">
        <el-input
          v-model="stationForm.siteOtherMessage"
          placeholder="请输入站点其他信息"
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
import { sitesave, railWaylist } from "../../api";
import { successAlert, warningAlert } from "@/utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {
      railWaySelect: [],
      stationForm: formInit(),
      params: {
        current: 1,
        size: 10,
      },
      rules: {
        parentId: [
          { required: true, message: "请选择铁路线", trigger: "blur" },
        ],
        wayId: [{ required: true, message: "请选择铁路线", trigger: "blur" }],
        siteCode: [
          { required: true, message: "请输入站点编号", trigger: "blur" },
        ],
        siteName: [{ required: true, message: "请输入站名", trigger: "blur" }],
        siteAddress: [
          { required: true, message: "请输入站点地址", trigger: "blur" },
        ],
        siteArea: [
          { required: true, message: "请输入站点所在局", trigger: "blur" },
        ],
        siteSectionCode: [
          { required: true, message: "请输入站点所在段号", trigger: "blur" },
        ],
        siteKmSign: [
          { required: true, message: "请输入站点所在公里标", trigger: "blur" },
        ],
        siteLatitude: [
          { required: true, message: "请输入站点经度", trigger: "blur" },
        ],
        siteLongitude: [
          { required: true, message: "请输入站点纬度", trigger: "blur" },
        ],
        siteOtherMessage: [
          { required: true, message: "请输入站点其他信息", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    readNodes(aaa = [], arrarea = []) {
      for (let item of aaa) {
        arrarea.push({ id: item.id, name: item.name });
        if (item.children) {
          this.readNodes(item.children, arrarea);
        }
      }
      return arrarea;
    },
    reset() {
      this.$refs.stationform.resetFields();
    },
    submit() {
      this.$refs.stationform.validate((valid) => {
        if (valid) {
          this.stationForm.parentId = this.stationForm.wayId;

          sitesave(this.stationForm).then((res) => {
            if (res.code == 200) {
              successAlert("添加成功");
            } else {
              warningAlert("添加失败");
            }
          });
        }
        this.stationForm = formInit();
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
    wayId: "",
    siteCode: "",
    siteName: "",
    siteAddress: "",
    siteArea: "",
    siteSectionCode: "",
    siteKmSign: "",
    siteLatitude: "",
    siteLongitude: "",
    siteOtherMessage: "",
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
  text-align: center;
  padding: 20px 0 50px 0;
}
</style>