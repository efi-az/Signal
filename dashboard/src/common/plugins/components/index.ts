import vSelect from 'vue-select'
import Modal from '@/common/components/BaseModal.vue'
import "vue-select/dist/vue-select.css";
import type { App } from "vue";

export default function registerGlobalComponents(app: App): void {
    app.component('v-select', vSelect)
    app.component('modal', Modal)
}