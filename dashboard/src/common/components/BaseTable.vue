<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { nextTick, watch } from 'vue';
import BasePagination from './BasePagination.vue';
interface Props {
  modelValue: number;
  max: number;
  maxPages?: number;
  columns: any[];
  maxRows?: number;
  loading?: boolean;
  rows: any[];
}
const {
  modelValue,
  columns,
  max,
  maxPages = 3,
  maxRows = 5,
  loading,
  rows = [],
} = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', currentPage: number): void;
}>();

const currentPage = $computed({
  get() {
    return modelValue;
  },
  set(value: number) {
    emit('update:modelValue', value);
  },
});

const actionBlockRef = $ref(null);

const headers = [
  ...columns,
  {
    name: 'actions',
    sortable: true,
    label: 'عملیات'
  },
];

let minHeight = $ref('0px');
const tableContainerEl = $ref<HTMLElement>();
watch($$(loading), async () => {
  await nextTick();
  minHeight = `${tableContainerEl.clientHeight}px`;
});

</script>
<template>
  <div class="table">
    <div ref="tableContainerEl" class="table__container">
      <table class="table__table-element">
        <thead class="table__table-element--thead">
          <tr>
            <template v-for="header in headers">
              <th :style="`${header.headerStyle};text-align:${header.align}`">{{ header.label }}</th>
            </template>
          </tr>
        </thead>
        <tbody class="table__table-element--tbody">
          <tr v-for="row in rows">
            <template v-for="item in headers">
              <td>
                <slot v-if="item.field" :name="item.field" :value="row.originalObj[item.field]">
                  {{ row[item.field] }}
                </slot>
                <slot v-else :name="item.name" :value="row.originalObj" />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table__pagination">
      <BasePagination v-model="currentPage" :max="max" :max-pages="maxPages" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.table {
  margin: 0 -0.2rem;
  margin-top: 70px;

  &__table-element {
    border-collapse: collapse;
    width: 100%;

    td:first-child,
    th:first-child {
      border-radius: 0 10px 10px 0;
    }

    td:last-child,
    th:last-child {
      border-radius: 10px 0 0 10px;
    }

    tr:nth-child(even) {
      background-color: #F6F6F6;
    }

    td {
      color: #2F2F2F;

      ::v-deep(img) {
        width: 100%;
        border-radius: 8px;
      }

      ::v-deep(.action-item) {
        display: flex;

        .table-icon {
          cursor: pointer;
          opacity: 0.8;
          transition: all 300ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }

    th {
      background: #D6E4F0;
      color: #163172;
    }

    th,
    td {
      padding: 10px;
      font-size: 16px;
    }

  }

  &__pagination {
    display: flex;
    justify-content: center;
  }

  &__container {
    min-height: 41rem;
  }
}
</style>