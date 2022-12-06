<template>
    <view>
        <view class="content component-height">
            <view class="content__left" @click="open">
                <view v-if="!dateValue">
                    <view class="content__placeholder">{{ placeholder }}</view>
                </view>
                <view v-if="dateValue">
                    <view>{{ dateValue }}</view>
                </view>
            </view>
            <view v-if="showClear"> <u-icon name="close-circle-fill" size="40" @click="clearValue"></u-icon> </view>
        </view>
        <u-datetime-picker
            v-model="dateValue"
            :show="show"
            mode="date"
            @confirm="confirm"
            @cancel="cancel"
        ></u-datetime-picker>
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
                type: 'DateTimePicker',
            };
        },
    }
);

const emit = defineEmits<{
    (e: 'handleDatePicker', val: string | number): void;
}>();

const { show, dateValue, showClear, placeholder, open, clearValue, cancel, confirm } = useIndex(props, emit);

defineExpose({
    getProp() {
        return props.formItem.prop;
    },
    async setValue(val: string | number) {},
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
