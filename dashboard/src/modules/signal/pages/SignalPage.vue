<script setup lang="ts">

</script>

<template>
    <section>
        <div class="page-title">
            <div class="page-title__title">
                <span>لیست سیگنال</span>
            </div>
            <div class="page-title__action">
                <button class="base-button ml-4" @click="$router.push('signal/new')">
                    <img class="filter-button__icon" src="@/common/assets/images/add-square.svg" alt="..." />
                    <span>افزودن سیگنال</span>
                </button>
                <!-- <button class="filter-button">
                    <img class="filter-button__icon" src="@/common/assets/images/filter.svg" alt="..." />
                    <span>فیلتر</span>
                    <div class="filter-button__counter mr-3">2</div>
                </button> -->
            </div>
        </div>

        <!-- <TheArticleList v-model="page" :items="mappedData" :totalPage="totalPage" :loading="getArticleListLoading"
            @delete-clicked="detectDelete" @edit-clicked="detectEdit" /> -->
    </section>
</template>

<style scoped>
</style>