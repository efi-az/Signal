<script setup lang="ts">
interface Props {
  htmlLabel?: string;
  disable?: boolean;
  name?: string;
}

const { htmlLabel, disable } = defineProps<Props>();
</script>
<template>
  <label v-if="htmlLabel" class="label" :for="name" :class="{ 'label--disable': disable }">{{ htmlLabel }}:</label>
</template>
<style scoped lang="scss">
.label {
  font-size: 20px;
  line-height: 31px;
  color: #2F2F2F;

  &--disable {
    opacity: 0.6;
  }
}
</style>
