import { showToast } from '@/utils/messageTip';
import { nextTick, onBeforeMount, ref } from 'vue';
import { defaultValueCheck, FormItem } from '../schema';
import dayjs from 'dayjs';
import { unknownType } from '@/utils/types';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    // 选择器的值
    const dateValue = ref<defaultValueCheck>('');

    // 是否弹出选择器
    const show = ref<boolean>(false);

    // 是否展示清除按钮
    const showClear = ref<string | boolean | number>(true);

    // 没有值时候的提示
    const placeholder = ref<string | number | boolean>('请选择');

    const mode = ref<string>('date');

    /**
     * 打开选择器
     */
    async function open() {
        if (dateValue.value === '' && mode.value === 'date') {
            dateValue.value = dayjs(new Date()).format('YYYY-MM-DD');
        }
        if (dateValue.value === '' && mode.value === 'datetime') {
            dateValue.value = dayjs(new Date()).format('YYYY-MM-DD hh:mm');
        }
        show.value = true;
    }

    function confirm(e: { value: number; mode: 'date' | 'datetime' }) {
        if (mode.value === 'date') {
            nextTick(() => {
                dateValue.value = dayjs(e.value).format('YYYY-MM-DD');
                emit('handleDatePicker', { value: dateValue.value, formItem: props.formItem });
            });
        }

        if (mode.value === 'datetime') {
            nextTick(() => {
                dateValue.value = dayjs(e.value).format('YYYY-MM-DD HH:mm');
                emit('handleDatePicker', { value: dateValue.value, formItem: props.formItem });
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
    function clearValue() {
        dateValue.value = '';
        emit('handleDatePicker', { value: dateValue.value, formItem: props.formItem });
    }

    onBeforeMount(async () => {
        if (!props.formItem.defaultValue) {
            if (props.formItem.mode === 'datetime') {
                mode.value = props.formItem.mode;
            }
            return;
        }
        let date: unknownType = props.formItem.defaultValue;

        if (props.formItem.mode === 'date' || !props.formItem.mode) {
            dateValue.value = dayjs(date).format('YYYY-MM-DD');
            return;
        }

        dateValue.value = dayjs(date).format('YYYY-MM-DD HH:mm');
        mode.value = props.formItem.mode;
    });

    return {
        show,
        showClear,
        dateValue,
        placeholder,
        open,
        clearValue,
        cancel,
        confirm,
        mode,
    };
}
