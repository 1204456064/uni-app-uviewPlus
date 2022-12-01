/**
 * 扫码模式
 */
export const SCAN_MODE = {
    // MODE_ONE 普通扫码模式 扫码后返回结果、扫码失败后不重置表单
    MODE_ONE: 'commonScanningCode',
    // MODE_TWO 普通扫码模式 扫码后返回结果、失败后会重置表单
    MODE_TWO: 'commonScanningCodeAndClear',
    // MODE_THREE 连续扫码模式 扫码后重置条码，扫码失败不清空条码，并且重新聚焦
    MODE_THREE: 'continuousScanningCode',
    // MODE_FOUR 连续扫码模式 扫码后重置条码，扫码失败清空条码，并且重新聚焦
    MODE_FOUR: 'continuousScanningCodeAndClear',
};
