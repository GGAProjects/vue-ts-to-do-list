<template>
    <div class="navigation">
        <ul ref="menuContainer">
            <li :class="[$route.name === 'home' ? 'active' : '']">
                <router-link :to="{ name: 'home' }">
                    <span class="icon-container">
                        <ion-icon name="bag-check-outline"></ion-icon>
                    </span>
                    <span class="text">Tareas</span>
                </router-link>
            </li>
            <li :class="[$route.name === 'group' ? 'active' : '']">
                <router-link :to="{ name: 'group' }">
                    <span class="icon-container">
                        <ion-icon name="bag-check-outline"></ion-icon>
                    </span>
                    <span class="text">Grupos</span>
                </router-link>
            </li>
            <li>
                <button type="button" @click="openTaskModal">
                    <span class="icon-container">
                        <ion-icon name="add-outline"></ion-icon>
                    </span>
                    <span class="text">Agregar</span>
                </button>
            </li>
            <li>
                <router-link :to="{ name: 'home' }">
                    <span class="icon-container">
                        <ion-icon name="trending-up-outline"></ion-icon>
                    </span>
                    <span class="text">Reportes</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'home' }">
                    <span class="icon-container">
                        <ion-icon name="person-circle-outline"></ion-icon>
                    </span>
                    <span class="texs">Perfil</span>
                </router-link>
            </li>
            <div class="indicator" ref="indicatorElement"></div>
        </ul>
    </div>
    <TaskModal ref="taskModalRef" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import TaskModal from "@/components/General/TaskModal";

const menuContainer = ref<HTMLUListElement>();
const indicatorElement = ref<HTMLDivElement>();
const taskModalRef = ref<InstanceType<typeof TaskModal>>();

const getDomIndex = (target: any) => {
    return [].slice.call(target.parentNode.children).indexOf(target as never);
};

const translateIndicator = () => {
    const listActived = menuContainer.value?.querySelector(
        "li.active"
    ) as unknown as HTMLCollection;
    const widthIndicator = 70;
    if (!listActived) return;

    const index = getDomIndex(listActived);
    if (indicatorElement.value) {
        indicatorElement.value.style.transform = `translateX(${
            index * widthIndicator
        }px)`;
    }
};

const openTaskModal = () => {
    taskModalRef.value!.openModal();
};

onMounted(() => {
    translateIndicator();
});
</script>

<style scoped src="./styles.scss"></style>
