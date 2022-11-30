<template>
    <view>
        <u-input v-model="inputValue" v-bind="formItem.attribute" @change="changeInputValue">
            <template v-if="renderSuffix" #suffix>
                <text>{{ textContent }}</text>
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

const { inputValue, changeInputValue, textContent, renderSuffix } = useIndex(props, emit);
defineExpose({
    getProp() {
        return props.formItem.prop;
    },
    setValue(val: string | number) {
        inputValue.value = val;
    },
});
</script>
