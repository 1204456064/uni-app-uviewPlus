import { showToast } from '@/utils/messageTip';
import { nextTick, onBeforeMount, ref } from 'vue';
import { defaultValueCheck, FormItem } from '../schema';
import dayjs from 'dayjs';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    // 选择器的值
    const dateValue = ref<defaultValueCheck>('');

    // 是否弹出选择器
    const show = ref<boolean>(false);

    // 是否展示清除按钮
    const showClear = ref<string | boolean | number>(false);

    // 没有值时候的提示
    const placeholder = ref<string | number | boolean>('请选择');

    /**
     * 打开选择器
     */
    async function open() {
        show.value = true;
    }

    function confirm(e: { value: number; mode: 'date' | 'dateTime' }) {
        console.log(e);
        console.log(dayjs(e.value).format('YYYY-MM-DD'));

        if (e.mode === 'date') {
            nextTick(() => {
                dateValue.value = dayjs(e.value).format('YYYY-MM-DD');
            });
        }
        cancel();
    }

    /**
     * 关闭选择器
     */
    function cancel() {
        show.value = false;
    }

    /**
     * 清除按钮
     */
    function clearValue() {}

    onBeforeMount(async () => {});

    return {
        show,
        showClear,
        dateValue,
        placeholder,
        open,
        clearValue,
        cancel,
        confirm,
    };
}
