import { nextTick, onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    // 输入框的值
    const inputValue = ref<object | string | number | boolean>();

    // 如果是后置插槽并且type为text，此时textContent的值为后置插槽的值
    const textContent = ref<string | undefined>('');

    // 是否渲染后置插槽
    const renderSuffix = ref<boolean>(false);

    /**
     * @description 输入框的值改变后回调修改表单对应字段的值
     * @param e 输入框改变后的值
     */
    function changeInputValue(e: string | number) {
        if (props.formItem.math) {
            nextTick(() => {
                inputValue.value = Math[props.formItem.math!](Number(e));
            });
            emit('handleEmit', { value: Math[props.formItem.math](Number(e)), formItem: props.formItem });
            return;
        }
        emit('handleEmit', { value: e, formItem: props.formItem });
    }

    onBeforeMount(() => {
        // 判断有无默认值
        if (!props.formItem.defaultValue) {
            inputValue.value = '';
        }
        inputValue.value = props.formItem.defaultValue;
        // 判断有无插槽
        if (props.formItem.slots) {
            if (props.formItem.slots.renderType === 'text') {
                textContent.value = props.formItem.slots.content;
            }

            if (props.formItem.slots.renderType === 'tag') {
                textContent.value = props.formItem.slots.content;
            }
        }
    });

    return {
        inputValue,
        changeInputValue,
        textContent,
        renderSuffix,
    };
}
