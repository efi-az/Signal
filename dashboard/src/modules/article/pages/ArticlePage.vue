<script setup lang="ts">
import type { ArticleViewModel } from '@/api/model/articleViewModel.js';
import { useGetArticleList, useDeleteArticle } from '../common/composable/article.composable.js';
import TheArticleList from '../common/components/article/TheArticleList.vue';
import { onMounted, reactive } from 'vue';
import type { PaginationMetaOptionModel } from '@/api/model/paginationMetaOptionModel';
import { useRouter } from 'vue-router';
import BaseButton from '../../../common/components/BaseButton.vue';
import BaseModal from '../../../common/components/BaseModal.vue';
import BaseInput from '../../../common/components/form/BaseInput.vue';
import { useGetArticleCategoryAll, useDeleteArticleCategory, useCreateArticleCategory } from '../common/composable/article-category.composable';
import { useGetAllArticleTag, useCreateArticleTag, useDeleteArticleTag } from '../common/composable/article-tag.composable';

const {
  isLoading: getArticleListLoading,
  data: articleList,
  meta: articleMeta,
  fetch: getArticleList
} = useGetArticleList();
const page = $ref(1);
const perPage = 5;

const router = useRouter()

const mappedData = $computed(
  (): Array<any> =>
    articleList.value.map((item: ArticleViewModel) => {
      return {
        id: item.id,
        title: item.title,
        pinned: item.pinned ?? '-',
        status: item.status ?? '-',
        originalObj: item,
      };
    })
);

let filters = $ref({});
// const filter = (data: any) => {
//   filters = { ...data };
// };

const itemsPrePaginate = $computed((): Array<any> => {
  return mappedData.search(filters).addOrder();
});

// const items = $computed((): Array<any> => {
//   return itemsPrePaginate.paginate(page, perPage);
// });

const totalPage = $computed(() => {
  return Math.ceil(itemsPrePaginate.length / perPage);
});


let confirmDeleteModal = $ref(false);
let deleteID = $ref('');

const {
  fetch: deleteArticle,
  isLoading: deleteArticleLoading
} = useDeleteArticle();
const deleteArticleWrapper = async (id: string) => {
  try {
    await deleteArticle(id);
  } catch (err: any) {
    console.log(err);
  }

  try {
    await getArticleList();
  } catch (err: any) {
    console.log(err);
  }
};

async function deleteConfirmed() {
  try {
    await deleteArticleWrapper(deleteID);
  } catch (err: any) {
    console.log(err);
  }

  confirmDeleteModal = false;
}

function detectDelete(e: Event, id: string) {
  deleteID = id;
  confirmDeleteModal = true;

  deleteConfirmed()
}

function detectEdit(e: Event, id: string) {
  router.push('/article/' + id)
}

// ----

const { data: categoryList, fetch: getCategory, isLoading: loadingGetCategory } = useGetArticleCategoryAll()
const { fetch: deleteCategory } = useDeleteArticleCategory()
const { fetch: createCategory } = useCreateArticleCategory()

const { data: tagList, fetch: getTag } = useGetAllArticleTag()
const { fetch: deleteTag } = useDeleteArticleTag()
const { fetch: createTag } = useCreateArticleTag()

let categoryOrTagList = $ref([])

onMounted(async () => {
  await getCategory()
  categoryOrTagList = categoryList.value
});

async function deleteCategoryOrTagDetect(id: string) {
  try {
    if (position == "46%")
      await deleteCategory(id)
    else await deleteTag(id)
  } catch (e: any) {
    console.log(e);
  }

  try {
    if (position == "46%") {
      await getCategory()
      categoryOrTagList = categoryList.value
    }
    else {
      await getTag()
      categoryOrTagList = tagList.value
    }
  } catch (e: any) {
    console.log(e);
  }
}
async function createItemDetect() {
  try {
    const item = { name: newItem }
    if (position == "46%") {
      await createCategory(item)
    } else {
      await createTag(item)
    }
  } catch (e: any) {
    console.log(e);
  }

  try {
    if (position == "46%") {
      await getCategory()
      categoryOrTagList = categoryList.value
    }
    else {
      await getTag()
      categoryOrTagList = tagList.value
    }
  } catch (e: any) {
    console.log(e);
  }
}

let showModelAction = $ref(false)
let position = $ref('46%')
let modalTitle = $ref('تگ ها')
let newItem = $ref('')
function selected(value: string) {
  position = value
  if (value == '0') {
    modalTitle = 'تگ ها'
    categoryOrTagList = tagList.value
  }
  else {
    modalTitle = 'دسته بندی'
    categoryOrTagList = categoryList.value
  }
}

</script>

<template>
  <section>
    <div class="page-title">
      <div class="page-title__title">
        <span>لیست مقالات</span>
      </div>
      <div class="page-title__action">
        <button class="base-button ml-4" @click="$router.push('article/new')">
          <img class="filter-button__icon" src="@/common/assets/images/add-square.svg" alt="..." />
          <span>افزودن مقاله</span>
        </button>
        <button class="filter-button">
          <img class="filter-button__icon" src="@/common/assets/images/filter.svg" alt="..." />
          <span>فیلتر</span>
          <div class="filter-button__counter mr-3">2</div>
        </button>
      </div>
    </div>

    <TheArticleList v-model="page" :items="mappedData" :totalPage="totalPage" :loading="getArticleListLoading"
      @delete-clicked="detectDelete" @edit-clicked="detectEdit" />

    <BaseButton title="تنظیمات تگ ها و دسته بندی ها" class="btn v-btn-modern-base" @click="showModelAction = true" />

    <BaseModal title="افزودن دسته بندی و تگ" v-model="showModelAction">
      <template #body class="action-modal">
        <div class="action-modal__tab-bar">
          <div class="action-modal__tab-bar__item" @click="selected('46%')">دسته بندی</div>
          <div class="action-modal__tab-bar__item" @click="selected('0')">تگ ها</div>
        </div>
        <BaseInput :html-label="modalTitle" v-model="newItem">
          <img src="@/common/assets/images/add-square-color.svg" @click="createItemDetect" alt="...">
        </BaseInput>
        <div class="action-modal__list-items">
          <div class="action-modal__list-items--item" v-for="item in categoryOrTagList">
            <span>{{ item.name }}</span>
            <img src="@/common/assets/images/trash.svg" @click="deleteCategoryOrTagDetect(item.id)" alt="...">
          </div>
        </div>
      </template>
    </BaseModal>
  </section>
</template>

<style lang="scss" scoped>
.action-modal {

  &__tab-bar {
    background: #F6F6F6;
    border-radius: 12.5px;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    color: var(--base-color);
    position: relative;
    margin-bottom: 1.5rem;

    &::before {
      content: '';
      background: #D6E4F0;
      position: absolute;
      left: v-bind(position);
      top: 0;
      width: 50%;
      height: 81%;
      margin: 7px 9px;
      z-index: 1;
      border-radius: 12.5px;
      transition: all 200ms;
    }
  }

  &__tab-bar__item {
    border-radius: 12.5px;
    padding: 10px 0;
    width: 50%;
    display: flex;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
  }

  &__list-items {
    display: flex;
    flex-wrap: wrap;

    &--item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #D6E4F0;
      border-radius: 5px;
      padding: 7px 12px 7px 7px;
      margin: 5px;
    }

    img {
      cursor: pointer;
      margin-right: 10px;
    }
  }
}
</style>