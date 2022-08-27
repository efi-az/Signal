<script setup lang="ts">
interface Props {
  align?: 'center' | 'end' | 'start' | 'baseline';
}

const { align = 'start' } = defineProps<Props>();
</script>
<template>
  <div class="row" :class="`align-items-${align}`">
    <slot />
  </div>
</template>
<style scoped lang="scss">
</style>
