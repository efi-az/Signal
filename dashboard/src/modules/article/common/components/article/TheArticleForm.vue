<script setup lang="ts">
import BaseFormGenerator from '@/common/components/BaseFormGenerator.vue';
import { articleForm } from '../../schemas/article/article-form.schema'
import BaseSelect from '@/common/components/form/BaseSelect.vue'

interface Props {
    modelValue: any;
    categoryList: any[]
    tagList: any[]
}

const { modelValue, categoryList, tagList } = defineProps<Props>();
const emit = defineEmits<{
    (e: 'update:modelValue', data: any): void;
}>();

const formData = $computed({
    get(): any {
        return modelValue;
    },
    set(value: any) {
        emit('update:modelValue', value);
    },
});

const categoryOptions = $computed(() => {
    return categoryList.map((item) => ({
        value: item.id,
        label: item.name,
    }));
});

const tagOptions = $computed(() => {
    return tagList.map((item) => ({
        value: item.id,
        label: item.name,
    }));
});

</script>
<template>
    <div class="mt-4">
        <BaseFormGenerator v-model="formData" :schema="articleForm">
            <template #field-category="{ field, readOnlyForm }">
                <div class="col-12 col-md-3">
                    <BaseSelect v-model="formData.categoriesId" :options="categoryOptions" html-label="دسته بندی"
                        :class="field.cssClass" :readonly="readOnlyForm" v-bind="field.options" />
                </div>
            </template>
            <template #field-tags="{ field, readOnlyForm }">
                <div class="col-12 col-md-3">
                    <BaseSelect v-model="formData.tagsId" :options="tagOptions" html-label="تگ ها"
                        :class="field.cssClass" :readonly="readOnlyForm" v-bind="field.options" />
                    <!-- <div class="options">
                        <template v-for="tag in tagList">
                            <div class="options__item" v-if="tag.active">
                                {{ tag.name }}
                                <img class="options__item--close" src="../../assets/close-square.svg"
                                    @click="tag.active = false" alt="...">
                            </div>
                        </template>
                        <div class="options__item" @click="showModal = true">مشاهده همه...</div>
                    </div>
                    <transition name="modal">
                        <modal v-if="showModal" size="sm" title="انتخاب تگ" @close="showModal = false">
                            <template #body>
                                <div class="input__search">
                                    <img src="@/common/assets/images/search-input.svg" alt="...">
                                    <input type="text" placeholder="جستجو">
                                </div>
                                <div class="list-item">
                                    <div class="list-item__selected" v-for="tag in tagList"
                                        :class="{ 'active': tag.active }" @click="tag.active = !tag.active">{{ tag.name
                                        }}
                                    </div>
                                </div>
                            </template>
                        </modal>
                    </transition> -->
                </div>
            </template>
        </BaseFormGenerator>
    </div>
</template>
<style scoped lang="scss">
// .options {
//     display: flex;
//     flex-wrap: wrap;

//     &__item {
//         background: #D6E4F0;
//         border-radius: 5px;
//         padding: 7px 23px;
//         transition: all 200ms;
//         border: 1px solid transparent;
//         min-width: 100px;
//         margin: 5px 8px;
//         text-align: center;
//         position: relative;

//         &--close {
//             position: absolute;
//             right: -10px;
//             cursor: pointer;
//         }

//         &:last-child {
//             cursor: pointer;

//             &:hover {
//                 border-color: var(--base-color);
//             }
//         }
//     }
// }

// .input__search {
//     display: flex;
//     background: #F6F6F6;
//     border-radius: 12.5px;
//     padding: 2px 16px;
//     color: #979797;

//     input {
//         background: none;
//         font-size: 16px;
//         border: none;
//         outline: none;
//         height: 48px;
//         font-family: $fw-fa-base-regular;
//         margin: 0 7px;
//     }
// }

// .list-item {
//     display: flex;
//     flex-wrap: wrap;

//     &__selected {
//         font-size: 16px;
//         color: #2F2F2F;
//         padding: 10px 12px;
//         margin: 5px;
//         border-radius: 12.5px;
//         cursor: pointer;
//         display: flex;
//         align-items: center;
//         transition: all 200ms;

//         &.active {
//             background-color: #D6E4F0;

//             &::before {
//                 content: url('@/common/assets/images/tick-circle.svg');
//                 margin-left: 7px;
//                 height: 25px;
//             }

//         }
//     }
// }
</style>