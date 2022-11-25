import { formCheck, FormItem } from '../schema';

export function handleBaseInpput(form: formCheck, item: { value: string | number; formItem: FormItem }) {
    form[item.formItem.prop] = item.value;
}
