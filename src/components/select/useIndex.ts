import { onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    // 输入框的值
    const selectValue = ref<string | number>();

    const show = ref<boolean>(false);

    const columns = ref<{ [key: string]: string | number }[]>([]);

    const placeholder = ref<string | number | boolean>('请选择');

    onBeforeMount(() => {
        // 判断有无默认值
        if (!props.formItem.defaultValue) {
            selectValue.value = '';
        }

        if (props.formItem.attribute) {
            if (props.formItem.attribute.placeholder) {
                placeholder.value = props.formItem.attribute.placeholder;
            }
        }
        console.log('我是下拉');
    });

    return {
        selectValue,
        show,
        columns,
        placeholder,
    };
}
