<template>
  <div style="height: 100%">
    <el-input
      style="width: 96%; margin: 10px"
      v-model="filterText"
      placeholder="搜索"
      suffix-icon="el-icon-search"
    />
    <el-tree
      ref="tree"
      style="height: 85%; overflow-x: auto"
      :filter-node-method="filterNode"
      node-key="uuid"
      :data="data"
      :props="props"
      :lazy="false"
      default-expand-all
      :show-checkbox="false"
      class="tree user-tree"
      @node-click="handleCheckChange"
    >
      <!-- 父节点 -->
      <span
        v-if="data.isLeaf"
        slot-scope="{ node, data }"
        class="custom-tree-node"
      >
        <svg-icon :icon-class="data.icon" :class="data.class" />
        <span style="font-size: 14px">{{ node.label }}</span>
        <span style="font-size: 14px">{{
          '(' + (data.num == null ? 0 : data.num) + ')'
        }}</span>
      </span>
      <!-- 最后一级-子节点 -->
      <span v-else slot-scope="{ node, data }" class="custom-tree-node">
        <img
          v-if="data.avatarUrl != ''"
          :src="data.avatarUrl"
          alt=""
          srcset=""
          class="avatar"
        />
        <svg-icon v-else icon-class="avatar" class="avatar" />
        <!-- 名称 -->
        <span style="font-size: 14px">{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import * as api from '@/api/waring'
export default {
  // 数据
  data() {
    return {
      props: {
        label: 'label',
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
    this.query()
  },
  // 实例方法
  methods: {
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
        item.uuid = nanoid()
        if (item.children && item.children.length) {
          item.label = item.groupName
          item.disabled = true
          this.setDisabled(item.children)
        } else {
          item.label = item.channelName
        }
      })
    },
    // 重新组装标准树-数据
    assemble(treeData) {
      // 遍历
      const _this = this
      function getReturnNode(_array) {
        _array.forEach((item, key) => {
          // 当前层级是否是企业
          if (item.hasOwnProperty('orgName')) {
            item.label = item.orgName
            item.isLeaf = true
            item.icon = 'company'
            item.class = 'svg-company'
            // 企业是否包含子企业
            if (item.hasOwnProperty('children')) {
              // 企业包含子企业的同时是否包含子部门
              if (item.hasOwnProperty('depts')) {
                item.depts.forEach((itm, key) => {
                  item.children.push(itm)
                })
                item.num = item.children.length
                // 移除depts
                delete item.depts
                getReturnNode(item.children)
              } else {
                // 企业只包含子企业
                item.num = item.children.length
                getReturnNode(item.children)
              }
            }
            // 企业是否只包含子部门
            else if (item.hasOwnProperty('depts')) {
              item.children = item.depts
              item.num = item.children.length
              delete item.depts
              getReturnNode(item.children)
            }
          }
          // 当前层级是否是部门
          else if (item.hasOwnProperty('deptName')) {
            item.label = item.deptName
            item.isLeaf = true
            item.icon = 'department'
            item.class = 'svg-department'
            item.num = item.children.length
            getReturnNode(item.children)
          }
          // 当前层级是否是人员
          else if (item.hasOwnProperty('realName')) {
            item.label = item.realName
          }
        })
        // _this.data = Object.assign([], _this.data);
      }
      getReturnNode(treeData)
    },
    query() {
      api
        .getUserTree()
        .then((res) => {
          this.data = res.data
          this.assemble(this.data)
          //   this.setDisabled(this.data);
        })
        .catch((err) => { })
    },
    // 树选择回调
    handleCheckChange(data, checked) {
      this.$emit('handle', data)
    },
    cancel(val) {
      this.$emit('update:isshow', val)
    },
    // 确定
    confim() {
      if (this.options.length > 0) {
        this.$emit('handel', this.options)
        this.cancel(false)
      } else {
        this.$message({
          message: '请勾选！',
          type: 'warning'
        })
      }
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
  background: none !important;
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

/* 隐藏掉el-tree中有disabled属性的框框 */
::v-deep .el-checkbox__input.is-disabled {
  display: none;
}
</style>
