import { httpData } from '@/utils/types';
import { post, get } from '@/utils/request';
export default {
    /**
     * 新瓶入厂、钢瓶处理 - 扫码
     */
    newEnterScan: function newEnterScan(data: httpData) {
        return post('/app/v1/common/scan/newEnter', data);
    },
    /**
     * APP-检查项显示
     */
    showAppInspect: function showAppInspect(data: httpData) {
        return post('/app/v1/common/appInspect/showAppInspect', data);
    },
    /**
     * 阶段提交
     */
    submitPhase: function submitPhase(data: httpData) {
        return post('/app/v1/common/submit/phase', data);
    },
    /**
     * 继续使用申请
     */
    continueUseApplication: function continueUseApplication(data: httpData) {
        return post('/app/v1/year/inspect/continueUseApplication', data);
    },
    /**
     * 提交检查项
     */
    submitInspect: function submitInspect(data: httpData) {
        return post('/app/v1/common/submit/inspect', data);
    },

    /**
     * 适用阶段：扫码-年检前处理、年检出厂、年检入厂
     */
    inspectionOuter: function inspectionOuter(data: httpData) {
        return post('/app/v1/common/scan/inspectionOuter', data);
    },

    /**
     * 退出
     */
    changePassword: function submitInchangePasswordspect(data: httpData) {
        return post('/api/v1/user/manage/changePassword', data);
    },
    /**
     * 供应商下拉
     */
    supplier: function newEnterScan(data: httpData) {
        return get('/api/develop/dropDown/supplier', data);
    },
};
