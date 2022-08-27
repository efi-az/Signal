<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
<script setup lang="ts">
interface Props {
    modelValue: boolean;
    size?: 'sm' | 'lg' | 'xl';
    title: string
}
const { size, title, modelValue } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const value = $computed({
  get(): any { return modelValue },
  set(value: boolean) { emit('update:modelValue', value) },
});

</script>
<template>
    <transition name="modal">
        <div class="modal-mask" v-if="value">
            <div class="modal-wrapper">
                <div class="modal-container" :class="{ ['size-' + size]: size }">

                    <div class="modal-header">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                            @click="value = false">
                            <path opacity="0.4"
                                d="M15.9998 29.3333C23.3636 29.3333 29.3332 23.3638 29.3332 16C29.3332 8.63616 23.3636 2.66663 15.9998 2.66663C8.63604 2.66663 2.6665 8.63616 2.6665 16C2.6665 23.3638 8.63604 29.3333 15.9998 29.3333Z"
                                fill="#E24036" />
                            <path
                                d="M17.4133 16L20.48 12.9333C20.8666 12.5466 20.8666 11.9066 20.48 11.52C20.0933 11.1333 19.4533 11.1333 19.0666 11.52L16 14.5866L12.9333 11.52C12.5466 11.1333 11.9066 11.1333 11.52 11.52C11.1333 11.9066 11.1333 12.5466 11.52 12.9333L14.5866 16L11.52 19.0666C11.1333 19.4533 11.1333 20.0933 11.52 20.48C11.72 20.68 11.9733 20.7733 12.2266 20.7733C12.48 20.7733 12.7333 20.68 12.9333 20.48L16 17.4133L19.0666 20.48C19.2666 20.68 19.52 20.7733 19.7733 20.7733C20.0266 20.7733 20.28 20.68 20.48 20.48C20.8666 20.0933 20.8666 19.4533 20.48 19.0666L17.4133 16Z"
                                fill="#E24036" />
                        </svg>
                        <span>
                            {{ title }}
                        </span>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<style scoped lang="scss">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: table;
    background: rgba(47, 47, 47, 0.3);
    backdrop-filter: blur(4px);
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    transition: all 0.3s ease;
    border-radius: 25px;

    &.size-sm {
        width: 300px;
    }

    &.size-lg {
        width: 800px;
    }

    &.size-xl {
        width: 1140px;
    }
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 20px;
    color: #2F2F2F;
    font-family: $fw-fa-base-bold;
    padding-bottom: 18px;
    border-bottom: 2px solid #D6E4F0;

    ::v-deep(span) {
        margin: 0 10px;
    }

    ::v-deep(svg) {
        cursor: pointer;
    }
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>