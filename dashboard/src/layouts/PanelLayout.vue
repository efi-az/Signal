<script setup lang="ts">
import BaseRouterView from '@/common/components/BaseRouterView.vue';
import { computed } from 'vue';
import TheSidebar from '../common/components/main-layout/sidebar/TheSidebar.vue';
import { useRoute } from 'vue-router';
import type { RouteRecordType } from '@/common/types/route.type';
import TheHeader from '../common/components/main-layout/sidebar/header/TheHeader.vue';

const route = useRoute();

const breadCrumbs = computed(() => {
  const matchedRoutes = route.matched as unknown as RouteRecordType[];
  return matchedRoutes.map((route: RouteRecordType) => ({
    icon: route.meta.icon,
    label: route.meta.title,
    link: route.path,
  }));
});

const title = 'سیگنال';

</script>

<template>
    <div class="panel-layout">
        <TheHeader />
        <TheSidebar />
        <base-router-view class="base-content" />
    </div>
</template>
