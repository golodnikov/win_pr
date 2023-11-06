import { createApp, inject } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App);

const formData = inject('formData');

axios.post("http://localhost:3000/api/form_quest_users", formData)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

const vuetify = createVuetify({
  components,
  directives
})

app.use(store).use(vuetify).use(router).mount('#app')
