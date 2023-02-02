<template>
  <div :class="{'hidden':hidden}" class="pagination-container clearfix">
    <el-pagination
      class="right"
      :background="background"
      :current-page="currentPage"
      :page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    pageNum: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.pageNum
      },
      set() {}
    },
    pageSize: {
      get() {
        return this.limit
      },
      set() {}
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { pageSize: val })
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { pageNum: val })
    }
  }
}
</script>

<style scoped>
.pagination-container {
  margin-top: 32px;
}
.pagination-container.hidden {
  display: none;
}
</style>
