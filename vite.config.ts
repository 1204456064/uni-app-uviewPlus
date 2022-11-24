import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import uniHot from 'uni-pages-hot-modules';

uniHot.setupHotJs();

export default defineConfig({
    plugins: [uni(), uniHot.createHotVitePlugin()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '*': path.resolve(''),
        },
    },
});
