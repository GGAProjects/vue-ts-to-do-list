<template>
    <div>
        <h3>Listado</h3>
        <div>
            <ul>
                <li
                    v-for="(item, index) in taskGroupStore.taskGroups"
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
import { useTaskGroupStore } from "@/stores/taskGroupStore";

const taskGroupStore = useTaskGroupStore();

const getList = async () => {
    const { error } = await taskGroupStore.getList();
    if (error) {
        return;
    }
};

const edit = async (item: any) => {
    const { error } = await taskGroupStore.get(item.id);
    if (error) {
        return;
    }
};

const destroy = async (item: any) => {
    const { error } = await taskGroupStore.destroy(item.id);
    if (error) {
        return;
    }
};

getList();
</script>

<style scoped></style>
