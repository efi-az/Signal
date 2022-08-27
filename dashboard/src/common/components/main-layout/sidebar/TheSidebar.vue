<script setup lang="ts">
import type { RouteRecordType } from '@/common/types/route.type';
import type { MenuType } from '@/common/types/menu.type'
import { computed, ref } from 'vue';
import { routes } from '@/router/routes';
import BaseEssentialLink from '../../BaseEssentialLink.vue';
import BaseSidebarIcon from '../../BaseSidebarIcon.vue';

let leftDrawerOpen = ref(true);

const generateMenu = (
    route: RouteRecordType,
    tree: MenuType[],
    currentPath = '',
    level: number
): MenuType[] => {
    if (route.children) {
        route.children.forEach((childRoute: RouteRecordType) => {
            if (childRoute?.meta?.showInMenu !== false) {
                let item: MenuType = {
                    icon: childRoute.meta.icon,
                    title: childRoute.meta.title,
                    level: level,
                    link: currentPath
                        ? `${currentPath}/${childRoute.path}`
                        : childRoute.path,
                    children: [],
                };
                tree.push(item);
                if (item.children) {
                    return generateMenu(
                        childRoute,
                        item.children,
                        currentPath ? `${currentPath}/${childRoute.path}` : childRoute.path,
                        level + 0.3
                    );
                }
            }
        });
    }
    return tree;
};

const drawerMenu = computed(() => {
    let menus: MenuType[] = [];

    routes.forEach((route) => {
        menus = [...menus, ...generateMenu(route, [], '', 0)];
    });

    return menus;
});
// console.log('>>>', drawerMenu);

</script>

<template>
    <div class="sidebar">
        <div class="sidebar__head">
            <img class="sidebar__head--cover" src="@/common/assets/images/sidebar-head.svg" alt="...">
            <img class="sidebar__head--title" src="@/common/assets/images/crypto-signal.png" alt="...">
        </div>
        <ul class="sidebar__list">
            <base-essential-link v-for="menu in drawerMenu" :key="menu.title" v-bind="menu" />
            <li class="list-item list-item__logout">
                <div class="list-item__link">
                    <base-sidebar-icon name="logout" />
                    <div class="list-item__link--title">
                        <span class="title__span">خروج از حساب کاربری</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.sidebar {
    position: fixed;
    right: 0;
    top: 0;
    background: var(--sidebar-color);
    width: 240px;
    height: 100%;
    padding: 25px 0;
    overflow: hidden;

    &__head {
        height: auto;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        position: relative;

        &--title {
            position: absolute;
            margin-top: 9%;
            width: 55%;
        }

    }

    &__list {
        height: 100%;
        margin-top: 70px;
        padding: 0 25px;
    }

    &::v-deep(.list-item) {
        height: 60px;
        display: flex;
        align-items: center;

        &.list-item__logout {
            cursor: pointer;
            position: absolute;
            bottom: 0;
            right: 25px;
            height: 70px;

            .list-item__link {

                &--cover {

                    svg path {
                        fill: #E24036;
                    }
                }

                &--title {
                    color: #E24036;
                }
            }
        }

        .list-item__link {
            width: 100%;
            display: flex;
            align-items: center;
            text-decoration: none;
            font-family: $fw-fa-base-regular;

            &--cover {
                width: 24px;
                height: 24px;

                svg path {
                    transition: 200ms;
                    fill: #979797;
                }
            }

            &--title {
                transition: 200ms;
                font-size: 16px;
                line-height: 25px;
                color: #979797;
                margin: 0 15px;
            }
        }

        .list-item__link--active {
            font-family: $fw-fa-base-bold;

            .list-item__link--cover svg path {
                fill: var(--base-color);
            }

            .list-item__link--title {
                font-size: 20px;
                color: var(--base-color);
            }
        }
    }
}
</style>