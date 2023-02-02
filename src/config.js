// 开发环境接口根地址
const m3u8 = 'https://sppt.chfatech.com/sppt_pc'
const devBaseURL = 'http://http://192.168.0.128:8001'
// 生产环境接口根地址
const proBaseURL = 'https://sppt.chfatech.com/sppt_pc'
// 环境变量
const NODE_ENV = process.env.NODE_ENV == 'development' ? 'development' : 'production'
// 基础网络请求URL
const baseURL = NODE_ENV === 'development' ? devBaseURL : proBaseURL
// 开发测试token
const testToken = ''
const config = {
  baseURL: baseURL,
  testToken: testToken,
  NODE_ENV: NODE_ENV,
  m3u8: m3u8
}
export default config
