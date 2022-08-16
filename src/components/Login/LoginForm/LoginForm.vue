<template>
    <form @submit.prevent="login">
        <div class="input-container">
            <input type="text" placeholder="email" v-model="model.email" />
            <error-message :message="errorsModel.email" />
        </div>
        <div class="input-container">
            <input
                type="text"
                placeholder="password"
                v-model="model.password"
            />
            <error-message :message="errorsModel.password" />
        </div>
        <button type="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import ErrorMessage from "@/components/General/ErrorMessage";
import useAxios from "@/composables/useAxios";
import { AxiosError } from "axios";

const http = useAxios();

const model = reactive<any>({
    email: "",
    password: "",
});

const errorsModel = reactive<any>({
    email: "",
    password: "",
});

watch(
    () => model,
    () => {
        Object.keys(model).forEach((key: string) => {
            if (model[key]) errorsModel[key] = "";
        });
    },
    {
        deep: true,
    }
);

const login = async () => {
    try {
        const { data } = await http.post("/users/login", { ...model });
        console.log(data);
    } catch (error: Error | AxiosError) {
        if (error.response) {
            const errors = error.response.data.errors;
            errors.forEach((item: any) => {
                errorsModel[item.field] = item.messages.join(",");
            });
        }
    }
};
</script>

<style lang="scss" scoped></style>
