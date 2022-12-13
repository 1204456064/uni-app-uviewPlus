import { ref } from 'vue';
export default function useIndex(emit: Function) {
    //模态框的显示初始值
    const show = ref<boolean>(false);

    //标题内容的初始值
    const title = ref<string>('提示');

    //模态框内容的初始值
    const content = ref<string>('');

    //确认按钮文字的初始值
    const confirmText = ref<string>('确认');

    //取消按钮文字的初始值
    const cancelText = ref<string>('取消');

    //是否显示取消按钮
    const showCancelButton = ref<boolean>(true);

    function open(value: string) {
        content.value = value;
        show.value = true;
    }

    function confirm() {
        emit('confirmSubmit');
    }

    function cancel() {
        show.value = false;
    }

    return {
        show,
        title,
        content,
        open,
        confirmText,
        cancelText,
        showCancelButton,
        confirm,
        cancel,
    };
}
