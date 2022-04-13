<template>
  <div>
    <el-form class="search-form" :model="form" ref="form" label-width="80px" :inline="true" size="mini">
      <el-form-item label="基站名称" >
        <el-select v-model="form.siteId" placeholder="请选择基站名称" clearable >
          <el-option v-for="item in siteList"
            :key="item.id"
            :label="item.siteName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="告警对象">
        <el-input v-model="form.alarmTargetName" clearable placeholder="请输入网元设备"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success"  @click="toSearch">查询</el-button>
        <el-button type="primary"  @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { commonQuery } from '../../api'
export default {
  name: 'search',
  data() {
    return {
      siteList: [],
      alarmObj: [],
      form: formInit()
    }
  },
  mounted() {
    this.getInit()
  },
  methods: {
    toSearch() {
      this.$emit('search', this.form)
    },
    reset() {
      this.form = formInit()
      this.$emit('search')
    },
    getInit() {
      commonQuery().then(res => {
        this.siteList = res.siteList || []
        this.alarmObj = res.alarmObjectList || []
      })
    }
  }
}

function formInit() {
  return {
    alarmTargetName: null,
    siteId: null,
  }
}
</script>
<style scoped lang="scss">
.w200 {
  width: 200px;
}
.search-form {
  padding: 10px;
  background-color: #EAF1FE;
  margin-bottom: 20px;
  border-radius: 8px;
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
}
</style>