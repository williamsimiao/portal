import Vue from 'vue'
import App from './App.vue'
import plugins from './plugins';
import router from './router';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

const appConf = {
  router,
  // store,
  // layouts,
  render: h => h(App)
}

Object.assign(appConf, plugins)

new Vue(appConf).$mount('#app')
