<template>
  <div class="parent">
    <el-input
      v-model="filterText"
      placeholder="搜索"
      style="height: auto !important"
    />
    <!-- 绝对定位 -->
    <el-scrollbar class="scrollbar">
      <el-tree
        ref="tree"
        :filter-node-method="filterNode"
        :data="regionDataChannel"
        :props="props"
        :lazy="false"
        :default-expand-all="false"
        :default-expanded-keys="[0]"
        :show-checkbox="true"
        node-key="id"
        class="tree"
        @check="nodeClick"
      >
        <span
          v-if="data.type==1"
          slot-scope="{ node, data }"
          class="custom-tree-node"
        >
          <span>{{ node.label }}({{ data.channelNum }})</span>
        </span>
        <span v-else slot-scope="{ node, data }" class="custom-tree-node">
          <span style="margin-right: 15px">
            <svg-icon
              class="svg"
              :icon-class="data.status == 1 ? 'camera-ok' : 'camera-error'"
            />
          </span>
          <!-- 名称 -->
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script>
import * as api from '@/api/equipment'
import { mapGetters } from 'vuex'

export default {
  // 父组件传参参数
  props: {
    //   是否多选
    isSingleChoice: {
      type: Boolean,
      default: true
    }
  },
  // 数据
  data() {
    return {
      props: {
        label: 'label',
        children: 'children'
      },
      options: [],
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setDisabled(this.regionDataChannel)
    })
  },
  computed: {
    ...mapGetters('tree', ['regionTreeData', 'regionDataChannel'])
  },
  // 实例方法
  methods: {
    // 节点过滤
    filterNode(value, data, node) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    //  向有children的节点上增加disabled属性
    setDisabled(treeData) {
      treeData.forEach((item) => {
        // 含有 children 属性
        if (item.children) {
          item.disabled = true
          this.setDisabled(item.children)
        }
      })
    },
    nodeClick(data) {
      if (this.isSingleChoice === false) {
        //   单选
        this.$refs.tree.setCheckedKeys([data.id])
        this.$emit('handle', data)
      } else {
        const arr = this.$refs.tree.getCheckedNodes()
        // console.log(arr)
        const result = arr.filter(item => item.type == 2)
        if (result.length > 16) {
          this.$message({
            type: 'warning',
            message: '不能超过16个通道!'
          })
        } else {
          this.$emit('handle', result)
        }
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
::v-deep .el-input {
  padding: 10px;
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

  & ::v-depp .el-tree-node__content span:nth-child(1) {
    display: none;
  }
  /* 隐藏掉el-tree中有disabled属性的框框 */
  ::v-deep .el-checkbox__input.is-disabled {
    display: none;
  }
  ::v-deep .el-tree-node__content .is-leaf {
    display: none;
  }
}

::v-deep .el-dialog--center {
  width: 740px;
}

.tree-selecl {
  flex-wrap: wrap;
  border: 1px solid #ccc;
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
