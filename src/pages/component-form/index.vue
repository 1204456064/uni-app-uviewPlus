<template>
    <div>
        <component-form :schema-list="conf().schemaList" :label-width="conf().labelWidth"></component-form>
    </div>
</template>

<script setup lang="ts">
import ComponentForm from '@/components/form/index.vue';
import conf from './conf';
</script>
