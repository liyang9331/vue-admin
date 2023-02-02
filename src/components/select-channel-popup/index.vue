<template>
  <el-dialog title="选择通道" :visible="isshow" center @close="cancel(false)">
    <el-row type="flex" justify="space-between" style="height: 460px">
      <el-col :span="11" class="tree-parent">
        <!-- 通道树 -->
        <channelTree ref="channelTree" :is-single-choice="true" @handle="channelTreeCallback" />
      </el-col>
      <el-col :span="11" class="tree-selecl">
        <!-- 通道 -->
        <div style="padding: 20px">
          <div>
            <span style="font-size: 16px">已选通道:</span>
          </div>
          <div class="btn-group">
            <div
              v-for="(item, key) in options"
              :key="key"
              style="margin-bottom: 14px"
              class="btn"
            >
              <span>{{ item.label }}</span>
              <i
                class="el-icon-error"
                style="color: #707070; size: 18px"
                @click="remove(key, item)"
              />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer flex-center">
      <el-button
        class="reset-btn"
        @click.native="cancel(false)"
      >取 消</el-button>
      <el-button
        style="width: 108px"
        type="primary"
        @click.native="confim()"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import channelTree from '@/components/channel-tree/index.vue'

export default {
  // 组件
  components: {
    channelTree
  },
  // 父组件传参参数
  props: {
    isshow: {
      type: Boolean,
      default: false
    },
    type: {
      type: [Number, String],
      default: 1
    }
  },
  // 数据
  data() {
    return {
      options: null
    }
  },
  // 实例方法
  methods: {
    // 通道树组件回调
    channelTreeCallback(data) {
      this.options = data
    },
    remove(key, item) {
      const array = this.$refs.channelTree.$refs.tree.getCheckedKeys(true)
      array.splice(array.indexOf(item.id), 1)
      this.$refs.channelTree.$refs.tree.setCheckedKeys(array)
      this.options.splice(key, 1)
    },
    cancel(val) {
      this.$emit('update:isshow', val)
    },
    // 确定
    confim() {
      if (this.options != null) {
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
.tree-parent {
  border: 1px solid var(--border);
  height: 100%;
  display: block !important;
  border-radius: 4px;
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
  max-height: 400px;
  overflow: scroll;
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
