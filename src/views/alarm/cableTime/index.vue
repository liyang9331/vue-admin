<template>
  <!-- 漏缆监测告警 -->
  <div class="leakage-cable">
    <el-button-group>
      <el-button
        v-for="item in tabs"
        :key="item.key"
        :type="confirmStatus === item.key ? 'primary' : ''"
        @click="changeType(item)"
      >{{ item.label }}</el-button>
    </el-button-group>
    <div class="leakage-top">
      <div style="color: #666666" />
      <div class="operate-btn">
        <el-button type="primary" @click="refresh">刷新</el-button>
        <el-button type="primary" @click="isQuery = !isQuery">查询</el-button>
        <el-button type="primary" @click="exportList">导出</el-button>
      </div>
    </div>
    <div v-show="isQuery">
      <search ref="reset" @search="search" />
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
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
      <el-table-column
        prop="alarmInfo"
        label="告警信息"
        align="center"
      >
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
        width="200"
      />
      <el-table-column
        prop="statusTimeChange"
        label="状态变化时间"
        align="center"
        width="200"
      />
      <el-table-column prop="confirmPerson" label="确认人" width="100" align="center" />
      <el-table-column prop="confirmTime" label="确认时间" width="180" align="center" />
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="
              scope.row.confirmStatus === 1 && scope.row.alarmLevelName == '正常'
            "
            type="text"
            @click="cancel2(scope.row)"
          >取消</el-button>
          <el-button
            v-else-if="scope.row.confirmStatus === 0"
            type="text"
            @click="confirm2(scope.row)"
          >确认</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="告警详情"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <table style="margin: auto" class="device-detail-tb">
        <tr style="line-height: 50px">
          <td style="width: 150px">
            <label class="particulars">基站名称：</label>
          </td>
          <td style="width: 180px; text-align: left">
            <label v-text="dialogInfo.siteName" />
          </td>
        </tr>
        <tr style="line-height: 50px">
          <td style="width: 150px">
            <label class="particulars">告警对象：</label>
          </td>
          <td style="width: 180px; text-align: left">
            <label v-text="dialogInfo.alarmTarget" />
          </td>
        </tr>
        <tr style="line-height: 50px">
          <td style="width: 150px">
            <label class="particulars">告警级别：</label>
          </td>
          <td style="width: 180px; text-align: left">
            <label v-text="dialogInfo.alarmLevelName" />
          </td>
        </tr>
        <tr style="line-height: 50px">
          <td style="width: 150px">
            <label class="particulars">告警信息：</label>
          </td>
          <td style="width: 180px; text-align: left">
            <div v-for="(item, index) in dialogInfo.alarmInfo" style="font-weight:700" :key="index">
              <span>距离：{{ item.distance }}</span>&nbsp;&nbsp;
              <span>驻波比：{{ item.value }}</span>&nbsp;
            </div>
            <div style="font-weight:700">漏缆百米损耗： {{ dialogInfo.lossValue }}</div>
          </td>
        </tr>
        <tr style="line-height: 50px">
          <td style="width: 150px">
            <label class="particulars">最新上传时间：</label>
          </td>
          <td style="width: 180px; text-align: left">
            <label v-text="dialogInfo.lateUploadTime" />
          </td>
        </tr>
        <tr style="line-height: 50px">
          <td style="width: 150px">
            <label class="particulars">状态变化时间：</label>
          </td>
          <td style="width: 180px; text-align: left">
            <label v-text="dialogInfo.statusTimeChange" />
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="
            dialogInfo.confirmStatus === 1 && dialogInfo.alarmLevelName === '正常'
          "
          type="primary"
          @click="cancel(dialogInfo)"
        >取消告警</el-button>
        <el-button
          v-else-if="dialogInfo.confirmStatus !== 1"
          type="primary"
          @click="confirm(dialogInfo)"
        >确认告警</el-button>
      </span>
    </el-dialog>
    <Pagination
      :limit="params.size"
      :page="params.current"
      :total="total"
      class="pagination"
      @pagination="handlePageChange"
    />
  </div>
