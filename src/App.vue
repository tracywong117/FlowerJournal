
<template>
<router-view />
</template>

<script>
import { useCalendarStore } from './stores/store.js';
import { toRefs } from 'vue';

export default {
  setup() {
    const calendarStore = useCalendarStore();

    const calendarState = toRefs(calendarStore);

    const getEventsForDate = (date) => {
      return calendarState.events.value.filter((eventinfo) => {
        const eventDate = new Date(eventinfo.date);
        const providedDate = new Date(date);

        return eventDate.toLocaleDateString() === providedDate.toLocaleDateString();
      });
    };

    return {
      ...calendarState,
      getEventsForDate,
      saveEventData: calendarStore.saveEventData,
      loadEventData: calendarStore.loadEventData,
    };
  },
  mounted() {
    this.loadEventData();
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.saveEventData);
  },
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair&display=swap');
@import './assets/css/color.css';

body{
  /* background-color: var(--paper-background); */
  font-family: Poppins, Playfair, Switzer, Inter, DM Sans, Mona Sans, Arial, sans-serif;
  font-size: 22px;
  overflow-x: hidden;
}

</style>
