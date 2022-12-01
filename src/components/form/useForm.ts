import { formCheck, rulesCheck } from './../schema';
import { nextTick, onBeforeMount, ref } from 'vue';
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

    // const componentRef = ref({});
    let componentRef: unknownType = [];

    function setComponentRef(el: unknownType) {
        if (el) {
            componentRef.push(el);
        }
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

    function handleScanInputSuccess(item: { value: object; formItem: FormItem }) {
        form.value = {
            ...form.value,
            ...item.value,
        };
        setComponentData();
        componentRef = [];
    }

    function handleScanInputFail(item: { reset: boolean; formItem: FormItem }) {
        if (!item.reset) {
            return;
        }
        // initForm();
        // form.value = {
        //     ...form.value,
        //     cylinderCode: '',
        // };
        nextTick(() => {
            resetForm();
        });
    }
    function resetForm() {
        let resetForm: formCheck = {};
        props.schemaList.forEach((item: FormItem) => {
            if (item.defaultValue) {
                resetForm[`${item.prop}`] = item.defaultValue;
            } else {
                resetForm[`${item.prop}`] = '';
            }
        });

        for (let i = 0; i < props.schemaList.length; i++) {
            componentRef[i].setValue(resetForm[componentRef[i].getProp()]);
        }
    }

    function setComponentData() {
        let sign = 0;
        sign = props.schemaList.length;

        for (let i = 0; i < sign; i++) {
            if (componentRef[i].getProp() && form.value[componentRef[i].getProp()]) {
                console.log(form.value[componentRef[i].getProp()]);
                console.log(componentRef[i].getProp());

                componentRef[i].setValue(form.value[componentRef[i].getProp()]);
            }
        }
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
        handleScanInputSuccess,
        setComponentRef,
        handleScanInputFail,
    };
}
