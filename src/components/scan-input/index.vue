<template>
    <view>
        <u-input
            v-model="inputValue"
            :focus="focus"
            v-bind="formItem.attribute"
            @confirm="confirm"
            @change="changeInputValue"
        >
            <template #suffix>
                <u-icon name="scan" size="60"></u-icon>
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

const emit = defineEmits<{
    (e: 'handleEmit', val: string | number): void;
    (e: 'handleSuccess', val: object | Array<object>): void;
}>();
const { inputValue, changeInputValue, confirm, focus, handlePDAScan } = useIndex(props, emit);

useScan(handlePDAScan);

defineExpose({
    setScanInputValue(val: string | number) {
        inputValue.value = val;
    },
});
</script>
