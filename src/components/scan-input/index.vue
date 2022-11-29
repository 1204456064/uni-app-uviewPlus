<template>
    <view>
        <u-input v-model="inputValue" v-bind="formItem.attribute" @change="changeInputValue">
            <template #suffix>
                <u-icon name="scan" size="60"></u-icon>
            </template>
        </u-input>
    </view>
</template>
<script setup lang="ts">
import useIndex from './useIndex';
import { FormItem } from '../schema';
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
}>();

const { inputValue, changeInputValue } = useIndex(props, emit);
defineExpose({
    getBaseInputValue() {
        return inputValue.value;
    },
    setBaseInputValue(val: string | number) {
        inputValue.value = val;
    },
});
</script>
