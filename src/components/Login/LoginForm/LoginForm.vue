<template>
    <form @submit.prevent="login" ref="form">
        <div class="input-container">
            <input
                type="text"
                name="email"
                placeholder="email"
                v-model="model.email"
            />
        </div>
        <div class="input-container">
            <input
                type="text"
                name="password"
                placeholder="password"
                v-model="model.password"
            />
        </div>
        <button type="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import useManageFormErrors from "@/composables/useManageFormErrors";

const router = useRouter();

const model = reactive<any>({
    email: "",
    password: "",
});

const form = ref<HTMLElement>();
const { showErrors } = useManageFormErrors(model, "input-container");

const authStore = useAuthStore();

const login = async () => {
    const { error, errors } = await authStore.login(model);
    if (error && errors) {
        return showErrors(form.value!, errors);
    }

    return router.push({ name: "home" });
};
</script>

<style lang="scss" scoped></style>
