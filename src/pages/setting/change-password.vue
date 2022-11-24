<template>
    <view class="view-wrap">
        <view>
            <uni-forms ref="formRef" :label-width="100" :model-value="form" :rules="rules">
                <uni-forms-item label="原始密码" required name="oldPassword"
                    ><uni-easyinput v-model="form.oldPassword" type="text" placeholder="请输入用户名"
                /></uni-forms-item>
                <uni-forms-item label="新设密码" required name="newPassword"
                    ><uni-easyinput v-model="form.newPassword" type="password" placeholder="请输入密码"
                /></uni-forms-item>
                <uni-forms-item label="确认新密码" required name="confirmNewPassword"
                    ><uni-easyinput v-model="form.confirmNewPassword" type="password" placeholder="请输入密码"
                /></uni-forms-item>
            </uni-forms>
            <button type="primary" @click="submit">提交</button>
        </view>
    </view>
</template>
<script setup lang="ts">
import common from '@/api/common';
import { clearToken, getStorage } from '@/utils/uni-storage';
import { ref } from 'vue';
import useChangePassword from './useChangePassword';
import { showSuccessToastWithNavget } from '@/utils/messageTip';
const { form, formRef, rules } = useChangePassword();

async function submit() {
    const validForm = ref<boolean>(false);
    await formRef.value.validate((valid: boolean) => {
        if (!valid) {
            validForm.value = true;
        } else {
            validForm.value = false;
        }
    });

    if (!validForm.value) {
        return;
    }
    uni.showModal({
        title: '',
        content: '是否确认更改密码？',
        success: (res) => {
            if (res.confirm) {
                submitForm();
            }
        },
    });
}

async function submitForm() {
    const data = {
        oldPassword: form.value.oldPassword,
        newPassword: form.value.newPassword,
        userId: getStorage('userInfo').id,
    };
    const res = await common.changePassword(data);
    if (res) {
        clearToken();
        showSuccessToastWithNavget('/pages/login/index');
    }
}
</script>
