import Vue from 'vue'
import App from './App.vue'
import plugins from './plugins';
import router from './router';
import store from './store'

Vue.config.productionTip = false

const appConf = {
  router,
  store,
  render: h => h(App)
}

Object.assign(appConf, plugins)

new Vue(appConf).$mount('#app')
