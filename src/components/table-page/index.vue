<template>
  <div class="app-container">
    <search @search="search" />
    <el-divider />
    <el-row class="mt20 flex">
      <el-button
        type="info"
        class="textBtn"
        @click="toAdd"
      ><svg-icon class="mr10" icon-class="add" />添加算法模型</el-button>
      <!-- <el-button v-if="permissions.equipment_export" type="info" class="textBtn mr10" @click="toDownload"><i class="el-icon-download mr10" />下载模板</el-button> -->
      <el-upload
        class="upload-demo mr10"
        action="#"
        accept=".xls"
        :auto-upload="true"
        :show-file-list="false"
        :http-request="toBatchImport"
      >
        <!-- <el-button v-if="permissions.equipment_import" slot="trigger" type="info" class="textBtn"><svg-icon class="mr10" icon-class="batch_import" />批量导入</el-button> -->
      </el-upload>
      <!-- <el-button v-if="permissions.equipment_export" type="info" class="textBtn" @click="toBatchExport"><svg-icon class="mr10" icon-class="batch_export" />批量导出</el-button>
      <el-button v-if="permissions.equipment_batchAllow" type="info" class="textBtn" :disabled="ids.length==0" @click="toBatchAllow"><svg-icon class="mr10" icon-class="batch_allow" />批量允许</el-button>
      <el-button v-if="permissions.equipment_batchRefuse" type="info" class="textBtn" :disabled="ids.length==0" @click="toBatchRefuse"><svg-icon class="mr10" icon-class="batch_refuse" />批量拒绝</el-button> -->
    </el-row>
    <div class="mt20">
      <!-- 表格 -->
      <table-base
        :height-box="460"
        :list="tableData"
        :columns="columns"
        :events="baseEvents"
      >
        <template v-slot:[actionpos]>
          <el-table-column type="selection" width="55" fixed="left" />
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <!-- v-if="scope.row.isAccess == '1'" -->
              <el-button
                type="text"
                class="blue"
                @click="handleTinymce(scope.row)"
              >详情</el-button>
              <el-button
                type="text"
                class="orange"
                @click="toEdit(scope.row)"
              >编辑</el-button>
              <!-- v-if="scope.row.isAccess == '1'" -->
              <el-button
                type="text"
                class="red"
                @click="toDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </template>
      </table-base>
    </div>
    <!-- 分页 -->
    <Pagination
      v-show="total > 0"
      :total="total"
      layout="total, jumper, prev, pager, next, sizes"
      :page="params._index"
      :limit="params._size"
      @pagination="pagination"
    />
    <edit :cur-info="curInfo" :flag="flag" @reset="reset" />
    <tinymce v-if="tinymceShow" :content="tinymceContent" @cancel="(data)=>{tinymceShow=data}" />
  </div>
</template>

<script>
import { columns, listProcess } from './const'
import tableMixins from './mixins/tableMixins'
import search from './components/search.vue'
import edit from './components/edit.vue'
import { getModelList } from '@/api/algorithmModel'
import { getDict } from '@/api/dict.js'
import { downloadFile } from '@/utils/download'
import { mapGetters } from 'vuex'
import { objectEmpty } from '@/utils/index'
import tinymce from './components/tinymce.vue'
import { deletionAlgorithmModel } from '@/api/algorithmModel'
export default {
  components: {
    search,
    edit,
    tinymce
  },
  mixins: [tableMixins],
  data() {
    return {
      actionpos: 'after',
      columns,
      baseEvents: {
        'selection-change': this.handleSelectionChange
      },
      numberTypeList: [],
      factoryTypeList: [],
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters('permissions', ['permissions']),
    ids() {
      return this.selectionList.map((item) => item.id)
    }
  },
  mounted() {
    this.getInit()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val.map((v) => v.id)
    },
    // 获取字典值
    getInit() {
      this.numberTypeList = getDict('number_type')
      this.factoryTypeList = getDict('factory_type')
    },
    init() {
      getModelList({ ...this.params, ...objectEmpty(this.searchOption) }).then((res) => {
        const list = res.data.list || []
        // listProcess(list, {
        //   numberTypeList: this.numberTypeList,
        //   factoryTypeList: this.factoryTypeList
        // })
        this.tableData = list
        this.total = parseInt(res.data.total) || 0
      })
    },
    toDelete(row) {
      const params = { id: row.id }
      this.$confirm(
        '确定删除吗？',
        ' ',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        deletionAlgorithmModel(params).then((res) => {
          if (res.status === 200) {
            this.$message.success('删除成功')
            this.init()
          }
        })
      })
    },
    toDownload() {
      window.open(
        'https://sppt.chfatech.com/file/importFile/%E8%AE%BE%E5%A4%87%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xls',
        '_parent'
      )
    },
    // 导出
    toBatchExport() {
      const params = {
        ids: this.multipleSelection
      }
      exportExcel(params).then((res) => {
        downloadFile(res)
      })
    },
    // 导入
    toBatchImport(data) {
      importExcel(data.file).then((res) => {
        if (res.status == 200) {
          this.$message.success('导入成功！')
          this.init()
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    toBatchAllow(row) {
      if (row) {
        this.ids.push(row.id)
      }
      const params = {
        ids: this.ids,
        isAccess: 1
      }
      batchAccess(params).then((res) => {
        if (res.status == 200) {
          this.$message.success('操作成功！')
          this.init()
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    toBatchRefuse(row) {
      if (row) {
        this.ids.push(row.id)
      }
      const params = {
        ids: this.ids,
        isAccess: 0
      }
      batchAccess(params).then((res) => {
        if (res.status == 200) {
          this.init()
          this.$message.success('操作成功！')
        } else {
          this.$message.warning(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tabsSelect {
  margin-bottom: 20px;
}
</style>
