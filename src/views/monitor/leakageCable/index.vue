<template>
  <!-- 漏缆实时状态 -->
  <div class="leakage-cable">
    <div class="leakage-top">
      <div style="color: #666666"></div>
      <div class="operate-btn">
        <el-button type="primary" @click="refresh">刷新</el-button>
        <el-button type="primary" @click="isQuery = !isQuery">查询</el-button>
        <el-button type="primary" @click="toExport">导出</el-button>
      </div>
    </div>
    <div v-if="isQuery">
      <search @search="search" ref="reset" />
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="calc(88vh - 150px)"
      :cell-class-name="cellClassFn"
      :header-cell-style="{ background: '#EAF1FE', color: '#666666' }"
    >
      <el-table-column type="index" label="序列号" width="100" align="center" />
      <el-table-column
        prop="siteName"
        label="基站名称"
        width="180"
        align="center"
      />
      <el-table-column
        prop="alarmTarget"
        label="告警对象"
        width="180"
        align="center"
      />
      <el-table-column
        prop="alarmLevelName"
        label="告警级别"
        width="150"
        align="center"
      />
      <el-table-column prop="alarmInfo" label="告警信息" align="center">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.alarmInfo" :key="index" :class="levelStyle[item.level]">
            <span>距离：{{ item.distance }}</span>&nbsp;&nbsp;
            <span>驻波比：{{ item.value }}</span>
          </div>
          <div>漏缆百米损耗： {{ scope.row.lossValue }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="lateUploadTime"
        label="最新上传时间"
        align="center"
      />
    </el-table>
    <Pagination
      :limit="params.size"
      :page="params.curent"
      :total="total"
      class="pagination"
      @pagination="handlePageChange"
    />
  </div>
</template>

<script>
import { CableStatusList } from '../api'
import { ConnectStatusEnum, levelStyle } from '@/const/index'
import search from './components/search.vue'
import { exportLeakyCableTime } from '@/api/export'
import download from '@/utils/download'
import { successAlert, warningAlert } from '@/utils/alert'
export default {
  components: { search },
  data() {
    return {
      ConnectStatusEnum,
      levelStyle,
      params: {
        curent: 1,
        size: 10
      },
      total: 10,
      tableData: [],
      isQuery: false,
      istrue: 0,
      searchOption: {},
      exids: []
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 表格背景图颜色
    cellClassFn({ row, column, rowIndex, columnIndex }) {
      if (row.alarmLevelName === '紧急' && column.label === '告警级别') {
        return 'emergency'
      } else if (row.alarmLevelName === '重要' && column.label === '告警级别') {
        return 'important'
      } else if (row.alarmLevelName === '一般' && column.label === '告警级别') {
        return 'common'
      } else if (row.alarmLevelName === '正常' && column.label === '告警级别') {
        return 'normal'
      }
      if (rowIndex % 2 === 1) {
        return 'stripe'
      }
    },
    refresh() {
      this.searchOption = {}
      this.$refs.reset !== undefined
        ? this.$refs.reset.reset()
        : this.getTableData()
    },
    handlePageChange(pageData) {
      this.params.size = pageData.size
      this.params.curent = pageData.page
      this.getTableData()
    },
    search(option) {
      this.istrue = 1
      this.searchOption = option
      this.getTableData()
    },
    getTableData() {
      let params = {
        ...this.params,
        ...this.searchOption,
      }
      CableStatusList(params).then((res) => {
        let list = res.records || []
        this.tableData = list
        list.forEach(item => {
          if (item.alarmInfo !== '' && item.alarmInfo != null) {
            item.alarmInfo = JSON.parse(item.alarmInfo)
            item.lossValue = eval(item.alarmInfo.map(k => k.lossValue).join('+'))
          }
        })
        this.total = res.records.length
        this.exids = list.map(i => i.id)
        if (this.istrue === 1) {
          if (this.tableData.length !== 0) {
            successAlert('操作成功')
          } else {
            warningAlert('查询结果为空')
          }
          this.istrue = 0
        }
      })
    },
    toExport() {
      if (this.exids.length === 0) {
        this.$message.warning('暂无数据')
        return false
      } else {
        exportLeakyCableTime({ ids: this.exids }).then((res) => {
          download(res, 'vnd.ms-excel', `漏缆实时.xls`)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.leakage-cable {
  .leakage-top {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  & ::v-deep .cell {
    color: #333333;
  }
  .message {
    line-height: 22px;
  }
  .red {
    color: red;
  }
  .green {
    color: green;
  }
  .black {
    color: black;
  }
  & ::v-deep .stripe {
    background-color: #eaf1fe;
  }
  & ::v-deep .emergency {
    background-color: #f00!important;
  }
  & ::v-deep .important {
    background-color: #f89850!important;
  }
  & ::v-deep .common {
    background-color: #ead906!important;
  }
  & ::v-deep .normal {
    background-color: green!important;
  }
  .page {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    .curent {
      margin: 0 20px;
    }
  }
}
</style>
