import { onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    const inputValue = ref<string | number>();

    function changeInputValue(e: string | number) {
        console.log(e);
        console.log(props.formItem);
        emit('handleEmit', { value: e, formItem: props.formItem });
    }
    onBeforeMount(() => {
        if (!props.formItem.defaultValue) {
            inputValue.value = '';
            return;
        }
        console.log('dsa');
    });
    return {
        inputValue,
        changeInputValue,
    };
}
