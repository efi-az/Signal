<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
<script setup lang="ts">
interface Props {
    title: string;
}
const { title } = defineProps<Props>();

</script>

<template>
    <button class="btn" v-bind="$attrs">
        {{ title }}
    </button>
</template>

<style scoped lang="scss">
</style>