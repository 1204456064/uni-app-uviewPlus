<template>
    <view>
        <u-input v-model="testData.data1"> </u-input>
        <u-input v-model="testData.data2"> </u-input>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { FormItem } from '../schema';
withDefaults(
    defineProps<{
        formItem: FormItem;
    }>(),
    {
        formItem: () => {
            return {
                prop: '',
                label: '',
                type: 'TwoButton',
            };
        },
    }
);

const testData = ref<{ data1: string | number; data2: string | number }>({
    data1: '',
    data2: '',
});

defineExpose({
    getData() {
        return testData.value;
    },
    setData(obj: { data1: string | number; data2: string | number }) {
        testData.value = {
            ...testData.value,
            ...obj,
        };
    },
    resetData() {
        testData.value = {
            data1: '',
            data2: '',
        };
    },
});
</script>
