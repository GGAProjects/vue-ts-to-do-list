<template>
    <div></div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore";

const taskStore = useTaskStore();

const getList = async () => {
    const { error, data } = await taskStore.getList();
    if (error) {
        return;
    }

    console.log(data);
};

getList();
</script>

<style scoped></style>
