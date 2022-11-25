export type httpType = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined;
export type httpData = any;
export type unknownType = any;

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
