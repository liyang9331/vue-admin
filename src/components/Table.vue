<template>
  <el-table :data="list" size="mini" v-bind="tableAttrs" v-on="events" ref="table">
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
  border: true,
  stripe: true,
  align: 'center',
  'header-cell-style': {
    textAlign: 'center'
  },
  'cell-style': {
    textAlign: 'center'
  },
}

export default {
  props: ['columns', 'list', 'attrs', 'events'],
  computed: {
    tableAttrs() {
      return merge({}, tableDefaultConfig, this.attrs || {})
    }
  },
}
</script>

<style scoped>
.el-table :deep() th.gutter {
  display: table-cell !important;
}
</style>
