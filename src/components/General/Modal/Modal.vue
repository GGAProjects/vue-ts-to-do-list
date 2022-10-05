<template>
    <transition name="modal-fade">
        <div
            class="modal-backdrop"
            v-show="showFlag"
            ref="modalWrapper"
            @click="closeModal"
            :style="modalStyles"
        >
            <div
                class="modal"
                role="dialog"
                aria-labelledby="modalTitle"
                aria-describedby="modalDescription"
                ref="modalContainer"
                @click.stop=""
            >
                <header
                    class="modal-header text-gray-900 text-sm block font-bold"
                    id="modalTitle"
                    v-if="$slots['header']"
                >
                    <slot name="header" />
                </header>

                <section
                    class="modal-body"
                    id="modalDescription"
                    v-if="$slots['body']"
                >
                    <slot name="body" />
                </section>

                <footer class="modal-footer" v-if="$slots['footer']">
                    <slot name="footer" />
                </footer>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

interface Props {
    isVisible?: boolean;
    width?: string;
}

const props = withDefaults(defineProps<Props>(), {
    isVisible: false,
    width: "auto",
});

const emit = defineEmits(["onClose"]);
const modalContainer = ref<HTMLDivElement>();
const modalWrapper = ref<HTMLDivElement>();
const showFlag = ref(props.isVisible);

const toggleModal = (value: boolean) => (showFlag.value = value);
const showModal = () => toggleModal(true);
const closeModal = () => {
    toggleModal(false);
    emit("onClose");
};

watch(
    () => props.isVisible,
    () => {
        showFlag.value = props.isVisible;
    }
);

const modalStyles = computed<any>(() => {
    return {
        "--modal-width": props.width,
    };
});

defineExpose({
    showModal,
    closeModal,
    showFlag,
});
</script>

<style lang="scss" scoped src="./styles.scss"></style>
