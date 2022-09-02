<template>
    <component
        :is="tagAs"
        :href="href"
        :type="type"
        :disabled="disabled"
        :class="buttonClasses"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
    tagAs?: string;
    type?: string;
    href?: string;
    disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    tagAs: "button",
    disabled: false,
});

const buttonClasses = computed(() => {
    if (props.tagAs === "a") {
        return "custom-button-container";
    }

    return "bg-gradient-to-b hover:bg-gradient-to-l from-[#2b5876] to-[#4e4376] rounded rounded-tl-[50px] rounded-br-[50px] py-2 px-6 text-white w-full mt-4";
});
</script>
