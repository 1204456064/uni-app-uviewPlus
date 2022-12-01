import { showToast } from '@/utils/messageTip';
import { requestObj } from '@/utils/types';
import { onBeforeMount, onMounted, ref } from 'vue';
import { FormItem } from '../schema';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    // 输入框的值
    const inputValue = ref<string | number>('');

    const focus = ref<boolean>(false);

    function focusFunction() {
        scanItem.value = true;
    }

    function blurFunction() {
        scanItem.value = false;
    }

    const scanItem = ref<boolean>(false);

    /**
     * 输入框的值改变后回调修改表单对应字段的值
     * @param e 输入框改变后的值
     */
    function changeInputValue(e: string | number) {
        emit('handleEmit', { value: e, formItem: props.formItem });
    }

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

    function resetFocus() {
        if (props.formItem.defaultScan) {
            // focusFunction(true);
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
        //     // Hbuilder版本的hbuilder有bug未修复，第一次渲染页面时，input聚焦一闪而过，需要搞个定时器辅助一下
        //     // https://ask.dcloud.net.cn/question/153481 bug详情
        //     resetFocus();
        // }, 1000);
    });

    onMounted(() => {
        // setTimeout(() => {
        //     // Hbuilder版本的hbuilder有bug未修复，第一次渲染页面时，input聚焦一闪而过，需要搞个定时器辅助一下
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
        scanItem,
        focusFunction,
        blurFunction,
    };
}
