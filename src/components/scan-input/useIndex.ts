import { showToast } from '@/utils/messageTip';
import { requestObj } from '@/utils/types';
import { nextTick, onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    // 输入框的值
    const inputValue = ref<string | number>('');

    // 输入框聚焦属性
    const focus = ref<boolean>(false);

    /**
     * 输入框聚焦记录当前表单项可调用扫码
     */
    function focusFunction() {
        scanItem.value = true;
    }

    /**
     * 输入框失焦将当前可扫码置为否，扫码后不调用此项的查询接口
     */
    function blurFunction() {
        scanItem.value = false;
    }

    // 用于记录当前表单是否可扫码
    const scanItem = ref<boolean>(false);

    /**
     * 输入框的值改变后回调修改表单对应字段的值
     * @param e 输入框改变后的值
     */
    function changeInputValue(e: string | number) {
        emit('handleEmit', { value: e, formItem: props.formItem });
    }

    /**
     * 输入框后点击回车事件
     */
    function confirm() {
        if (inputValue.value === '') {
            showToast('当前输入框的值为空');
            return;
        }

        searchCylinderCode(inputValue.value);
    }

    /**
     * 处理扫码枪扫码事件
     * @param code 扫码后返回的code
     */
    function handlePDAScan(code: string) {
        if (!scanItem.value) {
            return;
        }
        inputValue.value = code;
        emit('handleEmit', { value: code, formItem: scanItem });
        searchCylinderCode(code);
    }

    /**
     * 扫码或者确认后方法
     * @param code 输入框的值
     */
    async function searchCylinderCode(code: string | number) {
        if (code === '') {
            showToast('当前输入框的值为空');
            return;
        }

        let parmas: { [key: string]: string | number } = {};
        if (props.formItem.scanInputParmas) {
            parmas = {
                ...props.formItem.scanInputParmas,
            };
        }

        parmas[`${props.formItem.prop}`] = code;

        if (props.formItem.scanInputApi) {
            const res: requestObj = await props.formItem.scanInputApi(parmas);
            if (!res) {
                return;
            }
            emit('handleSuccess', { value: res.data, formItem: props.formItem });
        }
    }

    /**
     * 扫码处理
     */
    function handleScan() {
        // 清空条码
        inputValue.value = '';

        emit('handleEmit', { value: '', formItem: props.formItem });

        uni.scanCode({
            onlyFromCamera: true,
            scanType: ['qrCode', 'barCode'],
            success: ({ result }) => {
                inputValue.value = result;
                emit('handleEmit', { value: result, formItem: props.formItem });
            },
            fail: (error) => {
                uni.showToast({
                    title: '已取消扫码',
                    icon: 'none',
                    duration: 3000,
                });
            },
            complete: () => {
                // 调用扫码查询
                if (inputValue.value !== '') {
                    searchCylinderCode(inputValue.value);
                }
            },
        });
    }

    /**
     * 重置表单
     */
    function resetFocus() {
        if (scanItem.value) {
            focus.value = false;
            nextTick(() => {
                focus.value = true;
            });
        }
    }

    onBeforeMount(() => {
        // 判断有无默认值
        if (!props.formItem.defaultValue) {
            inputValue.value = '';
        }

        // 判断有无默认值
        if (props.formItem.defaultScan) {
            scanItem.value = true;
            focus.value = true;
        }
        // setTimeout(() => {
        //     // 3.6.2以后Hbuilder版本的hbuilder有bug未修复，第一次渲染页面时，input聚焦一闪而过，需要搞个定时器辅助一下
        //     // 3.5.3可不需要此定时器
        //     // https://ask.dcloud.net.cn/question/153481 bug详情
        //     resetFocus();
        // }, 1000);
    });

    return {
        inputValue,
        changeInputValue,
        confirm,
        focus,
        handlePDAScan,
        focusFunction,
        blurFunction,
        resetFocus,
        handleScan,
    };
}
