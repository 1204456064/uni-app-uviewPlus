<template>
    <div>
        <component-form
            ref="formRef"
            :schema-list="conf().schemaList"
            :label-width="conf().labelWidth"
        ></component-form>
    </div>
    <base-modal ref="baseModalRef" @confirm-submit="confirmSubmit"></base-modal>
    <u-button type="primary" @click="submit">提交</u-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import conf from './conf';
const formRef = ref();

const baseModalRef = ref();

async function submit() {
    const res = await formRef.value.validForm();
    if (!res) {
        console.log('未通过校验的宝');

        return;
    }
    baseModalRef.value.open('是否确认提交');
    console.log('通过校验了宝');
}

function confirmSubmit() {
    console.log('我提交了');
    baseModalRef.value.cancel();
}
</script>
