<template>
    <span class="block text-sm">{{ message }}</span>
</template>

<script setup lang="ts">
interface Props {
    message?: string;
}
withDefaults(defineProps<Props>(), {
    message: "",
});
</script>

<style scoped>
span {
    color: #ff6961;
}
</style>
