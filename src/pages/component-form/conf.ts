import { FormItem } from '@/components/schema';
import dictionary from '@/api/dictionary';
import common from '@/api/common';

export default function conf() {
    const labelWidth = 200;

    const schemaList: FormItem[] = [
        {
            prop: 'cylinderCode',
            label: '条码号',
            type: 'ScanInput',
            attribute: { placeholder: '请输入输入框1', border: 'none' },
            rules: [{ required: true, message: '请输入输入框1' }],
            scanInputApi: common.selectByCode,
            codeScanningMode: 'commonScanningCodeAndClear',
            defaultScan: true,
        },
        {
            prop: 'cylinderCode2',
            label: '条码号2',
            type: 'ScanInput',
            attribute: { placeholder: '请输入输入框1', border: 'none' },
            rules: [{ required: true, message: '请输入输入框1' }],
            scanInputApi: common.selectByCode,
        },
        {
            prop: 'cylinderNum',
            label: '容器编码',
            type: 'BaseInput',
            attribute: { placeholder: '请输入输入框1', border: 'none' },
            rules: [{ required: true, message: '请输入输入框1' }],
        },
        {
            prop: 'valveMaterialLabel',
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
            prop: 'cylinderTypeLabel',
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
            prop: 'addTime',
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
        },
        {
            prop: 'cylinderVolume',
            label: 'api下拉',
            type: 'BaseSelect',
            attribute: { placeholder: '请选择api下拉' },
            rules: [{ required: true, message: '请选择api下拉' }],
            selectApi: dictionary.getInspectUnitList,
            defaultValue: '37a6113e8469d0474b9d4d90286d3e83',
        },
    ];

    return {
        schemaList,
        labelWidth,
    };
}
