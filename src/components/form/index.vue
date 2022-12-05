<template>
    <view class="view-wrap">
        <u-form ref="formRef" :model="form" :rules="rules" :label-width="labelWidth">
            <view v-for="item in renderComponentList" :key="item.prop">
                <u-form-item
                    v-if="item.show !== false"
                    :label="item.label"
                    :prop="item.prop"
                    :required="item.rules ? true : false"
                >
                    <component
                        :is="components[item.type]"
                        :ref="setComponentRef"
                        :form-item="item"
                        class="compon"
                        @handle-emit="handleEmit"
                        @handle-select="handleSelect"
                        @handle-scan-input-success="handleScanInputSuccess"
                        @handle-scan-input-fail="handleScanInputFail"
                    ></component>
                </u-form-item>
            </view>
        </u-form>
    </view>
</template>
<script setup lang="ts">
import useForm from './useForm';
import { FormItem } from '../schema';
import { components } from '@/components/index';
import { ref } from 'vue';

const props = withDefaults(
    defineProps<{
        schemaList: FormItem[];
        labelWidth?: number;
    }>(),
    {
        schemaList: () => [],
        labelWidth: 200,
    }
);
async function validForm() {
    const valid = ref<boolean>(false);
    await formRef.value
        .validate()
        .then(() => {
            valid.value = true;
        })
        .catch(() => {
            valid.value = false;
        });
    return valid.value;
}
const {
    renderComponentList,
    form,
    rules,
    formRef,
    handleEmit,
    handleSelect,
    handleScanInputSuccess,
    setComponentRef,
    handleScanInputFail,
} = useForm(props);

defineExpose({
    updateValue(item: { value: string | number; formItem: FormItem }) {},

    async validForm() {
        return await validForm();
    },
});
</script>
<style lang="scss" scoped>
:deep(.u-form-item__body) {
    border-bottom: 1px rgb(214, 215, 217) solid;
}

.compon {
    width: 100%;
}
</style>
