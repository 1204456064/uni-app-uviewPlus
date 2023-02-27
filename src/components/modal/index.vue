<template>
    <view>
        <u-modal
            :show="show"
            :title="title"
            :content="content"
            :confirm-text="confirmText"
            :cancel-text="cancelText"
            :show-cancel-button="showCancelButton"
            @confirm="confirm"
            @cancel="cancel"
        ></u-modal>
    </view>
</template>
<script lang="ts">
export default {
    name: 'BaseModal',
};
</script>
<script setup lang="ts">
import useIndex from './uesIndex';
const emit = defineEmits<{
    (e: 'confirmSubmit', value: { label: string; value: string | number }): void;
}>();

const { show, title, content, open, confirmText, cancelText, showCancelButton, confirm, cancel } = useIndex(emit);
defineExpose({
    open(val: string) {
        open(val);
    },
    cancel,
});
</script>
<style lang="scss">
:deep(.u-modal__content__text) {
    text-align: center;
}
</style>
