<script setup lang="ts">
import { useRoute } from 'vue-router';
import BaseButton from '@/common/components/BaseButton.vue';
import { reactive } from 'vue';
import type { CreateSignalDTO, CreateSignalParamDTO } from '@/api/dto/createSignalDTO';
import TheSignalForm from '../common/components/signal/TheSignalForm.vue';
import { useCreateSignal } from '../common/composable/signal.composabel';

const route = useRoute()
let editMode = $ref(route.params.id !== undefined)

const formData = reactive<CreateSignalDTO>({
    description: null,
    entryPrice: null,
    imageId: null,
    leverage: null,
    marketId: null,
    risk: null,
    stopLoss: null,
    targetPoints: [],
});

const formParam = reactive<CreateSignalParamDTO>({
    bargin: 'Buy',
    market: 'Spot',
    status: 'Active'
})

const { fetch: createSignal } =
    useCreateSignal();
// const { fetch: updateArticle, isLoading: updateArticleLoading } =
//     useUpdateArticle();

const handleSubmit = async () => {
    let finalData = { ...formData } as any;

    for (let key in finalData) {
        if (finalData[key] === '') finalData[key] = undefined;
    }

    if (editMode) {
        try {
            // await updateArticle(finalData, '');
        } catch (err: any) {
            console.log(err);
        }
    } else {
        try {
            await createSignal(finalData, formParam);
        } catch (err: any) {
            console.log(err);
        }
    }
};

</script>
<template>
    <div>
        <span class="v-color-base v-fs-2 v-fw-bold">{{ editMode ? 'ویرایش سیگنال' : 'ساخت سیگنال' }}</span>
        <TheSignalForm v-model:formData="formData" v-model:formParam="formParam" />
        <BaseButton :title="editMode ? 'ویرایش سیگنال' : 'پست کردن سیگنال'" class="v-btn-success"
            @click="handleSubmit" />
    </div>
</template>