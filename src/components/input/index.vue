<template>
    <view class="component-height">
        <u-input v-model="inputValue" v-bind="formItem.attribute" @change="changeInputValue">
            <template #suffix>
                <text v-if="formItem.slots?.renderType === 'text'">{{ textContent }}</text>
                <u-tag v-if="formItem.slots?.renderType === 'tag'" v-bind="formItem.slots?.tagAttribute"></u-tag>
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
                type: 'BaseInput',
            };
        },
    }
);

const emit = defineEmits<{
    (e: 'handleEmit', val: string | number): void;
}>();

const { inputValue, changeInputValue, textContent } = useIndex(props, emit);
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
