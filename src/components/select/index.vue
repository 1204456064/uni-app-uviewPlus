<template>
    <view>
        <view class="content component-height">
            <view class="content__left" @click="open">
                <view v-if="!selectValue">
                    <view class="content__placeholder">{{ placeholder }}</view>
                </view>
                <view v-if="selectValue">
                    <view>{{ selectLabel }}</view>
                </view>
            </view>
            <view v-if="showClear"> <u-icon name="close-circle-fill" size="40" @click="clearValue"></u-icon> </view>
        </view>
        <u-picker
            :show="show"
            :columns="selectList"
            v-bind="formItem.attribute"
            key-name="label"
            :loading="loading"
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
    (e: 'handleSelect', val: string | number): void;
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
} = useIndex(props, emit);

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
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__left {
        width: 100%;
    }

    &__placeholder {
        color: #cccfd6;
    }
}
</style>
