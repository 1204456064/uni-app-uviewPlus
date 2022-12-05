import { apiSelectType } from '@/utils/types';
import { formCheck, FormItem } from '../schema';

/**
 * 表单项input改变后的回调处理
 * @param form 表单的值
 * @param item 当前表单项和输入框的值
 */
export function handleBaseInpput(form: formCheck, item: { value: string | number; formItem: FormItem }) {
    form[item.formItem.prop] = item.value;
}

/**
 * 表单项input改变后的回调处理
 * @param form 表单的值
 * @param item 当前表单项和下拉的值
 */
export function handleBaseSelect(form: formCheck, item: { value: apiSelectType; formItem: FormItem }) {
    form[item.formItem.prop] = item.value.value;
    if (item.formItem.labelField) {
        form[item.formItem.labelField] = item.value.label;
    }
}
