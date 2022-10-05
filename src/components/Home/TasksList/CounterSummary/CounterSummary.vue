<template>
    <div class="cards-container grid grid-cols-3 gap-4 mx-auto">
        <div class="card-counter">
            <div class="title">
                <span>Pendientes</span>
            </div>
            <div class="subtitle">
                <span>{{ pending }}</span>
            </div>
        </div>
        <div class="card-counter">
            <div class="title">
                <span>En proceso</span>
            </div>
            <div class="subtitle">
                <span>{{ inProgress }}</span>
            </div>
        </div>
        <div class="card-counter">
            <div class="title">
                <span>Completadas</span>
            </div>
            <div class="subtitle">
                <span>{{ finished }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    pending: number;
    inProgress: number;
    finished: number;
}
withDefaults(defineProps<Props>(), {
    pending: 0,
    inProgress: 0,
    finished: 0,
});
</script>

<style scoped lang="scss" src="./styles.scss"></style>
