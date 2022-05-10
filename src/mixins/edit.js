export default function EditMixinFactory (option) {
  let {
    defaultText = '',
    formInit,
    formParse = (obj) => obj,
    apiMap,
    rules = {}
  } = option
  // if function
  if (typeof apiMap === 'function') {
    apiMap = {
      1: apiMap, // create
      2: apiMap  // edit
    }
  }
  return {
    data() {
      return {
        form: formInit(),
        visible: false,
        rules,
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
        },
      },
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
        let api = apiMap[this.flag]
        this.$refs['form'].validate(valid => {
          let params = formParse({
            ...this.form
          })
          if (valid) {
            api(params).then((res) => {
              this.$message.success('操作成功')
              this.reset(true, res)
            })
          }
        })
      }
    }
  }
}