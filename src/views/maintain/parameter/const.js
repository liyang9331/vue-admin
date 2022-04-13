export const rules = {
  equipType: [
    { required: true, message: '请选择漏缆型号', trigger: 'blur' }
  ],
  normalAlarmLimit: [
    { required: true, message: '请输入一般告警门限', trigger: 'blur' }
  ],
  majorAlarmLimit: [
    { required: true, message: '请输入重要告警门限', trigger: 'blur' }
  ],
  emergAlarmLimit: [
    { required: true, message: '请输入紧急告警门限', trigger: 'blur' }
  ]
}