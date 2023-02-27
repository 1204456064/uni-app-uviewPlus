import { formCheck, rulesCheck } from './../schema';
import { nextTick, onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
import { handleBaseInput, handleBaseSelect } from './handleEmit';
import { apiSelectType, unknownType } from '@/utils/types';
export default function useIndex(props: { schemaList: FormItem[] }, emit: Function) {
    // 渲染的组件列表
    const renderComponentList = ref<FormItem[]>(props.schemaList);

    // 表单ref
    const formRef = ref();

    // 表单值
    const form = ref<formCheck>({});

    // 表单的校验项
    const rules = ref<rulesCheck>({});

    // 用于收集组件的实例
    const instance = ref<unknownType>({});

    /**
     * @description 收集组件的实例,并与prop绑定
     * @param el 实例对象
     */
    function setComponentRef(el: unknownType, name: string | number) {
        if (el) {
            instance.value[name] = el;
        }
    }

    /**
     * @description 初始化表单
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
     * @description 重新设置校验字段
     */
    function resetRules() {
        rules.value = {};
        props.schemaList.forEach((item: FormItem) => {
            if (item.rules && item.show !== false) {
                rules.value[`${item.prop}`] = item.rules;
            }
        });
    }

    /**
     * @description 处理子组件的回调
     * @param item value是回调的值，formItem为回调的表单项
     */
    function handleEmit(item: { value: string | number; formItem: FormItem }) {
        if (
            item.formItem.type === 'BaseInput' ||
            item.formItem.type === 'ScanInput' ||
            item.formItem.type === 'BaseUpload' ||
            item.formItem.type === 'BaseRadio'
        ) {
            handleBaseInput(form.value, item);
        }
    }

    /**
     * @description BaseSelect组件下拉回调
     * @param item value是选中的值，formItem为回调的表单项
     * @description emit('handleSelectClear',params) 为清除选择项时的回调，params是整个表单项的值
     */
    async function handleSelect(item: { value: apiSelectType; formItem: FormItem; isClear?: boolean }) {
        handleBaseSelect(form.value, item);
        if (item.isClear) {
            emit('handleSelectClear', form.value);
            if (item.formItem.componentProps) {
                await item.formItem.componentProps({
                    value: form.value[item.formItem.prop],
                    formModel: form.value,
                    schema: props.schemaList,
                    formItem: item.formItem,
                    result: 'selectClear',
                });
                nextTick(() => {
                    resetRules();
                });

                updateComponentData();
            }
        }

        if (form.value[item.formItem.prop] === '') {
            return;
        }

        if (item.formItem.componentProps) {
            await item.formItem.componentProps({
                value: form.value[item.formItem.prop],
                formModel: form.value,
                schema: props.schemaList,
                formItem: item.formItem,
                result: 'success',
            });
            nextTick(() => {
                resetRules();
            });
            updateComponentData();
        }
    }

    /**
     * @description BaseInput组件扫码成功回调
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
            nextTick(() => {
                resetRules();
            });
        }

        updateComponentData();
    }

    /**
     * @description BaseInput组件扫码失败回调
     * @param item value是扫码查询后所返回的参数，formItem为回调的表单项
     */
    async function handleScanInputFail(item: { reset: boolean; formItem: FormItem; params?: formCheck }) {
        if (item.formItem.componentProps) {
            await item.formItem.componentProps({
                value: form.value[item.formItem.prop],
                formModel: form.value,
                schema: props.schemaList,
                formItem: item.formItem,
                result: 'error',
            });
            nextTick(() => {
                resetRules();
            });
            updateComponentData();
        }

        if (!item.reset) {
            return;
        }

        if (item.params) {
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
     * @description 选中日期后的回调
     * @param item value是日期选择器选中后的值，formItem为回调的表单项
     */
    async function handleDatePicker(item: { value: string; formItem: FormItem }) {
        form.value[item.formItem.prop] = item.value;

        // 日期需要联动，暴露 componentProps 方法
        if (item.formItem.componentProps) {
            await item.formItem.componentProps({
                value: item.value,
                formModel: form.value,
                schema: props.schemaList,
                formItem: item.formItem,
                result: 'success',
            });

            nextTick(() => {
                resetRules();
            });

            updateComponentData();
        }
    }

    /**
     * @description 重置表单
     * @param params 是否有表单项数据需要在重置时保留
     */
    function resetForm(params?: formCheck) {
        if (params) {
            form.value = {
                ...form.value,
                ...params,
            };
            return;
        }
        form.value = {};
        rules.value = {};
        initForm();

        updateComponentData();
    }

    /**
     * @description 更新表单值
     */
    function updateComponentData() {
        props.schemaList.forEach((item: FormItem) => {
            if (handleException(item)) {
                instance.value[item.prop].setData(form.value[item.prop]);
            }
        });
    }

    /**
     * @description 处理个别组件prop为空string、null、或者是show为false等情况(比如divider、title等，他们的prop的没啥意义)
     * @param item 表单项配置
     * @return boolean
     */
    function handleException(item: FormItem) {
        if (typeof item.show !== undefined && item.show === false) {
            return false;
        }

        if (item.prop === '' || item.prop === null) {
            return false;
        }

        return true;
    }

    onBeforeMount(() => {
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
        handleDatePicker,
        updateComponentData,
        resetForm,
    };
}
