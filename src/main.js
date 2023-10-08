import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = import.meta.env.VUE_APP_API_URL
axios.interceptors.request.use(function (config) {
  config.headers['X-Binarybox-Api-Key'] = import.meta.env.VUE_APP_API_KEY;
  return config;
});


const app = createApp(App)

app.use(router)


app.mount('#app')
