<template>
  <div class="el-select-tree">
    <el-row class="tree_header mb10">
      <el-select v-model="value" placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.label"
          :value="+item.id"
        >
        </el-option>
      </el-select>
      <el-button
        class="ml10"
        type="primary"
        icon="el-icon-s-unfold"
        size="mini"
        v-if="isOpen == true"
        @click="toOpen"
        >收起</el-button
      >
      <el-button
        class="ml10"
        type="primary"
        icon="el-icon-s-unfold"
        size="mini"
        v-else
        @click="toOpen"
        >展开</el-button
      >
      <el-button
        class="ml10"
        type="primary"
        size="mini"
        icon="el-icon-refresh-right"
        @click="getInit"
        >刷新</el-button
      >
    </el-row>
    <el-scrollbar>
      <el-tree
        v-loading="loading"
        v-if="openOrNot"
        ref="vuetree"
        :props="defaultProps"
        :data="data"
        :render-content="renderContent"
        :default-expand-all="isOpen"
        nodeKey="id"
        class="el-tree"
        current-node-key="id"
        :expand-on-click-node="false"
        @node-click="handleClick"
      >
        <!--  :current-node-key='id' -->
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getTree } from "@/api/baseData";

export default {
  data() {
    return {
      value: 0,
      options: [
        {
          id: 0,
          label: "手动监控",
        },
        {
          id: 1,
          label: "自动监控",
        },
      ],
      data: [],
      isOpen: true,
      openOrNot: true,
      defaultProps: {
        children: "children",
        label: "label",
      },
      loading: false,
      treeClickCount: 0
    };
  },
  name: "org-tree",
  computed: {
    ...mapGetters("tree", ["treeData"]),
  },
  mounted() {
    this.getInit();
  },
  methods: {
    toOpen() {
      this.isOpen = !this.isOpen;
      this.openOrNot = false;
      setTimeout(() => {
        this.openOrNot = true;
      }, 10);
    },
    handleClick(data, node) {
      this.treeClickCount++;
      if (this.treeClickCount >= 2) {
        return 
      }
      this.timer = window.setTimeout(() => {
        if (this.treeClickCount == 1) {
          this.treeClickCount = 0;
          this.$emit("selectItem", data);
        } else if (this.treeClickCount > 1) {
          //把次数归零
          this.treeClickCount = 0;
          this.$emit('dblClick', data, node)
        }
      }, 300)
      
    },
    getInit() {
      this.loading = true;
      getTree().then((res) => {
        this.loading = false;
        let list = res || [];
        this.data = list;
        if (this.data[0]) {
          this.$emit("defaultSite", this.data[0].id);
        }
      });
    },
    renderContent(h, { node, data, store }) {
      return (
        <div>
          <span style="padding-right:10px;">
            <span style={{ marginRight: "5px", fontSize: "16px" }}>
              <svg-icon icon-class={data.iconName} />
            </span>
            <span style={{ marginRight: "5px", fontSize: "16px" }}>
              {node.label}
            </span>
          </span>
        </div>
      );
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/variables";

.el-select-tree {
  width: 300px;
  height: calc(100vh - 56px);
  background: rgba(255, 255, 255, 1);
  .tree_header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 44px;
    background: rgba(196, 214, 255, 0.39);
    opacity: 1;
    box-sizing: border-box;
  }

  // border: 1px dotted;
  // display: inline-block;
}
.el-tree-node.is-current > .el-tree-node__content {
  background-color: #deeaff !important;
}
</style>