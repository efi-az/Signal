import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from "@/boot/stores";
import registerGlobalComponents from './common/plugins/components';

import './common/assets/main.scss'
import './boot/aditional-prototypes'

const app = createApp(App)

app.use(store)
app.use(router)


registerGlobalComponents(app)

app.mount('#app');

