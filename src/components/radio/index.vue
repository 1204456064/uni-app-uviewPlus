<template>
    <view class="radio-style">
        <u-radio-group v-model="radioValue" v-bind="formItem.attribute" placement="row">
            <u-radio
                v-for="(item, index) in radioList"
                :key="index"
                :custom-style="style"
                :label="item.label"
                :name="item.label"
                size="22px"
                icon-size="14px"
                label-size="14px"
                @change="radioChange(item)"
            >
            </u-radio>
        </u-radio-group>
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
                type: 'BaseRadio',
            };
        },
    }
);

const emit = defineEmits<{
    (e: 'handleEmit', val: { value: { label: string | number; value: string | number }; formItem: FormItem }): void;
}>();

const { radioValue, radioList, radioChange } = useIndex(props, emit);

const style = { marginRight: '40rpx' };

defineExpose({
    getProp() {
        return props.formItem.prop;
    },
    setValue(val: string | number) {
        props.formItem.radioList!.forEach((item) => {
            if (item.value === val) {
                radioValue.value = item.label;
            }
        });
    },
});
</script>

<style lang="scss" scoped>
.radio-style {
    display: flex;
    align-items: center;
}
:deep(.u-radio) {
    height: 70rpx;
    line-height: 70rpx;
    margin: 0;
}
</style>
