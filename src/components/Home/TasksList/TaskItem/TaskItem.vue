<template>
    <button
        @click="emit('viewTask', task)"
        class="task-item"
        :class="[
            task.status.status === TaskStatusesEnum.IN_PROGRESS
                ? 'in-progress'
                : '',
            task.status.status === TaskStatusesEnum.FINISHED ? 'finished' : '',
        ]"
    >
        <input
            type="checkbox"
            class="w-6 h-6 rounded"
            @click.stop="emit('updateTaskStatus', $event, task.id)"
            :checked="task.status.status === TaskStatusesEnum.FINISHED"
        />
        <span>
            {{ task.task }}
        </span>
    </button>
</template>

<script setup lang="ts">
import { TaskStatusesEnum } from "@/enums/TaskStatusesEnum";
interface Props {
    task: any;
}
const emit = defineEmits(["viewTask", "updateTaskStatus"]);
defineProps<Props>();
</script>

<style scoped src="./styles.scss"></style>
