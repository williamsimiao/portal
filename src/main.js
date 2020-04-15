import Vue from 'vue'
import App from './App.vue'
import plugins from './plugins';
import router from './router';

Vue.config.productionTip = false

const appConf = {
  router,
  // store,
  // layouts,
  render: h => h(App)
}

Object.assign(appConf, plugins)

new Vue(appConf).$mount('#app')
