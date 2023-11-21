<template>
  <div>
    <div style="display: flex; justify-content: center; align-items: center;">
      <el-button plain color="rgb(139, 92, 246)" style="margin: 0 100px 0 0;" @click="prevMonth">
        <SvgIcon type="mdi" :path="mdiChevronLeft_path"></SvgIcon>
      </el-button>
      <p style="text-align: center; background: var(--lin-grad-primary-1); -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;">{{ month }} {{ year }}</p>
      <el-button plain color="rgb(189, 101, 166)" style="margin: 0 0 0 100px;" @click="nextMonth">
        <SvgIcon type="mdi" :path="mdiChevronRight_path"></SvgIcon>
      </el-button>
    </div>
    <table>
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
              <div v-for="event in getEventsForDate(Object.keys(dayObj)[0])" :key="event.date">
                <span
                  style="text-align:left; font-size: 14px; background-color: var(--primary-light-color-1); display: block; padding: 0 10px; border-radius: 5px; margin: 5px;">
                  {{ event.time }} {{ event.category }}
                </span>
              </div>
              <span
                style="text-align:left; font-size: 14px; background-color: var(--primary-light-color-1); display: block; padding: 0 10px; border-radius: 5px; margin: 5px;">
                XXX
              </span>
              <span
                style="text-align:left; font-size: 14px; background-color: var(--primary-light-color-1); display: block; padding: 0 10px; border-radius: 5px; margin: 5px;">
                XXX
              </span>
              <!-- <span style="display: block; padding: 0 10px; margin: 5px;">
                ...
              </span> -->
              <!-- <div class="event-container">
                <div v-for="(event, eventIndex) in getEventsForDate(Object.keys(dayObj)[0]).slice(0, 3)" :key="eventIndex"
                  class="event-item">
                  <span class="event-time">{{ event.time }}</span>
                  <span class="event-category">{{ event.category }}</span>
                  <span class="event-remark">{{ event.remark }}</span>
                </div>
              </div> -->

              <!-- <span
                style="text-align:left; font-size: 14px; background-color: var(--primary-light-color-1); display: block; padding: 0 10px; border-radius: 5px; margin: 5px;">10PM
                Meeting</span>
              <span
                style="text-align:left; font-size: 14px; background-color: var(--secondary-light-color-1); display: block; padding: 0 10px; border-radius: 5px; margin: 5px;">12PM
                Meeting</span> -->
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

    const getEventsForDate = (date) => {
      return calendarState.events.value.filter((event) => {
        const eventDate = new Date(event.date);
        const providedDate = new Date(date);

        return eventDate.toLocaleDateString() === providedDate.toLocaleDateString();
      });
    };

    return {
      ...calendarState,
      getEventsForDate
    };
  },
  components: {
    ElButton,
    SvgIcon
  },
  data() {
    return {
      mdiChevronLeft_path: mdiChevronLeft,
      mdiChevronRight_path: mdiChevronRight,
    };
  },
  mounted() {
    console.log(this.events);
  },
  computed: {
    year() {
      return this.dt.getFullYear();
    },
    month() {
      const options = { month: 'long' };
      return this.dt.toLocaleString('en-US', options);
    },
    daysOfWeek() {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    },
    calendarData() {
      const date = new Date(this.dt);
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
      const currentDay = new Date().getDate();
      const selectedDay = new Date(day).getDate();
      const currentMonth = new Date().getMonth();
      const selectedMonth = new Date(day).getMonth();
      return currentDay == selectedDay && currentMonth == selectedMonth;
    },
    isNotInputMonth(day) {
      const inputMonth = new Date(this.dt).getMonth();
      const selectedMonth = new Date(day).getMonth();
      return inputMonth != selectedMonth;
    },
    handleSelectDate(date) {
      console.log(date);
    },
    prevMonth() {
      const currentDate = this.dt;
      const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
      this.dt = prevMonthDate;
    },
    nextMonth() {
      const currentDate = this.dt;
      const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
      this.dt = nextMonthDate;
    },
  }
};
</script>
  
<style>
table {
  width: 100%;
  border-collapse: collapse;
  color: var(--primary-font-color-2);

}

th {
  border-bottom: 1px solid var(--primary-light-color-1);
}

th,
td {
  text-align: right;
  padding: 10px;
  width: 14.285%;
}

td {
  border: 1px solid var(--primary-light-color-1);
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
  width: 40px;
  height: 40px;
  border-radius: 100%;
  text-align: center;
  line-height: 40px;

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