</template>

<script>
import { cableTimeList, cableConfirm, cableCancel } from '../api'
import { exportLeakyCable } from '@/api/export'
import search from '@/views/monitor/leakageCable/components/search.vue'
import download from '@/utils/download'
import { successAlert, warningAlert } from '@/utils/alert'
import { levelStyle } from '@/const/index'
export default {
  components: { search },
  data() {
    return {
      confirmStatus: 0,
      dialogInfo: [],
      centerDialogVisible: false,
      params: {
        current: 1,
        size: 10
      },
      total: 10,
      tableData: [],
      tabs: [
        {
          label: '未确认',
          key: 0
        },
        {
          label: '已确认',
          key: 1
        }
      ],
      isQuery: false,
      istrue: 0,
      searchOption: {},
      exids: [],
      levelStyle
    }
  },
  mounted() {
    this.getTableData()
  },
  created() {
    console.log(this.$route.query)
    this.searchOption = this.$route.query
  },
  methods: {
    // 表格背景图颜色
    cellClassFn({ row, column, rowIndex, columnIndex }) {
      if (row.alarmLevelName === '紧急' && column.property === 'alarmLevelName') {
        return 'emergency'
      } else if (row.alarmLevelName === '重要' && column.property === 'alarmLevelName') {
        return 'important'
      } else if (row.alarmLevelName === '一般' && column.property === 'alarmLevelName') {
        return 'common'
      } else if (row.alarmLevelName === '正常' && column.property === 'alarmLevelName') {
        return 'normal'
      }
      if (rowIndex % 2 === 1) {
        return 'stripe'
      }
    },
    refresh() {
      this.$refs.reset !== undefined
        ? this.$refs.reset.reset()
        : this.getTableData()
    },
    handlePageChange(pageData) {
      this.params.size = pageData.size
      this.params.current = pageData.page
      this.getTableData()
    },
    search(option) {
      this.istrue = 1
      this.searchOption = option
      this.getTableData()
    },
    getTableData() {
      let param = {
        confirmStatus: this.confirmStatus,
        ...this.params,
        ...this.searchOption
      }
      cableTimeList(param).then((res) => {
        let list = res.records || []
        list.forEach(item => {
          if (item.alarmInfo !== '' && item.alarmInfo != null) {
            item.alarmInfo = JSON.parse(item.alarmInfo)
            item.lossValue = eval(item.alarmInfo.map(k => k.lossValue).join('+'))
          }
        })
        this.tableData = list
        this.total = res.total
        this.exids = list.map(i => i.id)
        if (this.istrue == 1) {
          if (this.tableData.length != 0) {
            successAlert('操作成功')
          } else {
            warningAlert('查询结果为空')
          }
          this.istrue = 0
        }
      })
    },
    confirm(dialogInfo) {
      let id = dialogInfo.id
      cableConfirm({ id: id }).then((res) => {
        this.getTableData()
        this.$store.dispatch('alarm/getCableTime')
      })
      this.centerDialogVisible = false
    },
    confirm2(row) {
      this.centerDialogVisible = true
      this.dialogInfo = row
    },
    cancel(dialogInfo) {
      let query = {
        alarmLevelName: dialogInfo.alarmLevelName,
        id: dialogInfo.id
      }
      cableCancel(query).then((res) => {
        this.getTableData()
      })
      this.centerDialogVisible = false
    },
    cancel2(row) {
      this.centerDialogVisible = true
      this.dialogInfo = row
    },
    changeType(item) {
      this.confirmStatus = item.key
      this.getTableData()
    },

    exportList() {
      if (this.exids.length === 0) {
        this.$message.warning('暂无数据')
        return false
      } else {
        exportLeakyCable({ ids: this.exids }).then((res) => {
          download(res, 'vnd.ms-excel', `漏缆监测告警.xls`)
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
    .pageNum {
      margin: 0 20px;
    }
  }
}
</style>
