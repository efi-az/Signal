<script setup lang="ts">
import type { CreateArticleDTO } from '@/api/dto/createArticleDTO';
import type { UpdateArticleDTO } from '@/api/dto/updateArticleDTO';
import { ArticleStatusEnum } from '@/api/enum/articleStatusEnum';
import { useCreateArticle, useGetByIdArticle, useUpdateArticle } from '../common/composable/article.composable';
import TheArticleForm from '../common/components/article/TheArticleForm.vue';
import { useRoute, useRouter } from 'vue-router';
import BaseButton from '@/common/components/BaseButton.vue';
import { onMounted, reactive } from 'vue';
import { useGetArticleCategoryAll } from '../common/composable/article-category.composable';
import { useGetAllArticleTag } from '../common/composable/article-tag.composable';

const route = useRoute()
const router = useRouter()
let editMode = $ref(route.params.slug !== undefined)

const { data: categoryList, fetch: getCategoryList, isLoading: getCategoryListLoading } = useGetArticleCategoryAll()
const { data: tagList, fetch: getTagList } = useGetAllArticleTag()
const { fetch: getArticleById, data: articleById } = useGetByIdArticle()

const defaultData: any = {
    title: '',
    categoriesId: [],
    tagsId: [],
    slug: '',
    description: '',
    imageId: '',
    metaDescription: '',
    metaKey: '',
    pin_status: false,
    readingTime: 0,
    status: ArticleStatusEnum.ACTIVE,
    summary: '',
}

const formData = reactive<{ data: CreateArticleDTO | UpdateArticleDTO }>({
    data: { ...defaultData }
});

onMounted(async () => {
    if (editMode) {
        await getArticleById(route.params.slug as string)

        formData.data = {
            description: articleById.value.description,
            metaDescription: articleById.value.metaDescription,
            metaKey: articleById.value.metaKey,
            pin_status: articleById.value.pin_status,
            readingTime: articleById.value.readingTime,
            slug: articleById.value.slug,
            status: articleById.value.status,
            summary: articleById.value.summary,
            title: articleById.value.title,
            categoriesId: articleById.value.obj_categories?.map(item => item.id),
            imageId: articleById.value.obj_article_image.id,
            tagsId: articleById.value.obj_article_tags?.map(item => item.id)
        }
    }
})

const { fetch: createArticle, isLoading: createArticleLoading } =
    useCreateArticle();
const { fetch: updateArticle, isLoading: updateArticleLoading } =
    useUpdateArticle();

const handleSubmit = async () => {
    let finalData = { ...formData.data } as any;

    for (let key in finalData) {
        if (finalData[key] === '') finalData[key] = undefined;
    }

    if (editMode) {
        try {
            await updateArticle(finalData, route.params.slug as string);
            router.push('/article')
        } catch (err: any) {
            console.log(err);
        }
    } else {
        try {
            await createArticle(finalData);
        } catch (err: any) {
            console.log(err);
        }
    }
};

</script>
<template>
    <div>
        <span class="v-color-base v-fs-2 v-fw-bold">{{ editMode ? 'ویرایش مقاله' : 'ساخت مقاله' }}</span>
        <TheArticleForm v-model="formData.data" :category-list="categoryList" :tag-list="tagList" />
        <BaseButton :title="editMode ? 'ویرایش مقاله' : 'پست کردن مقاله'" class="v-btn-success" @click="handleSubmit" />
    </div>
</template>