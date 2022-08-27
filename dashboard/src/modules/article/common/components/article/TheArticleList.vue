<script setup lang="ts">
import { ArticleStatus } from "@/api/model/articleStatusEnum";
import BaseTable from "../../../../../common/components/BaseTable.vue";
import BaseTableIcon from '@/common/components/BaseTableIcon.vue';

interface Props {
    modelValue: number;
    totalPage: number;
    items: Array<any>;
    loading: boolean;
}

const { modelValue, totalPage, items, loading } = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
    (e: 'detailsClicked', event: Event, payload: any): void;
    (e: 'editClicked', event: Event, id: string): void;
    (e: 'deleteClicked', event: Event, id: string): void;
}>();

const columns = [
    {
        name: 'articleImage',
        label: 'تصویر',
        field: 'obj_article_image',
        headerStyle: 'width: 10%',
    },
    {
        name: 'title',
        label: 'عنوان',
        field: 'title',
        headerStyle: 'width: 25%',
    },
    {
        name: 'pin_status',
        label: 'پین',
        field: 'pin_status',
        headerStyle: 'width: 25%',
    },
    {
        name: 'article_category',
        label: 'دسته بندی',
        field: 'obj_categories',
        headerStyle: 'width: 15%',
    },
    {
        name: 'status',
        label: 'وضعیت',
        field: 'status',
        headerStyle: 'width: 15%',
    },
];

const page = $computed({
    get() {
        return modelValue;
    },
    set(value: number) {
        emit('update:modelValue', value);
    },
});

</script>
<template>
    <div>
        <BaseTable :columns="columns" :rows="items" :max-pages="3" :max="totalPage" :loading="loading" :max-rows="10"
            v-model="page">

            <template #obj_categories="{ value }">
                <template v-for="(item, index) in value">
                    <span>{{ item.name }}</span>
                    <i v-if="index == 0"> , </i>
                </template>
            </template>

            <template #pin_status="{ value }">
                <span class="badge v-badge-success" v-if="value">پین</span>
            </template>

            <template #status="{ value }">
                <span>{{ value === ArticleStatus.ACTIVE ? "فعال" : "غیرفعال" }}</span>
            </template>

            <template #obj_article_image="{ value }">
                <img :src="'http://localhost:4000/article/image/files/' + value?.fileName" alt="...">
            </template>

            <template #actions="{ value }">

                <div class="action-item">
                    <BaseTableIcon name="delete" @click="$emit('deleteClicked', $event, value.id)" />
                    <BaseTableIcon name="update" @click="$emit('editClicked', $event, value.id)" />
                </div>

            </template>

        </BaseTable>
    </div>
</template>