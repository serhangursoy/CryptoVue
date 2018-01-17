// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import Trend from 'vuetrend'
import('vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)
Vue.use(Trend)
Vue.config.productionTip = false
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

Vue.use(Vuetify, {
	theme: {
		backgroundColor: '#21253d'
	}
})