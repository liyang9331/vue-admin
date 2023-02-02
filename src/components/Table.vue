<template>
  <el-table class="table-fixed" :data="list" v-bind="tableAttrs" v-on="events" :height="heightBox" ref="table">
    <slot name="before"></slot>
    <el-table-column
      v-for="(column, index) in columns"
      :key="column.key || index"
      v-bind="column.attr || {}"
      :prop="column.prop"
      :label="column.label"
    >
      <template v-if="column.slot" v-slot:[column.slot]>
        <component :is="column[column.slot]"></component>
      </template>
      <template v-if="column.component" v-slot="context">
        <component
          v-bind:is="column.component"
          :context="context.row"
          v-on="column.events"
          v-bind="column.attrs"
        ></component>
      </template>
    </el-table-column>
    <slot name="after"></slot>
  </el-table>
</template>

<script>
import merge from 'lodash.merge'
// table表头设置
const tableDefaultConfig = {
  border: false,
  stripe: false,
  align: 'center',
  'header-cell-style': {
    textAlign: 'center',
    background: '#383838'
  },
  'cell-style': {
    textAlign: 'center',
    border: 0
  },
  'highlight-current-row': true
}

export default {
  props: ['columns', 'list', 'attrs', 'events', 'heightBox'],
  computed: {
    tableAttrs() {
      return merge({}, tableDefaultConfig, this.attrs || {})
    }
  }
}
</script>

<style scoped lang="scss">
.el-table :deep() th.gutter {
  display: table-cell !important;
}
.table-fixed {
  & ::v-deep .el-table__fixed-right {
    height: 100%!important;
  }
  & ::v-deep .el-table__fixed {
    height: 100%!important;
  }
}
::v-deep .el-table, .el-table__expanded-cell {
  background-color: transparent!important;
}
::v-deep .el-table th, .el-table tr {
  background-color: transparent!important;
}
::v-deep .el-table__body .el-table__row.hover-row td{
  background-color: var(--table-hover-bg)!important;
}

</style>
