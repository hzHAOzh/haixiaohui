/*设置环境变量*/
let env = "develop"
// 防止我们在上传代码的时候，没有将env改成production
const envVersion = wx.getAccountInfoSync().miniProgram.envVersion
if (envVersion === "release" && env !== "production") {
  env = "production"
}
export default {
  // 当前环境
  env,
  // 请求接口域名
  baseUrl: {
    develop: 'http://192.168.85.151:3000', 
    production: 'http://api.xxx.com',
  },
}