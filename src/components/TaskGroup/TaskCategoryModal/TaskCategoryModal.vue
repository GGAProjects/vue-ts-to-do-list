<template>
    <div>
        <button @click="openModal()">Mostar modal 2</button>
        <Modal ref="modalRef" width="500px" @on-close="clearObject()">
            <template v-slot:header> header </template>
            <template v-slot:body>
                <form @submit.prevent="taskCategoryController" ref="form">
                    <div class="input-container">
                        <label for="task">Categoría</label>
                        <input
                            type="text"
                            name="category"
                            id="category"
                            placeholder="category"
                            v-model="model.category"
                        />
                    </div>
                    <div class="button-container">
                        <button v-if="!model.id">Registrar</button>
                        <button v-else>Actualizar</button>
                    </div>
                </form>
            </template>
            <template v-slot:footer> footer </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import Modal from "@/components/General/Modal";
import { useTaskCategoryStore } from "@/stores/taskCategoryStore";
import useManageFormErrors from "@/composables/useManageFormErrors";

const modalRef = ref<InstanceType<typeof Modal>>();
const taskCategoryStore = useTaskCategoryStore();
const model = reactive<any>({
    category: "",
});
const form = ref<HTMLElement>();
const { showErrors } = useManageFormErrors(model, "input-container");

const clearObject = () => {
    model.category = "";
};

const openModal = () => {
    modalRef.value?.showModal();
};

const closeModal = () => {
    clearObject();
    modalRef.value?.closeModal();
};

const taskCategoryController = async () => {
    const { error, errors } = await taskCategoryStore.controller(model);
    if (error && errors) {
        return showErrors(form.value!, errors);
    }
    closeModal();
};

watch(
    () => taskCategoryStore.taskCategory,
    (currentModal) => {
        if (currentModal) {
            openModal();
            Object.keys(model).forEach((key) => {
                model[key] = currentModal[key];
            });
        } else {
            closeModal();
        }
    }
);
</script>

<style scoped></style>
