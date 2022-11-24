import { httpData } from '@/utils/types';
import { get, post } from '@/utils/request';
export default {
    /**
     * app-登录
     */
    login: (data: httpData) => post('/api/v1/user/manage/login', data),
    /**
     * 退出登录
     */
    logout: () => get('/api/v1/user/manage/logout'),
    /**
     * 用户列表
     */
    userList: (data?: unknown) => get('/api/v1/user/manage/select', data),
};
