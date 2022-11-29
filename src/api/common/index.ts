import { httpData } from '@/utils/types';
import { post, get } from '@/utils/request';
export default {
    /**
     *  扫码
     */
    selectByCode: function newEnterScan(data: httpData) {
        return get('/app/v1/cylindermanagement/appCylinder/selectByCode', data);
    },
    /**
     * 退出
     */
    changePassword: function submitInchangePasswordspect(data: httpData) {
        return post('/api/v1/user/manage/changePassword', data);
    },
};
