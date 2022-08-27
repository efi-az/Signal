<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
<script setup lang="ts">
import BaseLabel from "./BaseLabel.vue";
interface Props {
    modelValue?: any;
    htmlLabel?: string;
    options: any;
    reduceValue?: string;
    label?: string;
}
const { modelValue, htmlLabel, options, reduceValue, label } = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const value = $computed({
    get(): any {
        return modelValue;
    },
    set(value: any) {
        emit('update:modelValue', value);
    },
});

</script>
<template>
    <div class="select" :class="$attrs.class">
        <BaseLabel :html-label="htmlLabel" />
        <v-select :label="label || 'label'" v-bind="$attrs" :options="options"
            :reduce="obj => obj[reduceValue || 'value']" v-model="value">
            <template v-for="(index, name) in $slots" v-slot:[name]="data">
                <slot :name="name" :data="data" />
            </template>
        </v-select>
    </div>
</template>
<style scoped lang="scss">
.select {
    position: relative;
    margin-bottom: 3rem;

    ::v-deep(.v-select) {
        margin-top: 15px;
        direction: rtl;

        .vs__dropdown-toggle {
            border: 2px solid #D6E4F0;
            border-radius: 10px;
            min-height: 54px;
            transition: ease-in 200ms;
            padding: 0 5px;

            &:focus-within,
            &:hover {
                border-color: #1E56A0;
                filter: drop-shadow(0px 2px 8px rgba(30, 86, 160, 0.38));
            }

        }

        .vs__clear {
            margin: 0 5px;
        }

        .vs__dropdown-menu {
            border-right: 10px;
            text-align: right;
            background-color: #f3f6fd;
            border: 1px solid rgba(159, 159, 159, 0.55);
            border-top: none;
            margin-top: -3px;
            max-height: 200px;

            li {
                color: #000;
                padding: 5px 10px;
                font-size: 16px;
            }
        }

        .vs__selected {
            color: #000;
            font-size: 16px;
            margin: 7px 3px;

            .vs__deselect {
                margin: 0 2px;
            }
        }

    }

}
</style>