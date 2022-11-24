import { ref } from 'vue';
import { httpType, httpData, unknownType } from './types';
import { hideLoading, showLoading, showToast } from './messageTip';
import { clearToken } from './uni-storage';

const BASE_URL = import.meta.env.VITE_API_URL as string;

/**
 * 未登录码
 */
const NOT_LOGIN_CODE = -997;

/**
 * 异常提示码
 */
const EXCEPTION_CODE = 300;

/**
 * 退出登录码
 */
const LAYOUT_CODE = 110;

/**
 * 成功码
 */
const SUCCESS_CODE = 120;

/**
 * app - 年检异常提示框（包含待年检、继续使用申请）
 * @type {number}
 */
const APP_NOTICE_ONE = 101;

/**
 * 用来记录年检异常组件的ref
 * 在组件封装是已经引入挂载
 */
const yearlyErrorEmit = ref();

/**
 * 年检异常弹框挂载ref方法
 */
export function useYearlyErrorRequest(emit: unknownType) {
    yearlyErrorEmit.value = emit;
}

function http(data: httpData, method: httpType, url: string) {
    const token = uni.getStorageSync('token');

    showLoading('请求中');
    return new Promise((resolve) => {
        uni.request({
            url: BASE_URL + url,
            method,
            data,
            dataType: 'json',
            header: {
                'v-token': token,
            },
            success: (res) => {
                responHandler(res, resolve);
            },
            fail: () => {
                errorHander();
            },
            complete: () => {
                hideLoading();
            },
        });
    });
}

function responHandler(res: httpData, resolve: httpData) {
    const { code } = res.data;
    if (code === NOT_LOGIN_CODE) {
        // 未登录处理
        clearToken();
        uni.showToast({
            title: '登录失效，请重新登录',
            icon: 'none',
            mask: true,
            complete: () => {
                uni.navigateTo({ url: '/pages/login/login' });
            },
        });
        console.log('我失效了');

        return false;
    }

    if (code === EXCEPTION_CODE) {
        showToast(res.data.message);
        return resolve(false);
    }

    if (code === SUCCESS_CODE || LAYOUT_CODE || APP_NOTICE_ONE) {
        return resolve({ ...res.data });
    }
}

/**
 * 错误处理
 */
function errorHander() {
    showToast('网络错误或服务器错误');
}

/**
 * get请求
 */
export function get(url: string, data?: httpData) {
    return http(data, 'GET', url);
}

/**
 * post请求
 */
export function post(url: string, data?: httpData) {
    return http(data, 'POST', url);
}
