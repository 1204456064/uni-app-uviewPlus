import { ref } from 'vue';
import { FormItem } from '@/components/schema';

export default function conf() {
    const labelWidth = 200;

    const schemaList: FormItem[] = [
        {
            prop: 'cylinderCode',
            label: '输入框1',
            type: 'BaseInput',
            attribute: { placeholder: '请输入输入框1' },
            rules: { required: true, message: '此为必填字段121212' },
        },
        {
            prop: 'cylinderCode1',
            label: '输入框2',
            type: 'BaseInput',
            attribute: { placeholder: '请输入输入框2' },
        },
    ];

    return {
        schemaList,
        labelWidth,
    };
}
