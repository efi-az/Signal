<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { faNumberToEnNumber } from '@/common/utilities/faNumberToEnNumber';
import BaseLabel from './BaseLabel.vue';

interface Props {
    modelValue?: string | number | null;
    htmlLabel?: string;
    filters?: any[];
    type?:
    | 'text'
    | 'password'
    | 'textarea'
    | 'email'
    | 'search'
    | 'tel'
    | 'file'
    | 'number'
    | 'url'
    | 'time'
    | 'date'
    | undefined;
    separate?: boolean;
    separateBy?: string;
    hint?: string;
    name?: string;
    disable?: boolean;
}

const {
    modelValue,
    htmlLabel,
    filters,
    separate = false,
    type,
    name,
    hint,
} = defineProps<Props>();

const instance = getCurrentInstance();
const attrs = instance?.attrs;
const min = parseInt(attrs?.min as string);
const max = parseInt(attrs?.max as string);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
}>();

function refactorNumber(num: string): number {
    let results = num.replace(/[^0-9\-\.]/g, '');
    let numberValue = parseInt(results);
    numberValue = isNaN(numberValue) ? 0 : numberValue;

    if (!isNaN(min) && numberValue < min) numberValue = min;
    if (!isNaN(max) && numberValue > max) numberValue = max;

    return numberValue;
}

let forceUpdate = $ref(false);
let value = $computed({
    get() {
        forceUpdate;

        if (!modelValue) return modelValue;

        let results = faNumberToEnNumber(modelValue as string);

        if (Array.isArray(filters)) {
            results = filters.reduce(
                (prev: string, filter: any) => filter(prev),
                results
            );
        }

        if (type === 'number') {
            results = results.replace(/[^0-9\-]/g, '');
        }

        if (separate) {
            results = results
                .replace(/\,/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        return results;
    },

    set(value?: string | number | null) {

        let results: string | number = value?.toString() ?? '';

        if (Array.isArray(filters)) {
            results = filters.reduce(
                (prev: string, filter: any) => filter(prev),
                value
            );
        }

        results = faNumberToEnNumber(results as string);

        if (type === 'number') {
            results = refactorNumber(results);
        }

        forceUpdate = !forceUpdate;

        emit('update:modelValue', results);
    },
});

</script>
<template>
    <div class="input" :class="$attrs.class">
        <BaseLabel :html-label="htmlLabel" :name="name" />
        <div class="input__parent">
            <input :type="type || 'text'" v-if="type !== 'textarea'" :id="name" v-bind="$attrs" v-model="value"
                :placeholder="hint" class="input__input" />
            <textarea v-else :id="name" v-bind="$attrs" v-model="value" :placeholder="hint"
                class="input__input"></textarea>
                <slot></slot>
        </div>
    </div>
</template>
<style scoped lang="scss">
.input {
    position: relative;
    margin-bottom: 3rem;

    &__parent {
        border: 2px solid #D6E4F0;
        border-radius: 10px;
        overflow: hidden;
        transition: ease-in 200ms;
        margin-top: 15px;
        display: flex;

        ::v-deep(img) {
            margin: 0 5px;
            cursor: pointer;
        }

        &:focus-within,
        &:hover {
            border-color: #1E56A0;
            filter: drop-shadow(0px 2px 8px rgba(30, 86, 160, 0.38));
        }
    }

    &__input {
        min-height: 54px;
        width: 100%;
        font-family: $fw-fa-base-regular;
        outline: 0;
        border: 0;
        background: none;
        padding: 0 10px;
        font-size: 16px;

        &::placeholder {
            font-size: 14px;
        }
    }
}
</style>