<template>
    <div>
        <h3>Listado</h3>
        <div>
            <ul>
                <li v-for="(item, index) in taskStore.tasks" :key="index">
                    {{ item.task }}
                    <button type="button" @click="edit(item)">editar</button>
                    <button type="button" @click="destroy(item)">borrar</button>
                </li>
            </ul>
        </div>
        <DateCarousel />
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore";
import DateCarousel from "@/components/Home/TasksList/DateCarousel";

const taskStore = useTaskStore();

const getList = async () => {
    const { error } = await taskStore.getList();
    if (error) {
        return;
    }
};

const edit = async (item: any) => {
    const { error } = await taskStore.get(item.id);
    if (error) {
        return;
    }
};

const destroy = async (item: any) => {
    const { error } = await taskStore.destroy(item.id);
    if (error) {
        return;
    }
};

// getList();
</script>

<style scoped></style>
