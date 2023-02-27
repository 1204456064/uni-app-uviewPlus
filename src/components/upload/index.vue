<template>
    <view>
        <u-upload
            :file-list="fileList"
            name="1"
            v-bind="formItem.attribute"
            width="140"
            height="140"
            @delete="deletePicture"
            @after-read="afterRead"
        ></u-upload>
    </view>
</template>
<script setup lang="ts">
import useIndex from './useIndex';
import { FormItem } from '../schema';
import { unknownType } from '@/utils/types';
const props = withDefaults(
    defineProps<{
        formItem: FormItem;
    }>(),
    {
        formItem: () => {
            return {
                prop: '',
                label: '',
                type: 'BaseUpload',
            };
        },
    }
);

const emit = defineEmits<{
    (e: 'handleEmit', val: string | number): void;
}>();

const { fileList, afterRead, deletePicture, initFileList } = useIndex(props, emit);
defineExpose({
    setData(val: unknownType) {
        initFileList(val);
    },
});
</script>
