<template>
  <!-- 本组件完全自动化，如需增加新的表单项，请按照结构扩展 -->
  <el-dialog
    :title="editText"
    :visible.sync="visible"
    width="900px"
    :close-on-click-modal="false"
    @close="cancel"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="form-container"
      label-position="right"
      label-width="110px"
      size="normal"
    >
      <!-- template start flag:1,添加 flag:2,编辑-->
      <template v-for="(item, key) in formItemList">
        <!-- 预置：输入框 -->
        <el-form-item
          v-if="item.type == 'input'"
          :key="key"
          :label="item.label"
          :prop="item.model"
        >
          <el-input
            v-model="form[item.model]"
            :type="item.inputType"
            :disabled="item.disabled"
            :placeholder="item.placeholder"
            :rows="item.rows ? item.rows : 6"
            clearable
          />
        </el-form-item>
        <!-- 富文本编辑器 -->
        <el-form-item
          v-if="item.type == 'RichText'"
          :key="key"
          :label="item.label"
          :prop="item.model"
        >
          <VueTinymce
            v-model="form[item.model]"
            :setup="setup"
            :setting="setting"
          />
        </el-form-item>
        <!-- 预置：选择器 -->
        <el-form-item
          v-if="item.type == 'select'"
          :key="key"
          :label="item.label"
          :prop="item.model"
        >
          <el-select v-model="form[item.model]" :placeholder="item.placeholder">
            <el-option
              v-for="item in item.option"
              :key="item.dictValue"
              :disabled="item.disabled"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <!-- 预置：树形控器 -->
        <el-form-item
          v-if="item.type == 'tree'"
          :key="key"
          :label="item.label"
          :prop="item.model"
        >
          <treeselect
            v-model="form[item.model]"
            :disabled="item.disabled"
            style="width: 100%"
            :placeholder="item.placeholder"
            :multiple="false"
            :options="item.data"
            :normalizer="normalizer"
          />
        </el-form-item>
        <!-- 预置：文件上传 -->
        <el-form-item
          v-if="item.type == 'upload'"
          :key="key"
          :label="item.label"
          :prop="item.model"
        >
          <el-upload
            ref="upload"
            class="upload-demo mr10"
            action=""
            :multiple="false"
            :limit="1"
            :auto-upload="false"
            :show-file-list="false"
            :file-list="fileList"
            :disabled="item.disabled"
            :on-change="
              (file, files) => {
                fileList = files;
                item.fileChange(file, form, item.model);
              }
            "
          >
            <el-button slot="trigger" type="info" class="textBtn">
              <i class="el-icon-upload">上传</i>
            </el-button></el-upload>
          <!-- 文件列表 -->
          <div class="file-list">
            <span v-for="(item, index) in fileList" :key="item.url">
              <el-link
                class="file-link"
                :underline="false"
                icon="el-icon-link"
                type="primary"
                :href="item.url"
                target="_blank"
              >{{ item.name }}</el-link>
            </span>
          </div>
        </el-form-item>
      </template>
      <!-- template end -->
    </el-form>
    <span slot="footer">
      <el-button class="reset-btn" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confrim">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Form } from '../const'
// mixinsInit 是表单的混合初始化
import mixinsInit from '../mixins/dialogFormMixins'
const mixins = mixinsInit({
  defaultText: Form.text,
  formItemList: Form.formItemList,
  formInit: Form.model,
  rules: Form.rules,
  apiMap: {
    1: Form.api.add,
    2: Form.api.edit
  }
})
export default {
  name: 'Edit',
  mixins: [mixins],
  data() {
    return {
      setting: {
        height: 400,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      },
      fileList: [],
      // ----- 内部赋值变量 -----
      formItemList: Form.formItemList,
      normalizer(node) {
        return {
          id: node.id,
          label: node.label,
          children: node.children && node.children.length ? node.children : 0
        }
      },
      // ----- end ------

      // ----- 外部赋值变量 -----
      detectorStatusList: [],
      factoryList: []
      // ----- end -----
    }
  },
  computed: {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    setup(editor) {
      console.log(editor)
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
