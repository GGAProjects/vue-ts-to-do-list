<template>
    <div>
        <button @click="openModal()">Mostar modal</button>
        <Modal ref="modalRef">
            <template v-slot:header> header </template>
            <template v-slot:body>
                <select name="" id="">
                    <option
                        :value="item.id"
                        v-for="(item, index) in taskStore.taskStatuses"
                        :key="index"
                    >
                        {{ item.status }}
                    </option>
                </select>
            </template>
            <template v-slot:footer> footer </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Modal from "@/components/General/Modal";
import { useTaskStore } from "@/stores/taskStore";

const modalRef = ref<InstanceType<typeof Modal>>();
const taskStore = useTaskStore();

const openModal = () => {
    modalRef.value?.showModal();
};

onMounted(() => {
    taskStore.getRequiredData().then(() => {
        console.log(taskStore.taskGroups);
    });
});
</script>

<style scoped></style>
