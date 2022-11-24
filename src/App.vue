<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { getStorage } from '@/utils/uni-storage';

onLaunch(() => {
    console.log('App Launch');

    const token = getStorage('token');
    console.log(token);

    // 存在token，至首页
    if (token) {
        uni.switchTab({ url: '/pages/index/index' });
    } else {
        // 不存在token至登录页
        uni.navigateTo({ url: '/pages/login/index' });
    }
});
onShow(() => {
    console.log('App Show');
});
onHide(() => {
    console.log('App Hide');
});
</script>

<style lang="scss">
@import 'uview-plus/index.scss';
@import './styles/index.scss';
</style>
