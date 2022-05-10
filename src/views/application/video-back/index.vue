<template>
<el-main>
  <el-row>
    <el-col :span="1"><span class="label">时间段:</span></el-col>
    <el-col :span="3.5"
      ><el-date-picker
        v-model="startTime"
        type="datetime"
        placeholder="开始时间"
      >
      </el-date-picker
    ></el-col>
    <el-col :span="0.5"><span class="label">-</span></el-col>
    <el-col :span="3.5"
      ><el-date-picker v-model="endTime" type="datetime" placeholder="结束时间">
      </el-date-picker
    ></el-col>
    <el-col :span="1"><span class="label">区域:</span></el-col>
    <el-col :span="2"
      ><el-select v-model="region" clearable placeholder="请选择">
        <el-option
          v-for="item in regionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option> </el-select
    ></el-col>
    <el-col :span="1"><span class="label">通道:</span></el-col>
    <el-col :span="2"
      ><el-select v-model="passageway" clearable placeholder="请选择">
        <el-option
          v-for="item in passagewayOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option> </el-select
    ></el-col>
    <el-col :span="2"><span class="label">录像来源:</span></el-col>
    <el-col :span="2">
      <el-select v-model="videoSource" clearable placeholder="请选择">
        <el-option
          v-for="item in videoSourceOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
        <el-button type="primary">重置</el-button>
        <el-button type="primary">查询</el-button>
    </el-col>
  </el-row>
  <el-divider></el-divider>
  <el-main>
    <el-row>
      <el-col :span="6" v-for="(item,key) in videoBackList" :key="key">
        <!-- 回放视频组件 -->
      </el-col>
    </el-row>
  </el-main>
</el-main>
</template>
<script>
export default {
  // 数据
  data() {
    return {
      //   开始时间
      startTime: "",
      //   结束时间
      endTime: "",
      //   区域
      region: "",
      //   区域下拉选择器
      regionOptions: [],
      //   通道
      passageway: "",
      //   通道下拉选择器
      passagewayOptions: [],
      //   录像来源
      videoSource: "",
      //   录像来源下拉选择器
      videoSourceOptions: [],
      // 回放数据集合
      videoBackList:[]
    };
  },
  // 混入
  mixins: [],
  // 组件
  components: {},
  // 计算属性
  computed: {},
  // 监听器
  watch: {},
  // 创建之前（el、data和message都还是undefined,不可用的）
  beforeCreate() {},
  // 创建完毕（能读取到数据data的值,但是DOM还没生成）
  created() {},
  // 挂载之前（生成DOM,但此时{{ message }}还没有挂载data中的数据）
  beforeMount() {},
  // 挂载完毕（{{ message }}已经成功挂载渲染data的值）
  mounted() {},
  // 更新之前
  beforeUpdate() {},
  // 更新完毕
  updated() {},
  // 销毁之前
  beforeDestroy() {},
  // 销毁完毕（实例与视图的关系解绑，再修改message的值，视图再也不会更新了）
  destroyed() {},
  // 实例方法
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>
