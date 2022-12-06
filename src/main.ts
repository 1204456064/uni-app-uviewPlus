import { createSSRApp } from 'vue';

import App from './App.vue';
import uviewPlus from 'uview-plus';
// import dayjs from 'dayjs';
export function createApp() {
    const app = createSSRApp(App);

    app.use(uviewPlus);
    // app.config.globalProperties.day = dayjs;
    return {
        app,
    };
}
uni.$u.config.unit = 'rpx';
