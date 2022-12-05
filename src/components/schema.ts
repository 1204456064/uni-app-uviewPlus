import { unknownType } from '@/utils/types';
/**
 * prop 表单字段名
 * label 左侧提示文字
 * type 表单组件
 * labelField 表单组件为BaseSelect时，是否需要保存label
 * codeScanningMode 表单项为ScanInput时，扫码模式 默认为commonScanningCode普通扫码
 * attribute 表单项的属性
 * defaultValue 表单项的默认值
 * rules 表单项的校验规则
 * slots 当表单项为BaseInput时的插槽 当前封装了后置插槽
 * options 当表单项为BaseSelect时，自定义选项的数据
 * selectApi 当表单项为BaseSelect时，接口返回的数据
 * scanInputApi 扫码输入框的扫码接口
 * selectParams 表单项为BaseSelect时，下拉参数
 * scanInputParmas 表单项为ScanInput时，请求接口所带的而外参数
 * defaultScan 表单项为ScanInput时，是否默认聚焦
 */
export interface FormItem {
    prop: string;
    label: string;
    // BaseInput 基本输入框
    // BaseSelect 基本选择器(下拉框)
    // ScanInput 带扫码的输入框
    type: 'BaseInput' | 'BaseSelect' | 'ScanInput';
    labelField?: string | number;
    // commonScanningCode 普通扫码模式 扫码后返回结果、扫码失败后不重置表单
    // commonScanningCodeAndClear 普通扫码模式 扫码后返回结果、失败后会重置表单
    // continuousScanningCode 连续扫码模式 扫码后重置条码，扫码失败不清空条码，并且重新聚焦
    // continuousScanningCodeAndClear 连续扫码模式 扫码后重置条码，扫码失败清空条码，并且重新聚焦
    codeScanningMode?:
        | 'commonScanningCode'
        | 'commonScanningCodeAndClear'
        | 'continuousScanningCode'
        | 'continuousScanningCodeAndClear';
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
    componentProps?: (opt: {
        value: string | number | boolean | object;
        formModel: formCheck;
        schema: FormItem[];
        formItem: FormItem;
        result: 'success' | 'error';
    }) => Promise<void> | void;
    show?: boolean;
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
