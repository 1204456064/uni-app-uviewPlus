import { formCheck, rulesCheck } from './../schema';
import { onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
import { handleBaseInpput } from './handleEmit';
export default function useIndex(props: { schemaList: FormItem[] }) {
    const componentList = ref<FormItem[]>([]);
    const formRef = ref();
    const form = ref<formCheck>({});
    const rules = ref<rulesCheck>({});

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

    function handleEmit(item: { value: string | number; formItem: FormItem }) {
        console.log(item);
        if (item.formItem.type === 'BaseInput') {
            handleBaseInpput(form.value, item);
        }
    }

    onBeforeMount(() => {
        componentList.value = props.schemaList;

        initForm();
        console.log(rules.value);
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
