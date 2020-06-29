import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Loading from './components/Loading'
import LoadingV2 from './directive/loading'

Vue.directive('loadingV2', LoadingV2)

Vue.use(ElementUI)

Vue.prototype.$loading = Loading

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
