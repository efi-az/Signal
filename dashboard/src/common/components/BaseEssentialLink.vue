<script lang="ts">
import { defineComponent } from 'vue';
import type { MenuType } from '../types/menu.type';
export default defineComponent({
  name: 'BaseEssentialLink',
});
</script>
<script setup lang="ts">
import BaseSidebarIcon from './BaseSidebarIcon.vue';

interface Props {
  id?: number;
  title?: string;
  icon?: string;
  link: string;
  level?: number;
  children?: MenuType[] | null;
}

defineProps<Props>();
</script>

<template>
  <li class="list-item">
    <template v-if="!children">
      <router-link class="list-item__link" active-class="list-item__link--active" :to="link">

        <base-sidebar-icon :name="icon" />

        <div class="list-item__link--title">
          <span class="title__span">{{ title }}</span>
        </div>

      </router-link>
    </template>

    <template v-else>
      <template v-if="children && children.length">

        <base-essential-link v-for="child in children" :key="child.link" v-bind="child" />

      </template>
      <template v-else>
        <router-link class="list-item__link" active-class="list-item__link--active" :to="link">

          <base-sidebar-icon :name="icon" />

          <div class="list-item__link--title">
            <span class="title__span">{{ title }}</span>
          </div>

        </router-link>
      </template>
    </template>
  </li>
</template>

<style scoped lang="scss">
</style>
