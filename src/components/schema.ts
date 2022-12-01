import { unknownType } from '@/utils/types';

export interface FormItem {
    prop: string;
    labelField?: string | number;
    label: string;
    type: 'BaseInput' | 'BaseSelect' | 'ScanInput';
    attribute?: {
        [key: string]: string | boolean | number;
    };
    defaultValue?: defaultValueCheck;
    rules?: rulesItemCheck[];
    slots?: slotsCheck;
    options?: { label: string | number; value: string | number }[];
    selectApi?: ((params: { [key: string]: string | boolean | number | object }) => Promise<unknownType>) | undefined;
    scanInputApi?:
        | ((params: { [key: string]: string | boolean | number | object }) => Promise<unknownType>)
        | undefined;
    selectParams?: {
        [key: string]: string | boolean | number | object;
    };
    scanInputParmas?: {
        [key: string]: string | number;
    };
    defaultScan?: boolean;
}

//默认值类型
export type defaultValueCheck = object | string | number | boolean;

// 表单值类型
export interface formCheck {
    [key: string]: string | number | object | boolean;
}

// 表单rules校验规则类型
export interface rulesCheck {
    [key: string]: rulesItemCheck[];
}

// 表单项rules的校验规则类型
export interface rulesItemCheck {
    [key: string]: string | boolean | number | string[];
}

// 输入框插槽
export interface slotsCheck {
    slotType: 'suffix' | 'prefix';
    renderType: 'text';
    content: string;
    buttonFunction?: () => void;
}

// 下拉解构
export interface baseSelecCheck {
    data: { [key: string]: string | number }[];
}
