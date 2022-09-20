<template>
    <div>
        <DateCarousel
            @selectedDate="selectedDate"
            :tasksQuantity="taskStore.tasks.length"
        />
        <div class="container mx-auto">
            <div class="grid grid-cols-4 gap-5 mt-4">
                <TaskItem
                    v-for="(item, index) in taskStore.tasks"
                    :task="item"
                    :key="index"
                    @viewTask="viewTask"
                    @updateTaskStatus="updateTaskStatus"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore";
import DateCarousel from "@/components/Home/TasksList/DateCarousel";
import { TaskStatusesEnum } from "@/enums/TaskStatusesEnum";
import TaskItem from "./TaskItem";

const taskStore = useTaskStore();

const getList = async (filters = {}) => {
    const { error } = await taskStore.getList(filters);
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

const selectedDate = (currentDate: Date) => {
    const timeRegex = /(?<=T).*(?=Z)/gm;
    const isoDateTime = new Date(
        currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
    ).toISOString();

    getList({
        expectedDate: {
            gte: isoDateTime.replace(timeRegex, "00:00:00.000"),
            lte: isoDateTime.replace(timeRegex, "23:59:59.000"),
        },
    });
};

const viewTask = (task: any) => {
    edit(task);
};

const updateTaskStatus = async (event: any, id: string) => {
    await taskStore.updateStatus(
        id,
        event.target.checked
            ? TaskStatusesEnum.FINISHED
            : TaskStatusesEnum.PENDING
    );
};
</script>

<style scoped lang="scss" src="./styles.scss"></style>
