import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { Icon } from '@iconify/vue';

// ✅ Correct way to register global components
const app = createApp(App);
app.component('Icon', Icon);
app.mount('#app');
