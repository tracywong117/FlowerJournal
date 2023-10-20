<template>
  <div>
    <h2 style="text-align: center; color: var(--dark-purple-1);">{{ month }} {{ year }}</h2>
    <table>
      <thead>
        <tr>
          <th v-for="day in daysOfWeek">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in calendarData">
          <td v-for="dayObj in week"
            :class="{ 'current-day': isCurrentDay(Object.keys(dayObj)[0]), 'not-current-month': isNotInputMonth(Object.keys(dayObj)[0]) }">
            <div>
              <span class="calendar-day-select" @click="handleSelectDate(Object.keys(dayObj)[0])">{{
                Object.values(dayObj)[0] }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
export default {
  props: {
    dt: {
      type: String,
      required: true
    }
  },
  computed: {
    year() {
      return this.dt.split(", ")[1];
    },
    month() {
      return this.dt.split(", ")[0];
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
    }
  }
};
</script>
  
<style>

table {
  width: 100%;
  border-collapse: collapse;
  color: var(--dark-purple-1);
}

th {
  background-color: var(--blue-light-3);
}

th, td {
  text-align: center;
  padding: 10px;
}

.current-day {
  background-color: var(--blue-1);
  color: #fff;
}

.not-current-month {
  /* background-color: aqua; */
  color: var(--blue-light-3);
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
  background-color: var(--blue-light-2);
}

</style>