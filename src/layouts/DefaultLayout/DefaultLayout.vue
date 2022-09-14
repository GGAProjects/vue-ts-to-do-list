<template>
    <div class="bg-gradient-to-b from-[#2b5876] to-[#4e4376]">
        <router-view></router-view>
        <BottomBar />
    </div>
</template>

<script setup lang="ts">
import BottomBar from "@/components/General/BottomBar";
</script>

<style scoped></style>
