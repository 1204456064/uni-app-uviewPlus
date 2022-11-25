export interface FormItem {
    prop: string;
    label: string;
    type: 'BaseInput' | 'BaseSelect';
    attribute?: {
        [key: string]: string | boolean | number;
    };
    defaultValue?: defaultValueCheck;
    rules?: rulesItemCheck;
    slots?: slotsCheck;
}

//默认值类型
export type defaultValueCheck = object | string | number | boolean;

// 表单值类型
export interface formCheck {
    [key: string]: string | number | object | boolean;
}

// 表单rules校验规则类型
export interface rulesCheck {
    [key: string]: rulesItemCheck;
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
