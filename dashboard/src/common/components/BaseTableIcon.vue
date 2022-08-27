<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'BaseActionsIcon',
});

const svgs = import.meta.globEager('/src/common/assets/images/actions-item/**/*.svg', { as: 'raw' })

</script>

<script setup lang="ts">

interface Props {
    name?: string;
}

const { name } = defineProps<Props>();

let dynamicSvg: string;

for (const [key, value] of Object.entries(svgs)) {
    if (key.toString().search(name) !== -1) {
        dynamicSvg = value
    }
}

</script>

<template>
    <div class="table-icon" v-html="dynamicSvg" />
</template>