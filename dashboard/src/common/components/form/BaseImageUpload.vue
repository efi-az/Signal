<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useCreateArticleImage, useDeleteArticleImage, useGetArticleImage } from "@/modules/article/common/composable/article-image.composable";
import { onMounted } from "vue";
import BaseLabel from "./BaseLabel.vue";
interface Props {
    modelValue?: string;
    htmlLabel?: string;
    name?: string;
    url: string
}

const { htmlLabel, modelValue, name, url } = defineProps<Props>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

let value = $computed({
    get(): any {
        return modelValue;
    },
    set(value: any) {
        emit('update:modelValue', value);
    },
});

const { fetch: getImage } = useGetArticleImage(url)
onMounted(async () => {
    await getImageById()
})

async function getImageById() {
    try {
        if (value) {
            previewImage = await getImage(value).then(item => 'http://localhost:4000/article/image/files/' + item.fileName)
        }
    } catch (e) { }
}

const fileInput = $ref<HTMLElement>();
const selectImage = () => {
    fileInput.click()
}

const { fetch: createImage } = useCreateArticleImage(url)
let previewImage = $ref('')
async function pickFile(e: any) {
    let file = fileInput.files
    if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
            previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
    }

    let data = new FormData();
    data.append('file', file[0])

    value = await createImage(data).then(item => item.id)
}

const { fetch: deleteImage } = useDeleteArticleImage(url)
async function deletedImage() {
    await deleteImage(value)
    previewImage = ''
}

</script>

<template>
    <div class="image-upload">
        <BaseLabel :html-label="htmlLabel" :name="name" />
        <div class="image-upload__preview">
            <img src="@/common/assets/images/close-image.svg" v-if="previewImage" @click="deletedImage"
                class="image-upload__close" alt="...">
            <img :src="previewImage" v-if="previewImage" class="image-upload__img" alt="...">
            <div class="image-upload__parent" @click="selectImage" v-if="!previewImage">
                <input ref="fileInput" class="image-upload__parent--input" type="file" @input="pickFile"
                    accept="image/*" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.image-upload {
    width: 100%;

    &__preview {
        width: 100%;
        margin-top: 15px;
        border: 2px solid #D6E4F0;
        border-style: dashed;
        min-height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 10px;
        border-radius: 10px;
        overflow: hidden;
        transition: ease-in 200ms;
        position: relative;
    }

    &__img {
        height: 100%;
        width: 100%;
        border-radius: 5px;
    }

    &__close {
        position: absolute;
        cursor: pointer;
        top: 7px;
        left: 7px;
        width: 15px;
    }

    &__parent {
        height: 120px;
        width: 100%;
        margin-top: 15px;
        cursor: pointer;
        background-image: url('@/common/assets/images/gallery-add.png');
        background-size: 10rem;
        background-repeat: no-repeat;
        background-position: center center;

        &--input {
            display: none;
        }
    }
}
</style>