<script setup lang="ts">
interface Props {
  cols?: number | string;
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
}

const { cols = 12, ...props } = defineProps<Props>();

const cssClass = $computed(() => {
  let classes = `col-sm-${cols} `;
  for (const i in props) {
    if (props[i]) classes += `col-${i}-${props[i] as string} `;
  }
  return classes;
});
</script>
<template>
  <div :class="cssClass">
    <slot />
  </div>
</template>
