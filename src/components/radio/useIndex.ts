import { baseRadioCheck, FormItem } from '../schema';
import { onBeforeMount, ref } from 'vue';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    //单选框的值
    const radioValue = ref<object | string | number | boolean>();

    //单选框选项列表
    const radioList = ref<baseRadioCheck[]>([]);

    /**
     * @description 选中的回调
     * @param item 选中的配置项
     */
    function radioChange(item: { label: string; value: string | number }) {
        radioValue.value = item.value;
        emit('handleEmit', { value: radioValue.value, formItem: props.formItem });
    }

    onBeforeMount(() => {
        radioList.value = props.formItem.radioList!;

        if (!props.formItem.defaultValue) {
            return;
        }

        radioList.value.forEach((value) => {
            if (value.value === props.formItem.defaultValue) {
                radioValue.value = value.label;
            }
        });
    });

    return {
        radioValue,
        radioList,
        radioChange,
    };
}
