<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="200px"
      class="form"
    >
      <el-form-item label="铁路名：" prop="name">
        <el-input v-model="formData.name" placeholder="请输入铁路名" />
      </el-form-item>
      <el-form-item label="铁路线起点站名：" prop="startPointName">
        <el-input
          v-model="formData.startPointName"
          placeholder="请输入铁路线起点站名"
        />
      </el-form-item>
      <el-form-item label="铁路线终点站名：" prop="endPointName">
        <el-input
          v-model="formData.endPointName"
          placeholder="请输入铁路线终点站名"
        />
      </el-form-item>
      <el-form-item label="铁路全长（公里）：" prop="totalLong">
        <el-input
          v-model="formData.totalLong"
          placeholder="请输入铁路全长公里数"
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
import { railWaysave } from "../../api";
import { successAlert, warningAlert } from "@/utils/alert";

export default {
  props: [],
  components: {},
  data() {
    return {
      formData: formInit(),
      rules: {
        name: [{ required: true, message: "请输入铁路名", trigger: "blur" }],
        startPointName: [
          { required: true, message: "请输入铁路线起点站名", trigger: "blur" },
        ],
        endPointName: [
          { required: true, message: "请输入铁路线终点站名", trigger: "blur" },
        ],
       
        totalLong: [
          { required: true, pattern:/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,5})$)|^(([1-9]+)$)/, message: "请输入整数或小数(小数点后最多5位)", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    reset() {
      this.$refs.form.resetFields();
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          railWaysave(this.formData).then((res) => {
            if (res.code == 200) {
              successAlert("添加成功");
            } else {
              warningAlert("添加失败");
            }
          });
        }
        this.formData = formInit();
      });
    },
  },
  mounted() {},
};
function formInit(data = {}) {
  return {
    endPointName: "",
    name: "",
    startPointName: "",
    totalLong: "",
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