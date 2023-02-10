<template>
  <el-dialog
    :visible="true"
    width="900px"
    :close-on-click-modal="false"
    @close="cancel"
  >
    <VueTinymce
      v-model="model"
      :setup="setup"
      :setting="setting"
    />
  </el-dialog>
</template>

<script>

export default {
  name: 'Tinymce',
  props: {
    content: {
      typeof: String,
      default: ''
    }
  },
  data() {
    return {
      setting: {
        height: 600,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      },
      model: null
    }
  },
  computed: {},
  created() {
    this.model = this.content
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    setup(editor) {
      console.log(editor)
    },
    cancel() {
      this.$emit('cancel', false)
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
