/**
 * 弹出提示信息
 * @param {string} message 提示信息
 */
export function showToast(message = '未知错误') {
    uni.showToast({
        title: message,
        icon: 'none',
        mask: true,
    });
}

// 加载信息，带遮罩
let needLoadingRequestCount = 0;
let loadingTimer: any = null;
export function showLoading(title = '', mask = true) {
    if (needLoadingRequestCount === 0) {
        uni.showLoading({
            title,
            mask,
        });

        // 最长10s自动关闭
        loadingTimer = setTimeout(() => {
            if (needLoadingRequestCount > 0) {
                uni.hideLoading();
            }
        }, 10000);
    }

    needLoadingRequestCount++;
}

// 隐藏遮罩
export function hideLoading() {
    if (needLoadingRequestCount <= 0) return;

    needLoadingRequestCount--;

    if (needLoadingRequestCount === 0) {
        loadingTimer && clearTimeout(loadingTimer);
        uni.hideLoading();
    }
}

/**
 * 弹出提示信息 - 1s
 */
export function showSuccessToast() {
    uni.showToast({
        title: '提交成功',
        icon: 'success',
        mask: true,
        duration: 1000,
    });
}
/**
 * 弹出提示信息 - 校验失败
 */
export function validFailToast() {
    uni.showToast({
        title: '校验不通过,请检查必填项',
        icon: 'none',
        mask: true,
    });
}

/**
 * 弹出提示信息 - 未扫码或扫码没有成功就点确认
 */
export function scanFailToast() {
    uni.showToast({
        title: '未扫码或扫码未成功',
        icon: 'none',
        mask: true,
    });
}

/**
 * 弹出提示信息并转跳 - 1s
 * @param {string} message 提示信息
 */
export function showSuccessToastWithNavget(url: string) {
    uni.showToast({
        title: '提交成功',
        icon: 'success',
        mask: true,
        duration: 1000,
    });

    setTimeout(() => {
        uni.navigateTo({ url: url });
    }, 1000);
}
