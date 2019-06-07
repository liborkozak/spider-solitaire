import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

axios.get('/serviceDiscovery.json').then(function (response) {
  let serviceUrl = response.data.serviceUrl;

  //Intercept each axios request and insert service url
  axios.interceptors.request.use(function (config) {
    config.url = serviceUrl + config.url;
    return config;
  });

  Vue.use(Vuetify);

  Vue.prototype.$http = axios;

  Vue.config.productionTip = false;

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
}).catch(function (error) {
  throw error;
});

