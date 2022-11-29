import { onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    // 输入框的值
    const inputValue = ref<string | number>();

    // 如果是后置插槽并且type为text，此时textContent的值为后置插槽的值
    const textContent = ref('');

    /**
     * 输入框的值改变后回调修改表单对应字段的值
     * @param e 输入框改变后的值
     */
    function changeInputValue(e: string | number) {
        emit('handleEmit', { value: e, formItem: props.formItem });
    }

    onBeforeMount(() => {
        // 判断有无默认值
        if (!props.formItem.defaultValue) {
            inputValue.value = '';
        }
        console.log('我是扫码');
    });

    return {
        inputValue,
        changeInputValue,
        textContent,
    };
}
