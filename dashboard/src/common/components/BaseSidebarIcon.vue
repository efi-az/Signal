<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'BaseSidebarIcon',
});

const svgs = import.meta.globEager('/src/common/assets/images/sidebar-item/**/*.svg', { as: 'raw' })

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
    <div class="list-item__link--cover" v-html="dynamicSvg" />
</template>