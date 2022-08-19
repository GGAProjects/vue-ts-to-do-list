<template>
    <transition name="modal-fade">
        <div
            class="modal-backdrop"
            v-if="showFlag"
            ref="modalWrapper"
            @click="closeModal"
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
                    class="modal-header"
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
import { ref, watch } from "vue";

interface Props {
    isVisible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isVisible: false,
});

const emit = defineEmits(["close"]);
const modalContainer = ref<HTMLDivElement>();
const modalWrapper = ref<HTMLDivElement>();
const showFlag = ref(props.isVisible);

const toggleModal = (value: boolean) => (showFlag.value = value);
const showModal = () => toggleModal(true);
const closeModal = () => toggleModal(false);

watch(
    () => props.isVisible,
    () => {
        showFlag.value = props.isVisible;
    }
);

defineExpose({
    showModal,
    closeModal,
});

const close = emit("close");
</script>

<style lang="scss" scoped src="./styles.scss"></style>
