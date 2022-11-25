import { formCheck, rulesCheck } from './../schema';
import { onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
import { handleBaseInpput } from './handleEmit';
export default function useIndex(props: { schemaList: FormItem[] }) {
    // 渲染的组件列表
    const componentList = ref<FormItem[]>([]);

    // 表单ref
    const formRef = ref();

    // 表单值
    const form = ref<formCheck>({});

    // 表单的校验项
    const rules = ref<rulesCheck>({});

    /**
     * 初始化表单
     */
    function initForm() {
        props.schemaList.forEach((item: FormItem) => {
            if (item.defaultValue) {
                form.value[`${item.prop}`] = item.defaultValue;
            } else {
                form.value[`${item.prop}`] = '';
            }

            if (item.rules) {
                rules.value[`${item.prop}`] = item.rules;
            }
        });
    }

    /**
     * 处理子组件的回调
     */
    function handleEmit(item: { value: string | number; formItem: FormItem }) {
        if (item.formItem.type === 'BaseInput') {
            handleBaseInpput(form.value, item);
        }
    }

    onBeforeMount(() => {
        componentList.value = props.schemaList;
        console.log(componentList.value);

        initForm();
    });
    return {
        componentList,
        initForm,
        form,
        rules,
        formRef,
        handleEmit,
    };
}
