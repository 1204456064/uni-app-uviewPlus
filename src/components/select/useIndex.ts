import { showToast } from '@/utils/messageTip';
import { apiSelectType } from '@/utils/types';
import { nextTick, onBeforeMount, ref } from 'vue';
import { baseSelecCheck, defaultValueCheck, FormItem } from '../schema';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    // 输入框的值
    const selectValue = ref<defaultValueCheck>('');

    // 输入框展示的值
    const selectLabel = ref<string | number>('');

    // 是否弹出选择器
    const show = ref<boolean>(false);

    // 选择器的列表
    const selectList = ref<{ [key: string]: string | number }[][]>([]);

    // 没有值时候的提示
    const placeholder = ref<string | number | boolean>('请选择');

    // loading
    const loading = ref<boolean>(false);

    // 是否展示清除按钮
    const showClear = ref<string | boolean | number>(true);

    // 选中项的下标
    const defaultIndex = ref<number[]>([]);

    // 选择项的高
    const itemHeight = ref<number>(70);

    // 选择器的实例
    const pickerRef = ref();

    /**
     * 打开选择器
     */
    async function open() {
        show.value = true;
        loading.value = true;
        await handleSelectList();
        if (selectList.value.length > 0) {
            pickerRef.value.setIndexs(defaultIndex.value);
        }
        loading.value = false;
    }

    /**
     * 关闭选择器
     */
    function cancel() {
        show.value = false;
    }

    /**
     * 点击确认后的回调
     * @param e 点击确认后的回调，参数为indexs下标、value选中的项、values数据源
     */
    function confirm(e: { indexs: number[]; value: apiSelectType[]; values: apiSelectType[] }) {
        if (selectList.value[0].length === 0) {
            cancel();

            return;
        }

        if (!e.value[0]) {
            fixSelectBug();
            return;
        }

        emit('handleSelect', { value: e.value[0], formItem: props.formItem });
        handleSelectIndex(e.value[0].value);
        cancel();
    }

    /**
     * uviewPlus的bug
     * 当清空第一项时，在继续选择第一项会报错,这时候的回调参数为undefined，需特殊处理
     */
    function fixSelectBug() {
        emit('handleSelect', { value: selectList.value[0][0], formItem: props.formItem });
        handleSelectIndex(selectList.value[0][0].value);
        cancel();
    }

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
                } else {
                    showToast('数据格式有误');
                }
            }
        } else if (props.formItem.options) {
            selectList.value = [props.formItem.options];
        }
    }

    /**
     * 给当前项赋值并且记录当前选中的下标
     * @param value 下拉的value值
     */
    function handleSelectIndex(value: string | number | boolean | object) {
        defaultIndex.value = [];

        if (selectList.value[0].length === 0) {
            selectLabel.value = '';
            selectValue.value = '';

            return;
        }

        selectList.value[0].forEach((item: { [key: string]: string | number }, index: number) => {
            if (item.value === value) {
                selectLabel.value = item.label;
                defaultIndex.value.push(index);
            }
        });
        selectValue.value = value;
    }

    /**
     * 清除按钮
     */
    function clearValue() {
        selectLabel.value = '';
        selectValue.value = '';
        defaultIndex.value = [];
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
            handleSelectIndex(props.formItem.defaultValue);
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
        handleSelectList,
        defaultIndex,
        pickerRef,
        handleSelectIndex,
        itemHeight,
    };
}
