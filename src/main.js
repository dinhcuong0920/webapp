import Vue from 'vue'
import Home from './components/Home.vue'
import VueRouter from 'vue-router';
import routes from './router';
require('./app.bundle.css')

Vue.config.productionTip = false

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(Home),
}).$mount('#app')
