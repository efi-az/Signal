<script setup lang="ts">
import type { MarketViewModel } from "@/api/model/marketViewModel";
import { useRouter } from "vue-router";
import TheMarketList from "../common/components/market/TheMarketList.vue";
import { useGetMarketList } from "../common/composable/market.composable";

const {
  isLoading: getMarketListLoading,
  data: marketList,
  meta: marketMeta,
  fetch: getMarketList
} = useGetMarketList();
const page = $ref(1);
const perPage = 5;

const router = useRouter()

const mappedData = $computed(
  (): Array<any> =>
    marketList.value.map((item: MarketViewModel) => {
      return {
        id: item.id,
        title: item.crypto,
        base: item.base ?? '-',
        image: item.image ?? '-',
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


const totalPage = $computed(() => {
  return Math.ceil(itemsPrePaginate.length / perPage);
});


let confirmDeleteModal = $ref(false);
let deleteID = $ref('');

// const {
//   fetch: deleteArticle,
//   isLoading: deleteArticleLoading
// } = useDeleteArticle();
const deleteArticleWrapper = async (id: string) => {
  try {
    // await deleteArticle(id);
  } catch (err: any) {
    console.log(err);
  }

  try {
    // await getArticleList();
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
  router.push('')
}

</script>

<template>
    <section>
        <div class="page-title">
            <div class="page-title__title">
                <span>لیست مارکت</span>
            </div>
            <div class="page-title__action">
                <button class="base-button ml-4" @click="$router.push('market/new')">
                    <img class="filter-button__icon" src="@/common/assets/images/add-square.svg" alt="..." />
                    <span>افزودن مارکت</span>
                </button>
                <!-- <button class="filter-button">
          <img class="filter-button__icon" src="@/common/assets/images/filter.svg" alt="..." />
          <span>فیلتر</span>
          <div class="filter-button__counter mr-3">2</div>
        </button> -->
            </div>
        </div>

        <TheMarketList v-model="page" :items="mappedData" :totalPage="totalPage" :loading="getMarketListLoading"
            @delete-clicked="detectDelete" @edit-clicked="detectEdit" />
    </section>
</template>

<style scoped>
</style>