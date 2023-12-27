/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Vuexストアを設定
import store from './store'

const app = createApp(App)

app.use(store) // Vuexストアを設定

registerPlugins(app)

app.mount('#app')
