import HTTP from '@/api/login/index';
import { clearToken, getStorage } from '@/utils/uni-storage';
import { onMounted, ref } from 'vue';
import { userInfoObj } from '@/utils/types';
export default function useIndex() {
    /**
     * 展示信息
     */
    const userInfo = ref<userInfoObj>({
        account: '',
        userName: '',
        roles: '',
        version: '',
    });

    // 退出提示内容
    const content = ref<string>('是否确认退出登录?');

    // popupRef
    const popupRef = ref();

    /**
     * 退出登录
     */
    function showLogout() {
        popupRef.value.open();
    }

    /**
     * 取消
     */
    function close() {
        popupRef.value.close();
    }

    /**
     * 确认退出
     */
    async function confirm() {
        const res = await HTTP.logout();
        if (res) {
            clearToken();
            uni.reLaunch({ url: '/pages/login/index' });
        }
    }

    /**
     * 检测更新
     */
    function checkUpdate() {
        plus.runtime.openURL('地址');
    }

    /**
     * 转跳到修改密码
     */
    function toChangePassword() {
        uni.navigateTo({
            url: `/pages/setting/change-password`,
        });
    }

    /**
     * 组件挂载后
     */
    onMounted(() => {
        userInfo.value.account = getStorage('userInfo').account;
        userInfo.value.userName = getStorage('userInfo').userName;
        console.log(getStorage('userInfo'));

        // userInfo.value.roles = getStorage('userInfo').roles.toString()
        // 获取应用版本
        // #ifdef APP-PLUS
        plus.runtime.getProperty(plus.runtime.appid as string, (wgtinfo) => {
            userInfo.value.version = wgtinfo.version;
        });
        // #endif
    });
    return {
        userInfo,
        content,
        showLogout,
        checkUpdate,
        toChangePassword,
        popupRef,
        confirm,
        close,
    };
}
