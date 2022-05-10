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
        pageSize: 10,
        pageNum: 1
      },
      loading: false,
    }
  },
  created() {
    this.init && this.init()
  },
  methods: {
    search(option) {
      this.params.pageNum = 1
      this.searchOption = option
      this.init && this.init()
    },
    makeParams(options = {}) {
      let params = {
        ...this.searchOption,
        ...options,
        list_arg: {},
      }
      let pageNum = this.params.pageNum || 1
      // 在某一页更改数据确认 eg:在3页 点击某条数据修改确认之后还是第三页得数据 start count字段可更改
      params.list_arg.start = (pageNum - 1) * this.params.pageSize
      params.list_arg.count = this.params.pageSize
      return params
    },
    pagination(options) {
      this.params = {
        ...this.params,
        ...options
      }
      if (!options.pageNum && !options.pageSize) return
      this.init && this.init()
    },
    pagePrev() {
      this.params.pageNum--
      this.init && this.init()
    },
    pageNext() {
      this.params.pageNum++
      this.init && this.init()
    },
    handleSelectionChange(val) {
      this.selectionList = val
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
    }
  }
}
