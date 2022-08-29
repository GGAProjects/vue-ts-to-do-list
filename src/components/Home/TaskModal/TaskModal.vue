<template>
    <div>
        <button @click="openModal()">Mostar modal</button>
        <Modal ref="modalRef" width="500px" @on-close="clearObject()">
            <template v-slot:header> header </template>
            <template v-slot:body>
                <form @submit.prevent="taskController" ref="form">
                    <div class="input-container">
                        <select
                            name="task_status_id"
                            id="task_status_id"
                            v-model="model.taskStatusId"
                        >
                            <label for="task_status_id">Estado</label>
                            <option
                                :value="item.id"
                                v-for="(item, index) in taskStore.taskStatuses"
                                :key="index"
                            >
                                {{ item.status }}
                            </option>
                        </select>
                    </div>
                    <div class="input-container">
                        <select
                            name="task_group_id"
                            id="task_group_id"
                            v-model="model.taskGroupId"
                        >
                            <label for="task_group_id">Grupo</label>
                            <option
                                :value="item.id"
                                v-for="(item, index) in taskStore.taskGroups"
                                :key="index"
                            >
                                {{ item.group }}
                            </option>
                        </select>
                    </div>
                    <div class="input-container">
                        <label for="task">Tarea</label>
                        <input
                            type="text"
                            name="task"
                            id="task"
                            placeholder="task"
                            v-model="model.task"
                        />
                    </div>
                    <div class="button-container">
                        <button>Registrar</button>
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
import { useTaskStore } from "@/stores/taskStore";
import useManageFormErrors from "@/composables/useManageFormErrors";

const modalRef = ref<InstanceType<typeof Modal>>();
const taskStore = useTaskStore();
const model = reactive<any>({
    taskStatusId: "",
    taskGroupId: "",
    task: "",
});
const form = ref<HTMLElement>();
const { showErrors } = useManageFormErrors(model, "input-container");

const clearObject = () => {
    model.taskStatusId = "";
    model.taskGroupId = "";
    model.task = "";
};

const openModal = () => {
    taskStore.getRequiredData().then(() => {
        console.log(taskStore.taskGroups);
    });
    modalRef.value?.showModal();
};

const closeModal = () => {
    clearObject();
    modalRef.value?.closeModal();
};

const taskController = async () => {
    const { error, errors } = await taskStore.register(model);
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
</script>

<style scoped></style>
