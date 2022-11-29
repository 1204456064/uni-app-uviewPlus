import { ref } from 'vue';
import { FormItem } from '@/components/schema';
import dictionary from '@/api/dictionary';

export default function conf() {
    const labelWidth = 200;

    const schemaList: FormItem[] = [
        {
            prop: 'cylinderCode111',
            label: '输入框12',
            type: 'ScanInput',
            attribute: { placeholder: '请输入输入框1', border: 'none' },
            rules: [{ required: true, message: '请输入输入框1' }],
        },
        {
            prop: 'cylinderCode',
            label: '输入框1',
            type: 'BaseInput',
            attribute: { placeholder: '请输入输入框1', border: 'none' },
            rules: [{ required: true, message: '请输入输入框1' }],
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
            label: '自定义下拉',
            type: 'BaseSelect',
            attribute: { placeholder: '请选择容积' },
            options: [
                {
                    label: '自定义下拉1',
                    value: 1,
                },
                {
                    label: '自定义下拉2',
                    value: 2,
                },
            ],
            rules: [{ required: true, message: '请选择写死下拉' }],
            labelField: 'cylinderCode2Label',
            defaultValue: 1,
        },
        {
            prop: 'cylinderCode3',
            label: 'api下拉',
            type: 'BaseSelect',
            attribute: { placeholder: '请选择api下拉' },
            rules: [{ required: true, message: '请选择api下拉' }],
            selectApi: dictionary.getInspectUnitList,
        },
    ];

    return {
        schemaList,
        labelWidth,
    };
}
