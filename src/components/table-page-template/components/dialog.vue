<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    width="700px"
    :close-on-click-modal="false"
    @close="cancel"
  >
    <!-- template start -->
    <!-- template end -->
    <span slot="footer">
      <el-button class="reset-btn" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confrim">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  mixins: [],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogTitle: '关联算法'
    }
  },
  computed: {},
  mounted() {},
  methods: {
    // 取消
    cancel() {
      this.$emit('cancel', false)
    },
    // 确认
    confrim() {

    }
  }
}
</script>
<style scoped>
.notice {
  margin-left: 110px;
  margin-bottom: 10px;
}
</style>
