/**
 * 自定义字典
 */
export const usage_status = [{ dictValue: 1, dictLabel: '禁用' }, { dictValue: 0, dictLabel: '启用' }]

/**
 * 搜索组件依赖数据抽象
 */
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
 *  公共参数 @param {type: '类型', model: '绑定的字段名', label: 'label', placeholder: 'a',disabled:"修改是否禁用"}
 *  输入框-input   -- 私有参数 @param {inputType:"textarea || text"} 其他类型请参考：https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
 *  选择器-select   -- 私有参数 @param {option:"选择器的数据源",multiple:"是否多选"}
 *  树形控件-tree -- 私有参数 @param {data:"展示数据"}
 *  时间选择器-TimePicker -- 私有参数 @param {}
 *  日期选择器-DatePicker -- 私有参数 @param {}
 *  时间日期时间段选择器-DateTimePicker -- 私有参数 @param {}
 *  *  文本-text --私有参数 @param {}
 *  */
  formItemList: [
    {
      type: 'input', inputType: 'text', model: 'number', label: '任务编号', placeholder: '请输入任务编号',
      disabled: false
    },
    {
      type: 'input', inputType: 'text', model: 'name', label: '任务名称', placeholder: '请输入任务名称',
      disabled: false
    },
    {
      type: 'input', inputType: 'text', model: 'name', label: '执行设备', placeholder: '请输入执行设备',
      disabled: false
    },
    {
      type: 'input', inputType: 'text', model: 'name', label: '执行算法', placeholder: '请输入执行算法',
      disabled: false
    },
    {
      type: 'select', model: 'status', label: '任务状态', placeholder: '请选择任务状态',
      disabled: false,
      multiple: false,
      option: usage_status
    }
  ]
}

/**
 * 表格表头-字段、自定义渲染
 */
export const columns = [
  { label: '任务编号', prop: 'deviceCode' },
  { label: '任务名称', prop: 'deviceName' },
  { label: '执行设备', prop: 'ip' },
  { label: '执行通道', prop: 'channel_text' },
  { label: '执行算法', prop: 'groupName' },
  { label: '执行周期', prop: 'groupName' },
  { label: '创建时间', prop: 'groupName' },
  {
    label: '状态', prop: 'status',
    component: {
      functional: true,
      render(_, context) {
        const status = context.props.context.status
        if (status == '1') {
          return <div class='blue'><span><i class='el-icon-success' style='margin-right:10px' />执行中</span></div>
        } else if (status == '2') {
          return <div class='gray'><span><i class='el-icon-error' style='margin-right:10px' />未启用</span></div>
        } else {
          return <div class='red'><span><i class='el-icon-error' style='margin-right:10px' />已结束</span></div>
        }
      }
    }
  }
]

/**
 * 添加、编辑-表单
 * @param {*} data
 * @returns
 */
import { addAlgorithmModel, editAlgorithmModel } from '@/api/algorithmModel'
export const Form = {
  // el-form的model
  text: '算法模型', // 表单头部标题
  model: (data = {}) => {
    return {
      df: '', // 算法编号
      algorithmName: '', // 算法名称
      algorithmVersion: '', // 算法版本
      algorithmDescription: '', // 算法描述
      algorithmStatus: null, // 使用状态
      modelFile: null, // 算法模型
      userId: null, // 用户id
      date: [],
      ...data
    }
  },
  /**
 * el-form-item数组
 * 支持类型：
 *  公共参数 @param {type: '类型', model: '绑定的字段名', label: 'label', placeholder: 'a',disabled:"修改是否禁用"}
 *  输入框-input   -- 私有参数 @param {inputType:"textarea || text"} 其他类型请参考：https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
 *  选择器-select   -- 私有参数 @param {option:"选择器的数据源",multiple:"是否多选"}
 *  树形控件-tree -- 私有参数 @param {data:"展示数据"}
 *  文件上传-upload --私有参数 @param {}
 *  */
  formItemList: [
  ],
  /**
   * 添加、编辑-表单过滤
   * 过滤示例：
   * rule: [{ required: true, message: 'xx' },{ max: 100, message: '最长 100 个字符', trigger: 'blur' },      {
        validator(rule, value, callback, source, options) {
          const pattern = /[a-zA-Z]+/
          if (pattern.test(value)) {
            callback(new Error('只能为数字'))
          } else {
            callback()
          }
        }
      }],
   */
  rules: {
    algorithmNumber: [{ required: true, message: '请选择输入算法编号' }],
    algorithmName: [{ required: true, message: '请输入算法名称' }, { max: 100, message: '最长 100 个字符', trigger: 'blur' }],
    algorithmVersion: [{ required: true, message: '请输入算法版本' }],
    algorithmDescription: [{ required: true, message: '请输入算法描述' }],
    algorithmStatus: [{ required: true, message: '请选择使用状态' }],
    modelFile: [{ required: true, message: '请选择算法模型' }]
  },
  /**
   * 接口
   */
  api: { add: addAlgorithmModel, edit: editAlgorithmModel }
}

/**
 * 表格字段字典匹配
 * @param {*} list
 * @param {*} option
 */
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

/**
 * 编辑、添加任务调度-设备信息-表格表头-字段、自定义渲染
 */
export const deviceColumns = [
  { label: '设备编号', prop: 'deviceCode' },
  { label: '设备名称', prop: 'deviceName' },
  { label: '设备区域', prop: 'ip' },
  { label: 'IP地址', prop: 'channel_text' }
]
