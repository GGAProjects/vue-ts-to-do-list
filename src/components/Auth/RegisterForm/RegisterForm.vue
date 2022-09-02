<template>
    <form @submit.prevent="login" ref="form" class="grid gap-y-6">
        <CustomInput
            type="text"
            name="email"
            placeholder="Escriba su nombre completo..."
            v-model:value="model.email"
            autocomplete="off"
            label="Nombre completo"
        />
        <CustomInput
            type="text"
            name="name"
            placeholder="Escriba su correo..."
            v-model:value="model.name"
            autocomplete="off"
            label="Correo"
        />
        <CustomInput
            type="password"
            name="password"
            placeholder="Escriba su clave..."
            v-model:value="model.password"
            autocomplete="off"
            label="Clave"
        />
        <CustomButton type="submit">Registrarse</CustomButton>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import useManageFormErrors from "@/composables/useManageFormErrors";
import CustomInput from "@/components/General/CustomInput";
import CustomButton from "@/components/General/CustomButton";

const router = useRouter();

const model = ref<any>({
    email: "",
    name: "",
    password: "",
});

const form = ref<HTMLElement>();
const { showErrors } = useManageFormErrors(model.value, "input-container");

const authStore = useAuthStore();

const login = async () => {
    const { error, errors } = await authStore.register(model.value);
    if (error && errors) {
        return showErrors(form.value!, errors);
    }

    return router.push({ name: "home" });
};
</script>
