<template>
    <div>
        <DateCarousel
            @selectedDate="selectedDate"
            :tasksQuantity="taskStore.tasks.length"
        />
        <div class="container mx-auto">
            <div class="grid grid-cols-4 gap-5 mt-4">
                <button
                    v-for="(item, index) in taskStore.tasks"
                    :key="index"
                    class="task-item"
                    @click="viewTask(item)"
                >
                    <input
                        type="checkbox"
                        class="w-6 h-6 rounded"
                        @click.stop="updateTaskStatus($event, item.id)"
                        :checked="
                            item.status.status === TaskStatusesEnum.FINISHED
                        "
                    />
                    <span>
                        {{ item.task }}
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore";
import DateCarousel from "@/components/Home/TasksList/DateCarousel";
import { TaskStatusesEnum } from "@/enums/TaskStatusesEnum";

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

<style scoped lang="scss">
.task-item {
    align-items: center;
    display: flex;
    background-color: white;
    border-radius: 10px;
    gap: 1rem;
    padding: 1rem;
}
</style>
