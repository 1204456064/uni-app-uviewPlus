import { showToast } from '@/utils/messageTip';

export default function handleScan(inputValue: string | number) {
    /**
     * 扫码处理
     */
    // function handleScan(item: XFormItem) {
    //     // 清空条码
    //     formModel.value[`${item.prop}`] = '';

    //     uni.scanCode({
    //         onlyFromCamera: true,
    //         scanType: ['qrCode', 'barCode'],
    //         success: ({ result }) => {
    //             formModel.value[`${item.prop}`] = result;
    //         },
    //         fail: (error) => {
    //             uni.showToast({
    //                 title: '已取消扫码',
    //                 icon: 'none',
    //                 duration: 3000,
    //             });
    //         },
    //         complete: () => {
    //             // 调用扫码查询
    //             if (formModel.value[`${item.prop}`]) {
    //                 searchCylinderCode(formModel.value[`${item.prop}`], item);
    //             }
    //         },
    //     });
    // }

    return {
        handleScan,
    };
}
