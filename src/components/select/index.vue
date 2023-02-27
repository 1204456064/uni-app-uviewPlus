<template>
    <view>
        <view class="content component-height">
            <view class="content__left" @click="open">
                <view v-if="!selectValue || selectList.length === 0">
                    <view class="content__placeholder">{{ placeholder }}</view>
                </view>
                <view v-if="selectValue && selectList.length > 0">
                    <view>{{ selectLabel }}</view>
                </view>
            </view>
            <view v-if="showClear"> <u-icon name="close-circle-fill" size="40" @click="clearValue"></u-icon> </view>
        </view>
        <u-picker
            v-bind="formItem.attribute"
            ref="pickerRef"
            :show="show"
            :columns="selectList"
            key-name="label"
            :loading="loading"
            :item-height="itemHeight"
            @cancel="cancel"
            @confirm="confirm"
        ></u-picker>
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
    (e: 'handleSelect', val: { value: { label: string | number; value: string | number }; formItem: FormItem }): void;
}>();

const {
    selectValue,
    show,
    selectList,
    placeholder,
    open,
    cancel,
    confirm,
    selectLabel,
    loading,
    clearValue,
    showClear,
    handleSelectList,
    pickerRef,
    handleSelectIndex,
    itemHeight,
} = useIndex(props, emit);

defineExpose({
    async setData(val: string | number) {
        if (val === '') {
            selectValue.value = val;
            selectLabel.value = val;
            // 需要特殊处理的属性
            if (props.formItem.attribute) {
                if (props.formItem.attribute.placeholder) {
                    placeholder.value = props.formItem.attribute.placeholder;
                }
            }

            return;
        }
        await handleSelectList();
        handleSelectIndex(val);
    },
});
</script>
<style lang="scss" scoped>
.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70rpx;

    &__left {
        width: 100%;
    }

    &__placeholder {
        color: #cccfd6;
        font-size: 16px;
    }
}
</style>
