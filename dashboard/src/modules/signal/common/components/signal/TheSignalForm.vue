<script setup lang="ts">
import BaseFormGenerator from '@/common/components/BaseFormGenerator.vue';
import BaseSelect from '@/common/components/form/BaseSelect.vue'
import { useGetMarketSearchList } from '../../composable/market.composable';
import { signalForm } from '../../schemas/signal/signal-form.schema';
import BaseInput from '../../../../../common/components/form/BaseInput.vue';

interface Props {
    formData: any;
    formParam: any;
}

const { formData, formParam } = defineProps<Props>();

const { data: marketOptionList, fetch: getMarketOptionList } = useGetMarketSearchList()

const marketText = async (search: string) => {
    try {
        if (search) await getMarketOptionList(search);
    } catch (err: any) {
        console.log(err);
    }
}

const marketOptions = $computed(() => {
    return marketOptionList.value.map((item) => ({
        value: item.id,
        label: item.crypto,
    }));
});

const marketList = [{ value: 'Spot', label: 'Spot' }, { value: 'Feature', label: 'Feature' }, { value: 'Hold', label: 'Hold' }]
const statusList = [{ value: 'Active', label: 'Active' }, { value: 'Archive', label: 'Archive' }, { value: 'Draft', label: 'Draft' }]
const barginList = [{ value: 'Buy', label: 'Buy' }, { value: 'Sell', label: 'Sell' }, { value: 'Short', label: 'Short' }, { value: 'Long', label: 'Long' }]

// target points
const points = ['هدف اول', 'هدف دوم', 'هدف سوم', 'هدف چهارم', 'هدف پنجم']
const pricePoint = $ref('')

const addTarget = () => {
    formData.targetPoints.push({ name: points[formData.targetPoints.length], price: parseInt(pricePoint) })
}

const removeTarget = (index: number) => {
    formData.targetPoints.splice(index, 1)
}

</script>
<template>
    <div class="mt-4">
        <BaseFormGenerator v-model="formData" :schema="signalForm">
            <template #field-market="{ field, readOnlyForm }">
                <div class="col-12 col-md-3">
                    <BaseSelect v-model="formParam.market" :options="marketList" html-label="ارز" :class="field.cssClass"
                        :readonly="readOnlyForm" v-bind="field.options" />
                </div>
            </template>
            <template #field-status="{ field, readOnlyForm }">
                <div class="col-12 col-md-3">
                    <BaseSelect v-model="formParam.status" :options="statusList" html-label="وضعیت"
                        :class="field.cssClass" :readonly="readOnlyForm" v-bind="field.options" />
                </div>
            </template>
            <template #field-bargin="{ field, readOnlyForm }">
                <div class="col-12 col-md-3">
                    <BaseSelect v-model="formParam.bargin" :options="barginList" html-label="نوع معامله"
                        :class="field.cssClass" :readonly="readOnlyForm" v-bind="field.options" />
                </div>
            </template>
            <template #field-marketId="{ field, readOnlyForm }">
                <div class="col-12 col-md-3">
                    <BaseSelect v-model="formData.marketId" @search="marketText" :options="marketOptions"
                        html-label="مارکت" :class="field.cssClass" :readonly="readOnlyForm" v-bind="field.options" />
                </div>
            </template>
            <template #field-targetPoints="{ field, readOnlyForm }">
                <div class="col-12 col-md-3">
                    <div class="target-point">
                        <BaseInput html-label="اهداف" name="target" v-model="pricePoint" type="number">
                            <img src="@/common/assets/images/add-square-color.svg" @click="addTarget" alt="...">
                        </BaseInput>
                        <div class="target-point__tp-parent">
                            <div class="target-point__tp-item" v-for="(item, index) in formData.targetPoints">
                                <img src="@/common/assets/images/close-square.svg" class="target-point__tp-item--close"
                                    @click="removeTarget(index)" alt="...">
                                <span class="target-point__tp-item--title">{{ item.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </BaseFormGenerator>
    </div>
</template>
<style scoped lang="scss">
.target-point {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    .input {
        margin-bottom: 0.7rem;
    }

    &__tp-parent {
        display: flex;
        flex-wrap: wrap;
    }

    &__tp-item {
        display: flex;
        width: 67px;
        height: 54px;
        justify-content: center;
        align-items: center;
        margin: 8px 3px;
        position: relative;
        background: #D6E4F0;
        border-radius: 10px;

        &--close {
            position: absolute;
            top: -10px;
            cursor: pointer;
        }

        &--title {
            color: var(--base-color);
        }
    }
}
</style>