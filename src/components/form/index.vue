<template>
    <view class="view-wrap">
        <u-form ref="formRef" :model="form" :rules="rules" :label-width="labelWidth">
            <view v-for="(item, index) in componentList" :key="index">
                <u-form-item :label="item.label" :prop="item.prop" :required="item.rules ? true : false">
                    <component
                        :is="components[item.type]"
                        :form-item="item"
                        class="compon"
                        @handle-emit="handleEmit"
                        @handle-select="handleSelect"
                    ></component>
                </u-form-item>
            </view>
        </u-form>
        <u-button type="primary" @click="valid">校验</u-button>
    </view>
</template>
<script setup lang="ts">
import useForm from './useForm';
import { FormItem } from '../schema';
import { components } from '@/components/index';

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
async function valid() {
    await formRef.value.validate();
}
const { componentList, form, rules, formRef, handleEmit, handleSelect } = useForm(props);

defineExpose({
    updateValue(item: { value: string | number; formItem: FormItem }) {},
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
