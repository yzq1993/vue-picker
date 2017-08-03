import Vue from 'vue'
import App from './App'

import vuePicker from './vue-picker'

Vue.config.productionTip = false

Vue.use(vuePicker)


new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
