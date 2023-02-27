import { createSSRApp } from 'vue';

import App from './App.vue';
import uviewPlus from 'uview-plus';
import { components } from './components/regester';

export function createApp() {
    const app = createSSRApp(App);

    app.use(uviewPlus);
    components.map((item) => {
        app.component(item.name, item);
    });
    return {
        app,
    };
}
uni.$u.config.unit = 'rpx';
