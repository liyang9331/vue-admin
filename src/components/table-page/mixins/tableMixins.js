export default {
  data() {
    return {
      curInfo: {},
      tableData: [],
      selectionList: [],
      flag: 0,
      total: 0,
      searchOption: {},
      params: {
        _size: 10,
        _index: 1
      },
      loading: false,
      tinymceShow: false, // 富文本编辑器显示
      tinymceContent: ''
    }
  },
  created() {
    this.init && this.init()
  },
  methods: {
    search(option) {
      this.params._index = 1
      this.searchOption = {
        ...this.searchOption,
        ...option
      }
      this.init && this.init()
    },
    makeParams(options = {}) {
      const params = {
        ...this.searchOption,
        ...options,
        list_arg: {}
      }
      const pageNum = this.params._index || 1
      // 在某一页更改数据确认 eg:在3页 点击某条数据修改确认之后还是第三页得数据 start count字段可更改
      params.list_arg.start = (pageNum - 1) * this.params._size
      params.list_arg.count = this.params._size
      return params
    },
    pagination(options) {
      this.params._index = options.pageNum ? options.pageNum : this.params._index
      this.params._size = options.pageSize ? options.pageSize : this.params._size
      if (!options.pageNum && !options.pageSize) return
      this.init && this.init()
    },
    pagePrev() {
      this.params._index--
      this.init && this.init()
    },
    pageNext() {
      this.params._index++
      this.init && this.init()
    },
    handleSelectionChange(val) {
      this.selectionList = val
    },
    // 新增按钮
    toAdd(options) {
      this.flag = 1
      this.curInfo = {
        ...options
      }
    },
    // 编辑
    toEdit(row) {
      this.flag = 2
      this.curInfo = row
    },
    reset(needRefresh) {
      this.flag = 0
      if (needRefresh) {
        this.init()
      }
    },
    checkResponseData(data) {
      if (!data || !data.length) {
        this.$message.warning('没有数据')
      }
    },
    handleTinymce(data) {
      this.tinymceContent = data.description
      this.tinymceShow = true
    }
  }
}
