import { get } from '@/utils/request';

export const getDictionaryListByKey = (dictKey: string) => {
    return get('/api/v1/sys/dictItem/dropDown', {
        dictKey,
        dictTitle: '名称',
    });
};

/**
 * 字典表API
 */
export default {
    /**
     * 字典表 - 检验单位下拉
     */
    getInspectUnitList: () => getDictionaryListByKey('jydw'),
    /**
     * 字典表 - 维修单位下拉
     */
    getRepairUnitList: () => getDictionaryListByKey('wxdw'),
};
