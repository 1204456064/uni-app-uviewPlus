import { formCheck, rulesCheck } from './../schema';
import { onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
import { handleBaseInpput, handleBaseSelect } from './handleEmit';
import { apiSelectType, unknownType } from '@/utils/types';
export default function useIndex(props: { schemaList: FormItem[] }) {
    // 渲染的组件列表
    const renderComponentList = ref<FormItem[]>([]);

    // 表单ref
    const formRef = ref();

    // 表单值
    const form = ref<formCheck>({});

    // 表单的校验项
    const rules = ref<rulesCheck>({});

    let componentRef: unknownType = [];

    function setComponentRef(el: unknownType) {
        componentRef.push(el);
    }

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

    function handleSelect(item: { value: apiSelectType; formItem: FormItem }) {
        handleBaseSelect(form.value, item);
    }

    function handleSuccess(item: { value: object; formItem: FormItem }) {
        form.value = {
            ...form.value,
            ...item.value,
        };
        console.log(componentRef);
        console.log(componentRef.length);
        for (let i = 0; i < componentRef.length; i++) {
            componentRef[i].setValue('1');
        }
        // componentRef[0].setValue('qweqw');
        // componentRef.formEach((item: unknownType) => {
        //     item.setValue('1');
        // });
        console.log(form.value);
    }

    onBeforeMount(() => {
        renderComponentList.value = props.schemaList;

        initForm();
    });
    return {
        renderComponentList,
        initForm,
        form,
        rules,
        formRef,
        handleEmit,
        handleSelect,
        handleSuccess,
        setComponentRef,
    };
}
