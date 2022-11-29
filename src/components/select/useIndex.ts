import { showToast } from '@/utils/messageTip';
import { apiSelectType } from '@/utils/types';
import { onBeforeMount, ref } from 'vue';
import { baseSelecCheck, defaultValueCheck, FormItem } from '../schema';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    // 输入框的值
    const selectValue = ref<defaultValueCheck>('');

    // 输入框展示的值
    const selectLabel = ref<string | number>('');

    const show = ref<boolean>(false);

    const selectList = ref<{ [key: string]: string | number }[][]>([]);

    const placeholder = ref<string | number | boolean>('请选择');

    const loading = ref<boolean>(false);

    const showClear = ref<string | boolean | number>(true);

    async function open() {
        show.value = true;
        loading.value = true;
        await handleSelectList();
        loading.value = false;
    }

    function cancel() {
        selectList.value = [];

        show.value = false;
    }

    /**
     * 点击确认后的回调
     * @param e 点击确认后的回调，参数为indexs下标、value选中的项、values数据源
     */
    function confirm(e: { indexs: number[]; value: apiSelectType[]; values: apiSelectType[] }) {
        selectValue.value = e.value[0].value;
        selectLabel.value = e.value[0].label;
        emit('handleSelect', { value: e.value[0], formItem: props.formItem });
        cancel();
    }

    /**
     * 清除按钮
     */
    function clearValue() {
        selectLabel.value = '';
        selectValue.value = '';
        selectList.value = [];
        // 初始化回调
        emit('handleSelect', {
            value: { label: selectLabel.value, value: selectValue.value },
            formItem: props.formItem,
        });
    }

    onBeforeMount(async () => {
        // 是否需要label字段
        if (props.formItem.labelField) {
            selectLabel.value = '';
        }

        // 判断有无默认值
        if (props.formItem.defaultValue) {
            await handleSelectList();
            console.log(selectList.value[0]);

            selectList.value[0].forEach((item: { [key: string]: string | number }) => {
                if (item.value === props.formItem.defaultValue) {
                    selectLabel.value = item.label;
                }
            });
            selectValue.value = props.formItem.defaultValue;
        } else {
            selectValue.value = '';
        }

        // 需要特殊处理的属性
        if (props.formItem.attribute) {
            if (props.formItem.attribute.placeholder) {
                placeholder.value = props.formItem.attribute.placeholder;
            }
            if (props.formItem.attribute.clearable) {
                showClear.value = props.formItem.attribute.clearable;
            }
        }

        // 初始化回调
        emit('handleSelect', {
            value: { label: selectLabel.value, value: selectValue.value },
            formItem: props.formItem,
        });
    });

    /**
     *  下拉数据处理
     */
    async function handleSelectList() {
        // selectApi为请求接口下拉
        // options 为自定义下拉
        if (props.formItem.selectApi) {
            if (props.formItem.selectParams) {
                const res: baseSelecCheck = await props.formItem.selectApi(props.formItem.selectParams);
                if (res) {
                    selectList.value = [res.data];
                } else {
                    showToast('数据格式有误');
                }
            } else {
                const res: baseSelecCheck = await props.formItem.selectApi({});
                if (res) {
                    selectList.value = [res.data];
                    console.log(selectList.value);
                } else {
                    showToast('数据格式有误');
                }
            }
        } else if (props.formItem.options) {
            selectList.value = [props.formItem.options];
        }
    }

    return {
        selectValue,
        show,
        selectList,
        placeholder,
        open,
        cancel,
        confirm,
        selectLabel,
        loading,
        showClear,
        clearValue,
    };
}
