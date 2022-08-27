<script setup lang="ts">
import { defineAsyncComponent, inject, onMounted } from 'vue';
import type { FormSchema } from '../types/form-schema.type';
import BaseCol from './BaseCol.vue';
import BaseRow from './BaseRow.vue';

interface Props {
    modelValue: object;
    schema: FormSchema[];
    readOnlyFields?: boolean;
}

const { modelValue, schema } = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', formData: any): void;
}>();

const formData = $computed({
    get() {
        return modelValue;
    },
    set(value: any) {
        emit('update:modelValue', value);
    },
});

const components: any = {};
const componentDefiner = (type: string) => {
    if (!components[type]) {
        components[type] = defineAsyncComponent(
            () => import(`../../common/components/form/Base${type}.vue`)
        );
    }
};

schema.forEach((i: FormSchema) => {
    for (const row of i.rows) {
        row.options = row.options || {};
        if (!['Empty'].includes(row.type)) {
            componentDefiner(row.type);
        }
    }
});

const fallbackChangeFormRef = (payload: any): any => payload;
const changeFormRef = inject('formRef', fallbackChangeFormRef) as (
    ref: any
) => void;

const formRef = $ref<any>();
onMounted(() => {
    if (changeFormRef) changeFormRef(formRef);
});

</script>
<template>
    <div class="form-generator">
        <form ref="formRef">
            <template v-for="(field, index) in schema" :key="index">
                <BaseRow align="start">
                    <template v-for="row in field.rows">
                        <slot :name="`field-${row.name}`" :field="row" :value="formData[row.name]"
                            :readOnlyForm="readOnlyFields">
                            <BaseCol v-if="!row.hidden" v-bind="row.grid">
                                <template v-if="row.type === 'Empty'"></template>
                                <template v-else-if="!row.hidden">
                                    <component v-model="formData[row.name]" :html-label="row.label"
                                        :class="row.cssClass" :is="components[row.type]" :key="index"
                                        :readonly="readOnlyFields || row.options.readonly" v-bind="row.options" />
                                </template>
                            </BaseCol>
                        </slot>
                    </template>
                </BaseRow>
            </template>
        </form>
    </div>
</template>