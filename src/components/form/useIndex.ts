import { onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
export default function useIndex(props: { schemaList: FormItem[] }) {
    const componentList = ref<FormItem[]>([]);
    const rederComponent = ref<string>('');
    componentList.value = props.schemaList;
    console.log(componentList.value);
    onBeforeMount(() => {
        console.log(props.schemaList);
    });
    return {
        componentList,
        rederComponent,
    };
}
