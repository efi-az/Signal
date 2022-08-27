<script setup lang="ts">
import { MarketStatusEnum } from "@/api/model/marketStatusEnum";
import BaseTable from "@/common/components/BaseTable.vue";
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
        name: 'crypto',
        label: 'crypto',
        field: 'crypto',
        headerStyle: 'width: 15%',
    },
    {
        name: 'base',
        label: 'base',
        field: 'base',
        headerStyle: 'width: 25%',
    },
    {
        name: 'image',
        label: 'image',
        field: 'image',
        headerStyle: 'width: 25%',
    },
    {
        name: 'status',
        label: 'وضعیت',
        field: 'status',
        headerStyle: 'width: 10%',
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

            <template #base="{ value }">
                <span class="text-uppercase">{{ value }}</span>
            </template>

            <template #crypto="{ value }">
                <span class="text-uppercase">{{ value }}</span>
            </template>

            <template #status="{ value }">
                <span>{{ value === MarketStatusEnum.ENABLE ? "فعال" : "غیرفعال" }}</span>
            </template>

            <template #image="{ value }">
                <img :src="value" style="width: 40px;" alt="...">
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