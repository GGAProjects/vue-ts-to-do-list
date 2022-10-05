<template>
    <Modal ref="modalRef" width="500px" @on-close="clearObject()">
        <template v-slot:header>
            <span v-if="!model.id">Crear tarea</span>
            <span v-else>Editar tarea</span>
        </template>
        <template v-slot:body>
            <form @submit.prevent="taskController" ref="form">
                <div class="grid gap-5" ref="form">
                    <div class="grid grid-cols-2 gap-5">
                        <CustomSelect
                            name="task_status_id"
                            v-model:value="model.taskStatusId"
                            label="Estado"
                            :options="taskStore.taskStatuses"
                            option-display-index="status"
                        />
                        <CustomSelect
                            name="task_category_id"
                            v-model:value="model.taskCategoryId"
                            label="Categoría"
                            :options="taskStore.taskCategories"
                            option-display-index="category"
                        />
                    </div>
                    <div class="grid grid-cols-2 gap-5">
                        <CustomInput
                            type="text"
                            name="task"
                            placeholder="Escriba su tarea..."
                            v-model:value="model.task"
                            autocomplete="off"
                            label="Tarea"
                        />
                        <CustomInput
                            type="date"
                            name="expectedDate"
                            placeholder="Fecha"
                            v-model:value="model.expectedDate"
                            label="Fecha"
                        />
                    </div>
                </div>
            </form>
        </template>
        <template v-slot:footer>
            <div class="button-container">
                <CustomButton v-if="!model.id" @click="taskController">
                    Registrar
                </CustomButton>
                <CustomButton v-else @click="taskController"
                    >Actualizar</CustomButton
                >
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import Modal from "@/components/General/Modal";
import { useTaskStore } from "@/stores/taskStore";
import useManageFormErrors from "@/composables/useManageFormErrors";
import CustomInput from "@/components/General/CustomInput";
import CustomSelect from "@/components/General/CustomSelect";
import CustomButton from "@/components/General/CustomButton";
import { TaskStatusesEnum } from "@/enums/TaskStatusesEnum";

const modalRef = ref<InstanceType<typeof Modal>>();
const taskStore = useTaskStore();
const model = reactive<any>({
    id: "",
    taskStatusId: "",
    taskCategoryId: "",
    task: "",
    expectedDate: "",
});
const form = ref<HTMLElement>();
const { showErrors } = useManageFormErrors(model, "input-container");

const clearObject = () => {
    model.id = "";
    model.taskStatusId = "";
    model.taskCategoryId = "";
    model.task = "";
    model.expectedDate = "";
};

const openModal = () => {
    taskStore.getRequiredData();
    modalRef.value?.showModal();
};

const closeModal = () => {
    clearObject();
    modalRef.value?.closeModal();
};

const taskController = async () => {
    const { error, errors } = await taskStore.controller(model);
    if (error && errors) {
        return showErrors(form.value!, errors);
    }
    closeModal();
};

watch(
    () => taskStore.task,
    (currentTask) => {
        if (currentTask) {
            openModal();
            Object.keys(model).forEach((key) => {
                model[key] = currentTask[key];
            });
        } else {
            closeModal();
        }
    }
);

watch(
    () => modalRef.value?.showFlag,
    (isVisible) => {
        if (isVisible && !model.id) {
            const searchPendingItem = taskStore.taskStatuses.find(
                (item: any) => item.status === TaskStatusesEnum.PENDING
            );

            if (searchPendingItem) {
                model.taskStatusId = searchPendingItem.id;
            }
        }
    }
);

defineExpose({
    openModal,
});
</script>

<style scoped></style>
