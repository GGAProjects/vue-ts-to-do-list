<template>
    <div class="container mx-auto">
        <carousel :items-to-show="10" ref="myCarousel">
            <slide v-for="(item, index) in datesArray" :key="index">
                <button
                    @click="selectDate(index)"
                    class="date-container"
                    :class="[item.active ? 'active' : '']"
                >
                    <span>{{ item.dateObject.getDate() }}</span>
                    <span>{{ daysName[item.dateObject.getDay()] }}</span>
                </button>
            </slide>
        </carousel>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { addDays, getDatesBetweenRange } from "@/utils/dateMethods";

const emit = defineEmits(["selectedDate"]);

const myCarousel = ref<any>(null);

const gapDates = 10;
const daysName = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
const datesArray = ref<Array<any>>([]);

const clickNewDate = (index: number) => {
    const selectedDate = datesArray.value[index];
    const differenceWithFirstItem = index;
    const differenceWithLastItem = datesArray.value.length - 1 - index;
    const firstDate =
        index == 0 ? selectedDate : datesArray.value[0].dateObject;

    const lastDate =
        index == datesArray.value.length - 1
            ? selectedDate
            : datesArray.value[datesArray.value.length - 1].dateObject;

    const leftStartDate =
        gapDates - differenceWithFirstItem < 0
            ? firstDate
            : addDays(
                  new Date(firstDate.getTime()),
                  (gapDates - differenceWithFirstItem) * -1
              );

    const rightStopDate =
        gapDates - differenceWithLastItem < 0
            ? lastDate
            : addDays(
                  new Date(lastDate.getTime()),
                  gapDates - differenceWithLastItem
              );

    const newDatesRange = getDatesBetweenRange(leftStartDate, rightStopDate);

    datesArray.value = [...new Set([...newDatesRange])];
};

const selectDate = (index: number) => {
    datesArray.value.map((item: any, i: number) => {
        item.active = i == index;
        return item;
    });
    emit("selectedDate", datesArray.value[index]);
    myCarousel.value?.slideTo(index);
};

watch(
    () => myCarousel.value?.data.currentSlide.value,
    (currentSlide) => {
        if (
            currentSlide === myCarousel.value.data.minSlide.value ||
            currentSlide === myCarousel.value.data.maxSlide.value
        ) {
            clickNewDate(currentSlide);
        }
    }
);

watch(
    () => datesArray.value,
    (datesArrayValues) => {
        const datesArrayValuesActived = datesArrayValues.find((item) => {
            return item.active;
        });

        if (!datesArrayValuesActived) {
            const now = new Date();
            const nowObjectIndex = datesArray.value.findIndex(
                (item: any) =>
                    item.dateObject.toDateString() == now.toDateString()
            );
            console.log(nowObjectIndex);
            selectDate(nowObjectIndex);
        }
    }
);

onBeforeMount(() => {
    const now = new Date();
    const stopDateLeft = addDays(new Date(now.getTime()), gapDates * -1);
    const stopDateRight = addDays(new Date(now.getTime()), gapDates);

    const newDatesRange = getDatesBetweenRange(stopDateLeft, stopDateRight);
    datesArray.value = [...new Set([...newDatesRange])];
});
</script>

<style lang="scss" scoped src="./styles.scss"></style>
