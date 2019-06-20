import Vue from 'vue'
import App from './App.vue'

import Layers from './Components/Layers.vue'
import Panel from './Components/Control-Panel.vue'
import Sum from './Components/Total-Sum.vue'

Vue.component("Layers", Layers)
Vue.component("Panel", Panel)
Vue.component("Sum", Sum)

new Vue({
  el: '#app',
  render: h => h(App)
})
