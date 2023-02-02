/*
 * @Author: liyang 389688501@qq.com
 * @Date: 2022-06-07 17:31:26
 * @LastEditors: liyang 389688501@qq.com
 * @LastEditTime: 2022-06-07 17:39:35
 * @FilePath: /video-composite/src/mixins/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  computed: {
    userId() {
      return this.$store.state.user.userInfo.id
    },
    token() {
      return this.$store.state.user.token
    },
    name() {
      return this.$store.state.user.name
    },
    avatar() {
      return this.$store.state.user.avatar
    },
    userInfo() {
      return this.$store.state.user.userInfo
    }
  }
}
