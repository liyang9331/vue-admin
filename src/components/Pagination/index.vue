<template>
  <!-- 分页 -->
  <div class="pagination">
    <span class="text" style="color: #c9caec; font-size: 14px"
      >共查询{{ total }}条数据</span
    >
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="limit"
      layout="sizes, prev, pager, next,jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      required: true,
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 20, 30, 40, 50];
      },
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
      },
    },
    limit: {
      get() {
        return this.pageSize;
      },
      set(val) {
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, size: val });
    },
    handleCurrentChange(val) {
      // 解决有时切换每页显示条数时，偶尔会出现无数据的情况
      setTimeout(() => {
        this.$emit("pagination", { page: val, size: this.pageSize });
      }, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  &::v-deep .el-pagination {
    margin-top: 0;
    .el-input__inner {
      color: #ffffff;
      background: #17183c !important;
      border: 1px solid #5e64ff;
    }
    .btn-prev,
    .btn-next {
      background: #17183c !important;
      i {
        font-size: 20px;
        color: #c9caec;
      }
    }
    .btn-prev[disabled~="disabled"],
    .btn-next[disabled~="disabled"] {
      i {
        color: #72739b;
        font-size: 20px;
      }
    }
    // 数字按钮未选中样式
    .el-pager li {
      padding: 0;
      background-color: unset;
      color: #ffffff;
    }
    // 数字按钮选中样式
    .el-pager li[class~="active"] {
      padding: 0 !important;
      background-color: #5e64ff !important;
      border-radius: 4px !important;
    }
  }
}
</style>
