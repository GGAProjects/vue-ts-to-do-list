<template>
    <component :is="layout">
        <slot />
    </component>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
const defaultLayout = "Default";

const route = useRoute();
const layout = computed(() => {
    const parent = route.matched.find((item: any) => !item.parent);
    const meta = parent ? parent.meta : route.meta;
    const layout = meta.layout || defaultLayout;
    return defineAsyncComponent(
        () => import(`./layouts/${layout}Layout/${layout}Layout.vue`)
    );
});
</script>

<style scoped></style>
