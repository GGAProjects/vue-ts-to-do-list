<template>
    <div>
        <button @click="openModal()">Mostar modal 2</button>
        <Modal ref="modalRef" width="500px" @on-close="clearObject()">
            <template v-slot:header> header </template>
            <template v-slot:body>
                <form @submit.prevent="taskGroupController" ref="form">
                    <div class="input-container">
                        <label for="task">Grupo</label>
                        <input
                            type="text"
                            name="group"
                            id="group"
                            placeholder="group"
                            v-model="model.group"
                        />
                    </div>
                    <div class="button-container">
                        <button v-if="!model.id">Registra 2r</button>
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
import { useTaskGroupStore } from "@/stores/taskGroupStore";
import useManageFormErrors from "@/composables/useManageFormErrors";

const modalRef = ref<InstanceType<typeof Modal>>();
const taskGroupStore = useTaskGroupStore();
const model = reactive<any>({
    group: "",
});
const form = ref<HTMLElement>();
const { showErrors } = useManageFormErrors(model, "input-container");

const clearObject = () => {
    model.group = "";
};

const openModal = () => {
    modalRef.value?.showModal();
};

const closeModal = () => {
    clearObject();
    modalRef.value?.closeModal();
};

const taskGroupController = async () => {
    const { error, errors } = await taskGroupStore.controller(model);
    console.log("AQUIII");
    if (error && errors) {
        return showErrors(form.value!, errors);
    }
    closeModal();
};

watch(
    () => taskGroupStore.taskGroup,
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
