<template>
  <div>
    <el-input
      v-model="filterText"
      placeholder="搜索"
      suffix-icon="el-icon-search"
    />
    <el-tree
      ref="tree"
      :filter-node-method="filterNode"
      check-strictly
      :data="data"
      node-key="id"
      :props="props"
      :lazy="false"
      default-expand-all
      :show-checkbox="true"
      check-on-click-node
      class="tree user-tree"
      @check="nodeClick"
    />
    <!-- @node-click="nodeClick" -->
  </div>
</template>
<script>
import { getRegionTree } from '@/api/region'
export default {
  // 数据
  data() {
    return {
      props: {
        label: 'groupName',
        children: 'children'
      },
      data: [],
      filterText: ''
    }
  },
  // 监听器
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    getRegionTree({}).then((res) => {
      this.data = res.data
      //   this.setDisabled(this.data);
    })
  },
  // 实例方法
  methods: {
    // 节点过滤
    filterNode(value, data, node) {
      // 遍历
      function getReturnNode(node, _array, value) {
        const isPass =
          node.data && node.data.groupName && node.data.groupName.indexOf(value) !== -1
        isPass ? _array.push(isPass) : ''
        if (!isPass && node.level != 1 && node.parent) {
          getReturnNode(node.parent, _array, value)
        }
      }
      if (!value) {
        return true
      }
      // let level = node.level;
      const _array = [] // 这里使用数组存储 只是为了存储值。
      getReturnNode(node, _array, value)
      let result = false
      _array.forEach((item) => {
        result = result || item
      })
      return result
    },
    //  向有children的节点上增加disabled属性
    setDisabled(treeData) {
      treeData.forEach((item) => {
        if (item.children && item.children.length) {
          item.label = item.groupName
          item.disabled = true
          this.setDisabled(item.children)
        } else {
          item.label = item.channelName
        }
      })
    },
    // 当复选框被点击的时候触发
    nodeClick(data, node) {
      const keys = []
      // 递归
      function nodeRecursion(nodes = new Object()) {
        keys.push(nodes.id)
        if (nodes.hasOwnProperty('children') && nodes.children.length > 0) {
          nodes.children.forEach((item, key) => {
            if (item.hasOwnProperty('children') && item.children.length > 0) {
              nodeRecursion(item)
            } else {
              keys.push(item.id)
            }
          })
        }
      }
      nodeRecursion(data)
      this.$refs.tree.setCheckedKeys(keys)
      this.$emit('handle', data)
    },
    cancel(val) {
      this.$emit('update:isshow', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-company {
  width: 26px;
}
.svg-department {
  width: 22px;
}
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 15px;
}

.tree-parent {
  border: 1px solid var(--border);
  height: 100%;
  display: block !important;
  border-radius: 4px;
}

.tree {
  width: 100%;
  height: 43vh;
  overflow: auto;
  background: none !important;
  /* 隐藏掉el-tree中有disabled属性的框框 */
  &::v-deep .el-checkbox__input.is-disabled {
    display: none !important;
  }
  & ::v-deep .is-leaf::before {
    display: none;
  }
  & ::v-deep .el-tree-node:hover {
    background: none !important;
  }
  & ::v-deep .el-tree-node__content {
    height: 30px;
  }
  & ::v-deep .el-tree-node__content:hover {
    background-color: transparent;
  }

  & ::v-deep .el-tree-node:focus > .el-tree-node__content {
    background-color: transparent;
  }

  & ::v-depp .el-tree-node__content span:nth-child(1) {
    display: none;
  }
}

::v-deep .el-dialog--center {
  width: 740px;
  height: 640px;
}

.tree-selecl {
  flex-wrap: wrap;
  border: 1px solid var(--border);
  height: 100%;
  display: block !important;
  border-radius: 4px;
}

.btn-group {
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 14px;

  & .btn {
    cursor: pointer;
    padding: 10px 14px;
    border-radius: 16px 16px 16px 16px;
    opacity: 1;

    & span {
      margin-right: 20px;
    }
  }
}

.svg {
  width: 24px;
}

.custom-tree-node {
  display: flex;
  align-items: center;
}
</style>
