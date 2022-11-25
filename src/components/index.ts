import { defineAsyncComponent } from 'vue';
export const components: any = {
    BaseInput: defineAsyncComponent(() => import('@/components/input/index.vue')),
    BaseSelect: defineAsyncComponent(() => import('@/components/select/index.vue')),
};