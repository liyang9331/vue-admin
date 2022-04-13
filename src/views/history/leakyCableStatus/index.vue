<template>
  <!-- 漏缆监测历史状态 -->
  <div class="leakage-cable">
    <div class="leakage-top">
      <div style="color: #666666"></div>
      <div class="operate-btn">
        <delids :multipleSelection2="multipleSelection" @del="deleteCable"
          >删除</delids
        >
        <el-button type="primary" @click="refresh">刷新</el-button>
        <el-button type="primary" @click="isQuery = !isQuery">查询</el-button>
        <el-button type="primary" @click="toExport">导出</el-button>
        <el-button
          :type="multipleSelection.length ? 'primary' : 'info'"
          :disabled="!multipleSelection.length"
          >图形报表
        </el-button>
      </div>
    </div>
    <div v-if="isQuery">
      <search @search="search" ref="reset" />
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      :cell-class-name="cellClassFn"
      :header-cell-style="{ background: '#EAF1FE', color: '#666666' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="siteName" label="基站名称" align="center" />
      <el-table-column prop="alarmTarget" label="告警对象" align="center" />
      <el-table-column prop="alarmInfo" label="告警信息" align="center">
      </el-table-column>
      <el-table-column prop="uploadTime" label="上传日期" align="center" />
      <el-table-column label="图形分析" align="center">
        <el-button type="text">生成图表</el-button> </el-table-column
      >>
    </el-table>
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
import { MonitorStatusList, MonitorStatusDelete } from "../api";
import search from "./components/search.vue";
import download from "@/utils/download";
import { exportLeakyStatusHistory } from "@/api/export";
import { successAlert, warningAlert } from "@/utils/alert";
export default {
  data() {
    return {
      params: {
        current: 1,
        size: 10,
      },
      total: 10,
      tableData: [],
      multipleSelection: [],
      isQuery: false,
      istrue:0,
      searchOption: {},
      exids: [],
    };
  },
  components: {
    search,
  },
  methods: {
    // 表格背景图颜色
    cellClassFn({ row, column, rowIndex, columnIndex }) {
      if (row.level === "紧急" && column.label === "告警级别") {
        return "emergency";
      } else if (row.level === "重要" && column.label === "告警级别") {
        return "important";
      } else if (row.level == "一般" && column.label == "告警级别") {
        return "common";
      }
      if (rowIndex % 2 === 1) {
        return "stripe";
      }
    },
    handlePageChange(pageData) {
      this.params.size = pageData.size;
      this.params.current = pageData.page;
      this.getTableData();
    },
    refresh() {
      this.$refs.reset != undefined
        ? this.$refs.reset.reset()
        : this.getTableData();
    },
    search(option){
      this.istrue=1
      this.searchOption = option
      this.getTableData()
    },
    getTableData() {
      let params = {
        ...this.params,
        ...this.searchOption,
      };
      MonitorStatusList(params).then((res) => {
        let list = res.records || [];
        this.tableData = list;
        this.total = res.total;
        this.exids = list.map((i) => i.id);
      });
    },
    handleSelectionChange(val) {
      let deleteIds = val.map((item) => item.id);
      this.multipleSelection = deleteIds;
    },
    deleteCable() {
      MonitorStatusDelete({ ids: this.multipleSelection }).then((res) => {
        this.$message.success("删除成功！");
        this.getTableData();
      });
    },
    toExport() {
      if (this.exids.length == 0) {
        this.$message.warning("暂无数据");
        return false;
      } else {
        exportLeakyStatusHistory({ ids: this.exids }).then((res) => {
          download(res, "vnd.ms-excel", `漏缆监测历史状态.xls`);
        });
      }
    },
  },
  mounted() {
    this.getTableData();
  },
};
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
    background-color: #f00;
  }
  & ::v-deep .important {
    background-color: #f89850;
  }
  & ::v-deep .common {
    background-color: #ead906;
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
