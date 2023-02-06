<template>
  <!-- 本组件完全自动化，如需增加搜索栏输入按钮的类型，请按照结构扩展 -->
  <div class="equipment">
    <el-form ref="form" class="search-form" :model="form" :inline="true">
      <template v-for="(item, key) in formItemList">
        <!-- 预置：输入框 -->
        <el-form-item
          v-if="item.type == 'input'"
          :key="key"
          :label="item.label"
        >
          <el-input
            v-model="form[item.model]"
            :type="item.inputType"
            :placeholder="item.placeholder"
          />
        </el-form-item>
        <!-- 预置：选择器 -->
        <el-form-item
          v-if="item.type == 'select'"
          :key="key"
          :label="item.label"
        >
          <el-select
            v-model="form[item.model]"
            :placeholder="item.placeholder"
            :multiple="item.multiple"
          >
            <el-option
              v-for="item in item.option"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <!-- 预置：树形控件 -->
        <el-form-item v-if="item.type == 'tree'" :key="key" :label="item.label">
          <treeselect
            v-model="form[item.model]"
            style="width: 100%"
            :placeholder="item.placeholder"
            :multiple="false"
            :options="item.data"
            :normalizer="normalizer"
          />
        </el-form-item>
        <!-- 预置：时间选择器 -->
        <el-form-item
          v-if="item.type == 'TimePicker'"
          :key="key"
          :label="item.label"
        >
          <el-time-select
            v-model="form[item.model]"
            :picker-options="{
              start: '00:00',
              step: '00:60',
              end: '23:59',
            }"
            placeholder="选择时间"
          />
        </el-form-item>
        <!-- 预置：日期选择器 -->
        <el-form-item
          v-if="item.type == 'DatePicker'"
          :key="key"
          :label="item.label"
        >
          <el-date-picker
            v-model="form[item.model]"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <!-- 预置：时间日期时间段选择器 -->
        <el-form-item
          v-if="item.type == 'DateTimePicker'"
          :key="key"
          :label="item.label"
        >
          <el-date-picker
            v-model="form[item.model]"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <!-- 预置：文本 -->
        <el-form-item
          v-if="item.type == 'text'"
          :key="key"
          :label="item.label"
          :prop="item.model"
        >
          <p :style="item.style">{{ form[item.model] }}</p>
        </el-form-item>
      </template>
      <el-form-item label="">
        <el-button
          type="primary"
          :loading="loading"
          @click="search"
        >查询</el-button>
        <el-button class="reset-btn" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 搜索参数初始化
import { Search } from '../const'
export default {
  name: 'Search',
  data() {
    return {
      // ----- 内部赋值变量 -----
      loading: false, // 查询按钮是否加载中
      normalizer(node) {
        return {
          id: node.id,
          label: node.label,
          children: node.children && node.children.length ? node.children : 0
        }
      },
      // ----- end ------

      // ----- 外部赋值变量 -----
      formItemList: Search.formItemList,
      form: Search.model()
      // ----- end -----
    }
  },
  computed: {},
  mounted() {},
  methods: {
    // 查询
    search() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
      this.$emit('search', this.form)
    },
    // 重置
    reset() {
      this.form = Search.model()
    }
  }
}
</script>
<style scoped>
.w200 {
  width: 200px;
}
</style>
