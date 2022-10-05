<template>
    <div>
        <h3>Listado</h3>
        <div>
            <ul>
                <li
                    v-for="(item, index) in taskCategoryStore.taskCategories"
                    :key="index"
                >
                    {{ item.group }}
                    <button type="button" @click="edit(item)">editar</button>
                    <button type="button" @click="destroy(item)">borrar</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskCategoryStore } from "@/stores/taskCategoryStore";

const taskCategoryStore = useTaskCategoryStore();

const getList = async () => {
    const { error } = await taskCategoryStore.getList();
    if (error) {
        return;
    }
};

const edit = async (item: any) => {
    const { error } = await taskCategoryStore.get(item.id);
    if (error) {
        return;
    }
};

const destroy = async (item: any) => {
    const { error } = await taskCategoryStore.destroy(item.id);
    if (error) {
        return;
    }
};

getList();
</script>

<style scoped></style>
