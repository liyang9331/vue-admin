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
            :disabled="item.disabled"
            :type="item.inputType"
            :placeholder="item.placeholder"
            clearable
          />
        </el-form-item>
        <!-- 预置：远程搜索 -->
        <el-form-item
          v-if="item.type == 'remoteSearch'"
          :key="key"
          :label="item.label"
        >
          <el-autocomplete
            v-model="otherModel[item.otherModel]"
            clearable
            :disabled="item.disabled"
            :fetch-suggestions="(queryString, cb)=>{item.querySearchAsync(queryString, cb,form,item)}"
            :placeholder="item.placeholder"
            @select="(data)=>{item.handleSelect(data,form,item)}"
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
            clearable
            :disabled="item.disabled"
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
            clearable
            :disabled="item.disabled"
            style="width: 150px"
            :placeholder="item.placeholder"
            :multiple="false"
            :options="item.data"
            :normalizer="normalizer"
          />
        </el-form-item>
        <!-- 预置：日期世间选择器 -->
        <el-form-item v-if="item.type === 'dateTimePicker'" :key="key" :label="item.label">
          <el-date-picker
            v-model="otherModel[item.model]"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            popper-class="time-interval-popper"
            @change="(value)=>{item.change(value,form,item)}"
          />
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
      form: Search.model(),
      // ----- end -----
      otherModel: Search.otherModel()
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
