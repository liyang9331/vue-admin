<template>
  <div class="parent">
    <el-input
      v-model="filterText"
      placeholder="搜索"
      style="height: auto !important"
    />
    <el-checkbox v-model="checkedAll" @change="selectAll">全选</el-checkbox>
    <!-- 绝对定位 -->
    <el-scrollbar class="scrollbar">
      <el-tree
        ref="tree"
        :filter-node-method="filterNode"
        :default-checked-keys="checkedKeys"
        :data="data"
        :props="props"
        :lazy="false"
        default-expand-all
        :show-checkbox="true"
        node-key="id"
        class="tree"
        :check-on-click-node="true"
        @check-change="handleCheckChange"
      >
        <span
          v-if="data.isLeaf"
          slot-scope="{ node, data }"
          class="custom-tree-node"
        >
          <span>{{ node.label }}</span>
        </span>
        <span v-else slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script>
import * as api from '@/api/system'

export default {
  // 父组件传参参数
  props: {
    //   是否多选
    isSingleChoice: {
      type: Boolean,
      default: true
    },
    checkedKeys: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: 'use'
    }
  },
  // 数据
  data() {
    return {
      props: {
        label: 'label',
        children: 'children'
      },
      data: [],
      options: [],
      filterText: '',
      checkedAll: false
    }
  },
  // 监听器
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.query()
  },
  // 实例方法
  methods: {
    selectAll() {
      if (this.checkedAll) { // 全选
        this.$nextTick(() => {    //这个如果要默认全选就必须加，否则会报错“setCheckedNodes”未定义
          this.$refs.tree.setCheckedNodes(this.data)
        })
        // this.
      } else { // 取消选中
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([])
        })
      }
    },
    // 节点过滤
    filterNode(value, data, node) {
      // 遍历
      function getReturnNode(node, _array, value) {
        const isPass =
          node.data && node.data.label && node.data.label.indexOf(value) !== -1
        isPass ? _array.push(isPass) : ''
        if (!isPass && node.level != 1 && node.parent) {
          getReturnNode(node.parent, _array, value)
        }
      }
      if (!value) {
        return true
      }
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
        // 含有 children 属性
        if (item.hasOwnProperty('children')) {
          item.label = item.name
          if (item.children.length > 0) {
            item.isLeaf = true
          }
          // item.disabled = true
          this.setDisabled(item.children)
        } else {
          item.label = item.name
        }
      })
    },
    query() {
      if (this.type == 'use') {
        api
          .getUseMenuTree({})
          .then((res) => {
            this.data = res.data
            this.setDisabled(this.data)
            this.$nextTick(() => {
              // 初始化渲染，会将 checkedKeys 中含有的父节点下的字节点全部选中
              // 解决：对比 checkedKeys 和 当前组件选中的节点keys数组，未包含的进行去选中状态
              const keys = this.$refs.tree.getCheckedKeys()
              keys.forEach(item => {
                if (this.checkedKeys.findIndex(obj => obj == item) == -1) {
                  this.$refs.tree.setChecked(item, false)
                }
              })
            })
          })
          .catch((err) => {})
      } else if (this.type == 'all') {
        api
          .getAllMenuTree({})
          .then((res) => {
            this.data = res.data
            this.setDisabled(this.data)
          })
          .catch((err) => {})
      }
    },
    // 树选择回调
    handleCheckChange(data, checked, node) {
      // 多选
      if (this.isSingleChoice === true) {
        this.$emit('handle', this.$refs.tree.getCheckedNodes(false, true))
      } else if (this.isSingleChoice === false) {
        //   单选
        this.$refs.tree.setCheckedKeys([data.id])
        this.$emit('handle', data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.parent {
  position: relative;
  height: 100%;
}
.scrollbar {
  position: absolute;
  width: 100%;
  height: 87%;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: unset;
}
.tree-parent {
  border: 1px solid var(--border);
  height: 100%;
  display: block !important;
  border-radius: 4px;
}

.tree {
  width: 100%;
  background: none !important;

  & ::v-deep .el-tree-node:hover {
    background: none !important;
  }

  & ::v-deep .el-tree-node__content:hover {
    background-color: transparent;
  }

  & ::v-deep .el-tree-node:focus > .el-tree-node__content {
    background-color: transparent;
  }
  & ::v-depp .el-tree-node__content > .is-leaf {
    display: inline-block !important;
    opacity: 0;
  }
  /* 隐藏掉el-tree中有disabled属性的框框 */
  ::v-deep .el-checkbox__input.is-disabled {
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
