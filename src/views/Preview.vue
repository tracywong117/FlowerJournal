<template>
  <div id="app">
    <h1>Time Picker Example</h1>
    <time-picker v-model="selectedTime" />
    <p>Selected Time: {{ selectedTime }}</p>
  </div>
</template>

<script>
// Import the TimePicker component from its file location
import TimePicker from '../components/TimePicker.vue';

export default {
  name: 'App',
  components: {
    TimePicker
  },
  data() {
    return {
      selectedTime: '12:00 AM'
    };
  }
};
</script>

<style>

</style>