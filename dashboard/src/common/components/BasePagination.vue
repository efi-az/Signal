<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
<script setup lang="ts">
interface Props {
    modelValue: number;
    max: number;
    maxPages: number;
}

const { modelValue } = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', currentPage: number): void;
}>();

const currentPage = $computed({
    get() {
        return modelValue;
    },
    set(value: number) {
        emit('update:modelValue', value);
    },
});
</script>
<template>
    <div class="pagination">
        
    </div>
</template>