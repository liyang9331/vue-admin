// 自定义字典
export const usage_status = [{ dictValue: 1, dictLabel: '禁用' }, { dictValue: 0, dictLabel: '启用' }]

// 搜索组件依赖数据抽象
export const Search = {
  // el-form的model
  model: (data = {}) => {
    return {
      name: '',
      number: '',
      status: null,
      ...data
    }
  },
  /**
   * el-form-item数组
   * 支持类型：
   *  input--普通文本输入框
   *  示例：{type: 'input', model: 'a', label: 'a', placeholder: 'a'}
   *  select--下拉选择器,option:下拉选择器的源数据
   *  示例：{type: 'input', model: 'a', label: 'a', placeholder: 'a',option:{}}
   *  tree--树形选择器,data:树形选择器的源数据
   *  示例：{type: 'input', model: 'a', label: 'a', placeholder: 'a',data:{}}
   *  */
  formItemList: [
    {
      type: 'input', model: 'number', label: '算法编号', placeholder: '请输入算法编号'
    },
    {
      type: 'input', model: 'name', label: '算法名称', placeholder: '请输入算法名称'
    },
    {
      type: 'select', model: 'status', label: '使用状态', placeholder: '请选择使用状态',
      option: usage_status
    }
  ]
}

// 表格表头、格式化参数
export const columns = [
  { label: '算法编号', prop: 'deviceCode' },
  { label: '算法名称', prop: 'deviceName' },
  { label: '版本', prop: 'ip' },
  { label: '算法描述', prop: 'channel_text' },
  { label: '更新时间', prop: 'groupName' },
  {
    label: '使用状态', prop: 'status',
    component: {
      functional: true,
      render(_, context) {
        const status = context.props.context.status
        if (status == '1') {
          return <div class='blue'><span><i class='el-icon-success' style='margin-right:10px' />在线</span></div>
        } else if (status == '2') {
          return <div class='gray'><span><i class='el-icon-error' style='margin-right:10px' />离线</span></div>
        } else {
          return <div class='red'><span><i class='el-icon-error' style='margin-right:10px' />故障</span></div>
        }
      }
    }
  }
]

// 添加、编辑弹窗参数初始化
export function editFormModel(data = {}) {
  return {
    algorithmNumber: '', // 算法编号
    algorithmName: '', // 算法名称
    algorithmVersion: '', // 算法版本
    algorithmDescription: '', // 算法描述
    algorithmStatus: null, // 使用状态
    modelFile: null, // 算法模型
    userId: null, // 用户id
    ...data
  }
}

// 添加、编辑弹窗参数过滤
export const rules = {
  algorithmNumber: [{ required: true, message: '请选择输入算法编号' }],
  algorithmName: [{ required: true, message: '请输入算法名称' }, { max: 100, message: '最长 100 个字符', trigger: 'blur' }],
  algorithmVersion: [
    { required: true, message: '请输入算法版本' }
    // { max: 20, min: 20, message: '请输入20位数字', trigger: 'blur' },
    // {
    //   validator(rule, value, callback, source, options) {
    //     const pattern = /[a-zA-Z]+/
    //     if (pattern.test(value)) {
    //       callback(new Error('只能为数字'))
    //     } else {
    //       callback()
    //     }
    //   }
    // }
  ],
  algorithmDescription: [{ required: true, message: '请输入算法描述' }],
  algorithmStatus: [{ required: true, message: '请选择使用状态' }],
  modelFile: [{ required: true, message: '请选择算法模型' }]
}

// 表格数据字典过滤匹配
export function listProcess(list, option) {
  const { numberTypeList, factoryTypeList } = option
  list.forEach(item => {
    const numberType = numberTypeList.find(k => Number(k.dictValue) === Number(item.numberType))
    const factory = factoryTypeList.find(k => Number(k.dictValue) === Number(item.factory))
    item.lngAndLat = item.lng + ',' + item.lat
    item.channel_text = item.children.map(item => item.channelName).join()
    item['numberType_text'] = item.numberType != null ? typeof (numberType) === 'object' ? numberType.dictLabel : '' : ''
    item['factory_text'] = item.factory != null ? typeof (factory) === 'object' ? factory.dictLabel : '' : ''
  })
}
