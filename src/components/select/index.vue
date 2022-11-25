<template>
    <view>
        <view class="content component-height">
            <view>
                <view class="content__placeholder">{{ placeholder }}</view>
            </view>
        </view>
        <u-picker :show="show" :columns="columns" v-bind="formItem.attribute" key-name="label"></u-picker>
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
                type: 'BaseSelect',
            };
        },
    }
);

const emit = defineEmits<{
    (e: 'handleEmit', val: string | number): void;
}>();

const { selectValue, show, columns, placeholder } = useIndex(props, emit);
defineExpose({
    getBaseSelectValue() {
        return selectValue.value;
    },
    setBaseInputValue(val: string | number) {
        selectValue.value = val;
    },
});
</script>
<style lang="scss" scoped>
.content {
    &__placeholder {
        line-height: 60rpx;
        color: #cccfd6;
    }
}
</style>
