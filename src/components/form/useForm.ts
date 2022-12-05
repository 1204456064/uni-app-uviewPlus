import { formCheck, rulesCheck } from './../schema';
import { computed, nextTick, onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
import { handleBaseInpput, handleBaseSelect } from './handleEmit';
import { apiSelectType, unknownType } from '@/utils/types';
export default function useIndex(props: { schemaList: FormItem[] }) {
    // 渲染的组件列表
    const renderComponentList = ref<FormItem[]>(props.schemaList);

    const showComponent = ref<boolean>(true);
    // 表单ref
    const formRef = ref();

    // 表单值
    const form = ref<formCheck>({});

    // 表单的校验项
    const rules = ref<rulesCheck>({});

    // const componentRef = ref({});
    let componentRef: unknownType = [];

    /**
     * 收集组件的实例
     * @param el 实例对象
     */
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
        if (item.formItem.type === 'BaseInput' || item.formItem.type === 'ScanInput') {
            handleBaseInpput(form.value, item);
        }
    }

    /**
     * 下拉回调
     * @param item value是选中的值，formItem为回调的表单项
     */
    function handleSelect(item: { value: apiSelectType; formItem: FormItem }) {
        handleBaseSelect(form.value, item);
    }

    /**
     * BaseInput组件扫码成功回调
     * @param item value是扫码查询后所返回的参数，formItem为回调的表单项
     */
    async function handleScanInputSuccess(item: { value: object; formItem: FormItem; reset?: true }) {
        form.value = {
            ...form.value,
            ...item.value,
        };

        if (item.reset) {
            form.value[item.formItem.prop] = '';
        }

        if (item.formItem.componentProps) {
            await item.formItem.componentProps({
                value: form.value[item.formItem.prop],
                formModel: form.value,
                schema: props.schemaList,
                formItem: item.formItem,
                result: 'success',
            });
        }
        setComponentData();

        componentRef = [];
    }

    async function updateComponentStatus() {
        showComponent.value = false;
        nextTick(() => {
            showComponent.value = true;
        });
    }

    /**
     * BaseInput组件扫码失败回调
     * @param item value是扫码查询后所返回的参数，formItem为回调的表单项
     */
    function handleScanInputFail(item: { reset: boolean; formItem: FormItem; params?: formCheck }) {
        if (!item.reset) {
            return;
        }

        if (item.params) {
            console.log(item.params);
            nextTick(() => {
                resetForm(item.params);
            });
            return;
        }

        nextTick(() => {
            resetForm();
        });
    }

    /**
     * 重置表单
     */
    function resetForm(params?: formCheck) {
        let resetForm: formCheck = {};
        if (params) {
            form.value = {
                ...form.value,
                ...params,
            };
            return;
        }
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

    /**
     * 设置表单值
     */
    function setComponentData() {
        for (let i = 0; i < props.schemaList.length; i++) {
            if (componentRef[i].getProp() && form.value[componentRef[i].getProp()]) {
                componentRef[i].setValue(form.value[componentRef[i].getProp()]);
            }
        }
    }

    onBeforeMount(() => {
        // renderComponentList.value = props.schemaList;
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
        showComponent,
    };
}
