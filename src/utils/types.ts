export type httpType = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined;
export type httpData = any;
export type unknownType = any;

/**
 * 项目检查项类型
 */
export interface inspectionObj {
    inspectTitleId: string;
    inspectTitleName: string;
    inspectItemInfoList: inspectItemInfoListObj[];
}
/**
 * 项目检查项子项类型
 */
export interface inspectItemInfoListObj {
    enterContent: null | string;
    enterInfo: null | string;
    field: null | string;
    inspectItemId: string;
    inspectItemName: string;
    inspectItemValue: null | string | number;
    inspectTitleId: string;
    isUpload: number | string;
    remark: null | string;
    uploadPath: null | string;
    whetherEnterInfo: null | string;
    inspectRecordId?: null | string;
    transferPhaseId?: null | string;
}

/**
 * 年检数据类型
 */
export interface yearlyDateType {
    manufactureDate: string;
    nextInspectionDate: string;
}

/**
 * http请求后返回的数据类型
 */
export interface requestObj {
    code: number;
    data: object | Array<any>;
    message: string;
}

/**
 * api下单数据类型
 */
export interface apiSelectType {
    label: string | number;
    value: string | number;
}

/**
 * 组件select下拉数据类型
 */
export interface componentSelectType {
    text: string | number;
    value: string | number;
}

export interface userInfoObj {
    account: string;
    userName: string;
    roles: string;
    version?: string;
}

export interface tagConfigType {
    field: string;
    tagText: unknownType;
    tagType: unknownType;
}
