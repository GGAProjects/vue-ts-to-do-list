<template>
    <div class="title text-3xl text-center font-bold mb-6">Ingreso</div>
    <LoginForm />

    <routerLink
        :to="{ name: 'register' }"
        class="text-sm block text-center underline mt-4"
        >Si aún no tienes una cuenta, regístrate aquí.</routerLink
    >
</template>

<script setup lang="ts">
import LoginForm from "@/components/Auth/LoginForm";
</script>
