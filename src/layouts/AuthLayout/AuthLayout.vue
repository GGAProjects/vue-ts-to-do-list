<template>
    <div class="min-h-screen grid grid-cols-2 gap-0">
        <div class="flex items-center justify-center">
            <img
                src="/images/auth.jpg"
                alt=""
                class="h-screen w-screen object-cover object-center"
            />
        </div>
        <div
            class="bg-gradient-to-b from-[#2b5876] to-[#4e4376] flex items-center justify-center flex-col"
        >
            <div
                class="form-wrapper bg-white w-96 rounded-xl p-8 shadow-[10px_10px_26px_0px_rgba(0,0,0,0.75)]"
            >
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
