<template>
    <div>
        <component-form
            ref="formRef"
            :schema-list="conf().schemaList"
            :label-width="conf().labelWidth"
        ></component-form>
    </div>
    <u-button type="primary" @click="submit">提交</u-button>
</template>

<script setup lang="ts">
import ComponentForm from '@/components/form/index.vue';
import { ref } from 'vue';
import conf from './conf';
const formRef = ref();
async function submit() {
    const res = await formRef.value.validForm();
    if (!res) {
        return;
    }
}
</script>
