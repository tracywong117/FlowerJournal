<template>
  <div class="time-picker">
    <div class="picker">
      <button class="arrow" @click="incrementHour">&#9650;</button>
      <input class="number-picker" type="number" :value="formatNumber(hour)" @input="updateHour"
        @click="selectAllText($event.target)" />
      <button class="arrow" @click="decrementHour">&#9660;</button>
    </div>
    <div class="picker">
      <button class="arrow" @click="incrementMinute">&#9650;</button>
      <input class="number-picker" type="number" :value="formatNumber(minute)" @input="updateMinute"
        @click="selectAllText($event.target)" />
      <button class="arrow" @click="decrementMinute">&#9660;</button>
    </div>
    <div class="picker">
      <button class="arrow select-am-pm" @click="toggleAMPM">{{ isAM ? 'AM' : 'PM' }}</button>
    </div>
  </div>
</template>
  
<script>
import { ElButton } from 'element-plus';
export default {
  components: {
    ElButton
  },
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hour: 0,
      minute: 0,
      isAM: true,
    };
  },
  mounted() {
    if (this.modelValue){
      this.parseModelValue();
    }
  },
  watch: {
    modelValue(newValue) {
      this.parseModelValue();
    }
  },
  methods: {
    incrementHour() {
      this.hour = (this.hour + 1) % 12;
      this.updateTime();
    },
    decrementHour() {
      this.hour = (this.hour + 11) % 12;
      this.updateTime();
    },
    incrementMinute() {
      this.minute = (this.minute + 1) % 60;
      this.updateTime();
    },
    decrementMinute() {
      this.minute = (this.minute + 59) % 60;
      this.updateTime();
    },
    toggleAMPM() {
      this.isAM = !this.isAM;
      this.updateTime();
    },
    formatNumber(value) {
      return value.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    },
    updateHour(event) {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value) && value >= 0 && value <= 12) {
        this.hour = value;
      } else {
        // Reset to the previous valid value
        event.target.value = this.hour;
      }
      this.updateTime();
    },
    updateMinute(event) {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value) && value >= 0 && value <= 59) {
        this.minute = value;
      } else {
        // Reset to the previous valid value
        event.target.value = this.minute;
      }
      this.updateTime();
    },
    updateTime() {
      const timeString = `${this.hour}:${this.formatNumber(this.minute)} ${this.isAM ? 'AM' : 'PM'}`;
      this.$emit('update:modelValue', timeString);
    },
    parseModelValue() {
      // try {
        const parts = this.modelValue.split(':');
        if (parts.length === 2) {
          const hour = parseInt(parts[0], 10);
          const minute = parseInt(parts[1].split(' ')[0], 10);
          const isAM = parts[1].includes('AM');
          console.log("Parsing")
          console.log(hour, minute, isAM);
          if (!isNaN(hour) && !isNaN(minute) && hour >= 0 && hour <= 12 && minute >= 0 && minute <= 59) {
            this.hour = hour;
            this.minute = minute;
            this.isAM = isAM;
          }
        }
      // } catch (error) {
      //   console.error('Error parsing time:', error);
      // }

    },
    selectAllText(input) {
      input.select();
    },
  },
};
</script>
  
<style scoped> .number-picker input::-webkit-outer-spin-button,
 input::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
 }

 .number-picker input[type=number] {
   -moz-appearance: textfield;
 }

 input {
   outline: 0;
   border-width: 1px 0 1px 0;
   border-top: 1px solid #b3a3d0;
   border-bottom: 1px solid #b3a3d0;
   font-size: 16px;
   width: 50px;
   color: var(--primary-font-color-2);
 }

 .number-picker {
   text-align: center;
 }

 .time-picker {
   display: flex;
   align-items: center;
 }

 .picker {
   display: flex;
   align-items: center;
   margin-right: 10px;
   flex-direction: column;
   /* border: 1px solid var(--primary-background-color-1); */
 }

 .arrow {
   margin: 1px;
   width: 16px;
   height: 16px;
   /* border: none; */
   color: var(--primary-font-color-1);
   background-color: transparent;
   cursor: pointer;
 }

 .select-am-pm {
   border: 1px solid #b3a3d0;
   width: 30px;

 }
</style>