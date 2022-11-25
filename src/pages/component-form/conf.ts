import { ref } from 'vue';
import { FormItem } from '@/components/schema';

export default function conf() {
    const labelWidth = 200;

    const schemaList: FormItem[] = [
        {
            prop: 'cylinderCode',
            label: '输入框1',
            type: 'BaseInput',
            attribute: { placeholder: '请输入输入框1', border: 'none' },
            rules: { required: true, message: '请输入输入框1' },
            slots: {
                slotType: 'suffix',
                renderType: 'text',
                content: 'Mpa',
            },
        },
        {
            prop: 'cylinderCode1',
            label: '输入框2',
            type: 'BaseInput',
            attribute: { placeholder: '请输入输入框2', border: 'none' },
            slots: {
                slotType: 'suffix',
                renderType: 'text',
                content: 'kg',
            },
        },
        {
            prop: 'cylinderCode2',
            label: '下拉容积',
            type: 'BaseSelect',
            attribute: { placeholder: '请选择容积' },
        },
        {
            prop: 'cylinderCode2',
            label: '下拉容积',
            type: 'BaseSelect',
            attribute: { placeholder: '请选择容积' },
        },
    ];

    return {
        schemaList,
        labelWidth,
    };
}
