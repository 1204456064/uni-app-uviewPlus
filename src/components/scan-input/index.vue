<template>
    <view class="component-height">
        <u-input
            v-model="inputValue"
            :focus="focus"
            v-bind="formItem.attribute"
            @confirm="confirm"
            @change="changeInputValue"
            @focus="focusFunction"
            @blur="blurFunction"
        >
            <template #suffix>
                <u-icon name="scan" size="60" @click="handleScan"></u-icon>
            </template>
        </u-input>
    </view>
</template>
<script setup lang="ts">
import useIndex from './useIndex';
import { FormItem } from '../schema';
import useScan from './use-scan';
const props = withDefaults(
    defineProps<{
        formItem: FormItem;
    }>(),
    {
        formItem: () => {
            return {
                prop: '',
                label: '',
                type: 'ScanInput',
            };
        },
    }
);
/**
 * handleEmit 双向绑定回调
 * handleScanInputSuccess 扫码成功回调，返回一个对象，对象的属性value为请求成功后的参数，formItem为当前表单项的配置
 * handleScanInputFail 扫码失败后的回调
 */
const emit = defineEmits<{
    (e: 'handleEmit', val: string | number): void;
    (e: 'handleScanInputSuccess', val: object | Array<object>): void;
    (e: 'handleScanInputFail', val: object | Array<object>): void;
}>();

const { inputValue, changeInputValue, confirm, focus, handlePDAScan, focusFunction, blurFunction, handleScan } =
    useIndex(props, emit);

useScan(handlePDAScan);

defineExpose({
    setData(val: string | number) {
        inputValue.value = val;
    },
});
</script>
<style lang="scss" scoped>
:deep(.u-input__content) {
    height: 70rpx;
}
</style>
