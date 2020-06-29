import Vue from 'vue'

// 通过Vue.observable创建一个可响应的对象
export const store = Vue.observable({
  userInfo: {
    name: 'j'
  },
  aboutInfo: 'this is about page',
  roleIds: []
})

// 定义 mutations, 修改属性
export const mutations = {
  setUserInfo (userInfo) {
    store.userInfo = userInfo
  },
  setAboutInfo (aboutInfo) {
    store.aboutInfo = aboutInfo
  }
}
