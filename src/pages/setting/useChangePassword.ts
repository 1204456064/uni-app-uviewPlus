import { unknownType } from './../../utils/types';
import { ref } from 'vue';

interface changePasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
export default function useChangePassword() {
    const form = ref<changePasswordForm>({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const formRef = ref();

    const rules = ref({
        oldPassword: {
            rules: [
                {
                    required: true,
                    errorMessage: '请输入原始密码',
                },
            ],
        },
        newPassword: {
            rules: [
                {
                    required: true,
                    errorMessage: '请输入新设密码',
                },
            ],
        },
        confirmNewPassword: {
            rules: [
                {
                    required: true,
                    errorMessage: '请输入确认密码',
                },
                {
                    validateFunction: (rule: unknownType, value: unknownType) => {
                        console.log(rule);
                        return form.value.newPassword.trim() === value.trim();
                    },
                    errorMessage: '两次输入密码不一致',
                },
            ],
        },
    });
    return {
        form,
        formRef,
        rules,
    };
}
