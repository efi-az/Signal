<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import BaseLabel from "./BaseLabel.vue";
interface Props {
  modelValue: boolean;
  htmlLabel?: string;
}

const { modelValue, htmlLabel } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const value = $computed({
  get(): any { return modelValue },
  set(value: boolean) { emit('update:modelValue', value) },
});

let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
let result = ""
let chaactersLength = characters.length;

for (let i = 0; i < 5; i++) {
  result += characters.charAt(Math.floor(Math.random() * chaactersLength));
}
</script>

<template>
  <div class="checkbox">
    <input type="checkbox" :id="result" class="checkbox__input" v-model="value">
    <BaseLabel :html-label="htmlLabel" :name="result" />
  </div>
</template>

<style scoped lang="scss">
.checkbox {
  display: block;
  margin-bottom: 15px;

  &__input {
    padding: 0;
    height: initial;
    width: initial;
    margin-bottom: 0;
    display: none;
    cursor: pointer;
  }

  label {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: flex-end;

    &:before {
      content: '';
      -webkit-appearance: none;
      background-color: transparent;
      border: 1px solid #00BA88;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
      padding: 8px;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      cursor: pointer;
      margin-right: 5px;
    }
  }

  input:checked+label:after {
    content: '';
    display: block;
    position: absolute;
    top: 8px;
    right: 72px;
    width: 6px;
    height: 12px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  input:checked+label:before {
    background-color: #00BA88;
  }
}
</style>
