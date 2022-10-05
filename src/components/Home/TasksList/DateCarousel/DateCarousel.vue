<template>
    <div class="container mx-auto">
        <div class="date-data">
            <span>
                {{ monthNames[selectedDate.getMonth()] }}
                {{ selectedDate.getDate() }}
            </span>
        </div>
        <carousel :items-to-show="10" ref="dateCarousel">
            <slide v-for="(item, index) in datesArray" :key="index">
                <button
                    @click="selectDate(index)"
                    class="date-container"
                    :class="[item.active ? 'active' : '']"
                >
                    <span>{{ shortMonthNames[item.getMonth()] }}</span>
                    <span>{{ item.getDate() }}</span>
                    <span>{{ dayNames[item.getDay()] }}</span>
                </button>
            </slide>
        </carousel>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import {
    dayNames,
    monthNames,
    shortMonthNames,
    addDays,
    getDatesBetweenRange,
} from "@/utils/dateMethods";

const emit = defineEmits(["selectedDate"]);

const gapDates = 200;

const dateCarousel = ref<any>(null);
const datesArray = ref<Array<any>>([]);
const selectedDate = ref<Date>(new Date());

const clickNewDate = (index: number) => {
    const dateTofill = datesArray.value[index];
    const differenceWithFirstItem = index;
    const differenceWithLastItem = datesArray.value.length - 1 - index;
    const firstDate = index == 0 ? dateTofill : datesArray.value[0];

    const lastDate =
        index == datesArray.value.length - 1
            ? dateTofill
            : datesArray.value[datesArray.value.length - 1];

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
    selectedDate.value = datesArray.value[index];
    datesArray.value.map((item: any, i: number) => {
        item.active = i == index;
        return item;
    });
    emit("selectedDate", datesArray.value[index]);
    dateCarousel.value?.slideTo(index);
};

const fillData = (type: string, index = 0) => {
    if (type === "left") {
        const currentDay = datesArray.value[index];
        const previousDay = addDays(new Date(currentDay.getTime()), -1);
        const leftRangeDay = addDays(
            new Date(previousDay.getTime()),
            -1 * gapDates
        );
        const newDatesRange = getDatesBetweenRange(leftRangeDay, previousDay);

        datesArray.value = [
            ...new Set([...newDatesRange]),
            ...datesArray.value,
        ];
        // console.log(newDatesRange);
        return;
    }
};

watch(
    () => dateCarousel.value?.data.currentSlide.value,
    (currentSlide) => {
        if (
            currentSlide === dateCarousel.value.data.minSlide.value ||
            currentSlide === dateCarousel.value.data.maxSlide.value
        ) {
            //TODO: Check to add dates
        }
    }
);

onBeforeMount(() => {
    const stopDateLeft = addDays(
        new Date(selectedDate.value.getTime()),
        gapDates * -1
    );
    const stopDateRight = addDays(
        new Date(selectedDate.value.getTime()),
        gapDates
    );

    const newDatesRange = getDatesBetweenRange(stopDateLeft, stopDateRight);
    datesArray.value = [...new Set([...newDatesRange])];
});

onMounted(() => {
    const datesArrayValuesActived = datesArray.value.find((item) => {
        return item.active;
    });

    if (!datesArrayValuesActived) {
        const nowObjectIndex = datesArray.value.findIndex(
            (item: any) =>
                item.toDateString() == selectedDate.value.toDateString()
        );
        selectDate(nowObjectIndex);
    }
});
</script>

<style lang="scss" scoped src="./styles.scss"></style>
