<template>
    <div class="title text-3xl text-center font-bold mb-6">Registro</div>
    <RegisterForm />
    <routerLink
        :to="{ name: 'login' }"
        class="text-sm block text-center underline mt-4"
        >Si ya tienes una cuenta, ingresa aquí.</routerLink
    >
</template>

<script setup lang="ts">
import RegisterForm from "@/components/Auth/RegisterForm";
</script>
