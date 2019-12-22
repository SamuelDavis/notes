import Vue from 'vue'
import App from './App.vue'
import router from './router'
import globalComponents from './components/global'

Vue.config.productionTip = false
Object.keys(globalComponents).forEach((key) => Vue.component(key, globalComponents[key]));

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
