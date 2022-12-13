import { createSSRApp } from 'vue';

import App from './App.vue';
import uviewPlus from 'uview-plus';
import ComponentForm from '@/components/form/index.vue';
import BaseModal from '@/components/modal/index.vue';
export function createApp() {
    const app = createSSRApp(App);

    app.use(uviewPlus);
    app.component('ComponentForm', ComponentForm);
    app.component('BaseModal', BaseModal);
    return {
        app,
    };
}
uni.$u.config.unit = 'rpx';
