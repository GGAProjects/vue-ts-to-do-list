<template>
    <div class="input-container">
        <div class="input-wrapper">
            <label
                :for="currentId"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                v-if="label"
            >
                {{ label }}
            </label>
            <select
                v-bind="$attrs"
                class="text-gray-900 text-sm block w-full p-2.5"
                :id="currentId"
                @input="inputEvent($event)"
            >
                <option
                    :value="item[optionIdIndex]"
                    v-for="(item, index) in selectOptions"
                    :key="index"
                    :hidden="item[optionIdIndex] === ''"
                >
                    {{ item[optionDisplayIndex] }}
                </option>
            </select>
            <div class="border-simulator from-[#004e92] to-[#000428]"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { uuid } from "@/utils/uuid";
import { ref, watch } from "vue";
interface Props {
    id?: string;
    label?: string;
    options: Array<any>;
    optionIdIndex?: string;
    optionDisplayIndex?: string;
}

const emit = defineEmits(["update:value"]);
const props = withDefaults(defineProps<Props>(), {
    optionIdIndex: "id",
    optionDisplayIndex: "name",
});

const selectOptions = ref<any[]>([]);

watch(
    () => props.options,
    () => {
        const defaultOption = {
            [props.optionIdIndex]: "",
            [props.optionDisplayIndex]: "Seleccionar una opción",
        };
        selectOptions.value = [...new Set([defaultOption, ...props.options])];
    }
);

const currentId = ref<string>(props.id || uuid());

const inputEvent = (event: any) => {
    emit("update:value", event.target.value);
};
</script>

<style scoped src="./styles.scss"></style>
