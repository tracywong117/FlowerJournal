<template>
  <div style="width: 20%;">

    <small-calendar date-selected=""></small-calendar>

    <h2>Selected Time: {{ selectedTime }}</h2>
    <time-picker v-model="selectedTime"></time-picker>
  </div>

</template>
    
<script>
import SmallCalendar from '../components/SmallCalendar.vue';
import TimePicker from '../components/TimePicker.vue';
export default {
  components: {
    SmallCalendar,
    TimePicker,

  },
  data() {
    return {
      selectedTime: "2:00 PM"
    };
  }
}

</script>