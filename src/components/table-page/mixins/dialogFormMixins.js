export default function EditMixinFactory(option) {
  let {
    defaultText = '',
    formItemList,
    formInit,
    apiMap,
    rules = {}
  } = option
  // if function
  if (typeof apiMap === 'function') {
    apiMap = {
      1: apiMap, // create
      2: apiMap // edit
    }
  }
  return {
    data() {
      return {
        form: formInit(),
        visible: false,
        rules,
        formItemList
      }
    },
    computed: {
      editText() {
        return `${defaultText}-${this.flag === 1 ? '新增' : '编辑'}`
      }
    },
    props: {
      flag: {
        type: Number,
        default: 1
      },
      curInfo: {
        type: Object,
        default: () => { }
      }
    },
    watch: {
      flag: {
        immediate: true,
        handler(newV) {
          this.visible = !!newV
          this.form = formInit(this.curInfo)
        }
      },
      curInfo: {
        immediate: true,
        handler(newV) {
          this.form = formInit(newV)
        }
      }
    },
    methods: {
      reset(needRefresh, options = {}) {
        this.form = formInit()
        this.$refs['form'].resetFields()
        this.$emit('reset', needRefresh, options)
      },
      cancel() {
        this.reset()
      },
      confrim() {
        const api = apiMap[this.flag]
        this.$refs['form'].validate(valid => {
          // if (this.form.status == '') {
          //   this.form.status = 2
          // } else {

          // }
          const params = {
            ...this.form
          }
          if (valid) {
            api(params).then((res) => {
              if (res.status === 200) {
                this.$message.success('操作成功')
                this.reset(true, res)
                this.formItemList.forEach(element => {
                  if (element.type === 'upload') {
                    this.fileList = []
                  }
                })
              } else {
                this.$message.warning(res.message)
              }
            })
          }
        })
      }
    }
  }
}

