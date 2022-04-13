<template>
  <el-button
    :type="multipleSelection.length ? 'primary' : 'info'"
    :disabled="!multipleSelection.length"
    @click="del()"
    >删 除</el-button
  >
</template>
<script>
import { warningAlert } from "../../utils/alert";

export default {
  props: {
    multipleSelection2: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {
      multipleSelection: [],
    };
  },
  watch: {
    multipleSelection2: {
      immediate: true,
      handler(newV) {
        this.multipleSelection = !!newV
        this.multipleSelection = this.multipleSelection2
      },
    },
  },
  methods: {
    del() {
      this.$confirm('继续操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit("del")
      }).catch(() => {
        warningAlert("取消删除")
      });
    },
  },
};

</script>
<style scoped>
</style>