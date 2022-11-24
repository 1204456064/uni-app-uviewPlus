import { ref } from 'vue';

import cloud from '@/assets/images/login_cloud.png';
import order from '@/assets/images/login_order.png';
import sale from '@/assets/images/login_sale.png';
import analysis from '@/assets/images/login_analysis.png';
import { unknownType } from '@/utils/types';

interface loginForm {
    account: string;
    password: string;
}

export default function useLogin() {
    const formRef = ref();

    const form = ref<loginForm>({
        account: '',
        password: '',
    });

    const imageList = ref<unknownType>({
        cloud: cloud,
        order: order,
        sale: sale,
        analysis: analysis,
    });

    const rules = ref({
        account: [
            {
                required: true,
                errorMessage: '请输入用户名',
            },
        ],
        password: [
            {
                required: true,
                errorMessage: '请输入密码',
            },
        ],
    });
    return {
        form,
        formRef,
        rules,
        imageList,
    };
}
