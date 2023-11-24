<template>
  <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
    <div style="display: flex; justify-content: center; align-items: center;">
      <el-button plain color="rgb(139, 92, 246)" @click="prevMonth"
        style="height: 10px; padding: 8px 4px; margin: 0 10px;">
        <SvgIcon type="mdi" :path="mdiChevronLeft_path" width="10" height="10"></SvgIcon>
      </el-button>
      <p style="text-align: center; background: var(--lin-grad-primary-1); -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;">{{ month }} {{ year }}</p>
      <el-button plain color="rgb(189, 101, 166)" @click="nextMonth"
        style="height: 10px; padding: 8px 4px; margin: 0 10px;">
        <SvgIcon type="mdi" :path="mdiChevronRight_path" width="10" height="10"></SvgIcon>
      </el-button>
    </div>
    <table class="monthlyCalendarSmall">
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" style="color: var(--primary-font-color-1); font-size: 14px;">{{ day }}</th>
        </tr>
      </thead>
      <tbody style="vertical-align: baseline;">
        <tr v-for="(week, index) in calendarData">
          <td v-for="dayObj in week">
            <div>
              <span class="calendar-day-select"
                :class="{ 'current-day': isCurrentDay(Object.keys(dayObj)[0]), 'not-current-month': isNotInputMonth(Object.keys(dayObj)[0]) }"
                @click="handleSelectDate(Object.keys(dayObj)[0])">{{
                  Object.values(dayObj)[0] }}</span><br>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
    
<script>
import { ElButton } from 'element-plus';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

import { useCalendarStore } from '../stores/store.js';
import { toRefs } from 'vue';


export default {
  setup() {
    const calendarStore = useCalendarStore();

    const calendarState = toRefs(calendarStore);

    return {
      ...calendarState,
    };
  },
  components: {
    ElButton,
    SvgIcon
  },
  props: {
    dateSelected: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      mdiChevronLeft_path: mdiChevronLeft,
      mdiChevronRight_path: mdiChevronRight,
      monthBrowsing: '',
    };
  },
  mounted() {
    console.log(this.dateSelected);
    this.monthBrowsing = this.dateSelected;
  },
  computed: {
    year() {
      return new Date(this.dateSelected).getFullYear();
    },
    month() {
      const options = { month: 'long' };
      return new Date(this.dateSelected).toLocaleString('en-US', options);
    },
    daysOfWeek() {
      return ["S", "M", "T", "W", "T", "F", "S"];
    },
    calendarData() {
      const date = new Date(this.dateSelected);
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const startDate = new Date(firstDay);
      startDate.setDate(firstDay.getDate() - firstDay.getDay());

      const endDate = new Date(lastDay);
      endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

      const calendarData = [];
      let date_temp = new Date(startDate);

      var temp = {};

      while (date_temp <= endDate) {
        const week = [];
        for (let i = 0; i < 7; i++) {
          var dateObj = date_temp;
          var day_of_month = date_temp.getDate();
          temp = {};
          temp[dateObj] = day_of_month;
          week.push(temp);
          date_temp.setDate(date_temp.getDate() + 1);
        }
        calendarData.push(week);
      }
      console.log(calendarData);

      return calendarData;
    }
  },
  methods: {
    isCurrentDay(day) {
      const currentDay = new Date(this.dateSelected).getDate();
      const selectedDay = new Date(day).getDate();
      const currentMonth = new Date(this.dateSelected).getMonth();
      const selectedMonth = new Date(day).getMonth();
      return currentDay == selectedDay && currentMonth == selectedMonth;
    },
    isNotInputMonth(day) {
      const inputMonth = new Date(this.dateSelected).getMonth();
      const selectedMonth = new Date(day).getMonth();
      return inputMonth != selectedMonth;
    },
    handleSelectDate(date) {
      console.log(date);
    },
    prevMonth() {
      const currentDate = this.monthBrowsing;
      const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
      this.monthBrowsing = prevMonthDate;
    },
    nextMonth() {
      const currentDate = this.monthBrowsing;
      const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
      this.monthBrowsing = nextMonthDate;
    },
  }
};
</script>
    
<style scoped>
.monthlyCalendarSmall {
  font-size: 10px;
  width: 80%;
  border-collapse: collapse;
  color: var(--primary-font-color-2);

}

.monthlyCalendarSmall th,
.monthlyCalendarSmall td {
  text-align: right;
  padding: 2px;
  width: 14.285%;
}

.current-day {
  background-color: var(--primary-light-sharp-color-2);
  color: #fff;
  border-radius: 100%;
  display: inline-block;
}

.not-current-month {
  /* background-color: aqua; */
  color: var(--primary-pale-color-1);
}

.calendar-day-select {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  text-align: center;
  line-height: 25px;
  font-size: 16px;
}

.calendar-day-select:hover {
  cursor: pointer;
  background-color: var(--primary-light-color-1);
}

.current-day:hover {
  background-color: var(--primary-light-sharp-color-1);

}

.current-day:hover .calendar-day-select {
  background-color: var(--primary-light-sharp-color-1);

}
</style>