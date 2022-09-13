<template>
    <div class="grid grid-flow-col auto-cols-max gap-4">
        <button
            v-for="(item, index) in datesArray"
            :key="index"
            @click="clickNewDate(item.dateObject, index)"
            class="block"
        >
            {{ item.dateObject.getDate() + 1 }}
            <br />
            {{ daysName[item.dateObject.getDay()] }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { addDays, getDatesBetweenRange } from "@/utils/dateMethods";

const gapDates = 10;
const daysName = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
const datesArray = ref<Array<any>>([]);

const clickNewDate = (selectedDate: Date, index: number) => {
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

onBeforeMount(() => {
    const stopDateLeft = addDays(new Date(), gapDates * -1);
    const stopDateRight = addDays(new Date(), gapDates);

    const newDatesRange = getDatesBetweenRange(stopDateLeft, stopDateRight);
    datesArray.value = [...new Set([...newDatesRange])];
});
</script>

<style scoped></style>
