<template>
  <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;" class="unselectable">
    <div style="display: flex; justify-content: center; align-items: center;">
      <el-button plain color="rgb(139, 92, 246)" style="margin: 0 100px 0 0;" @click="prevMonth">
        <SvgIcon type="mdi" :path="mdiChevronLeft_path"></SvgIcon>
      </el-button>
      <p class="unselectable" style="text-align: center; background: var(--lin-grad-primary-1); -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;">{{ month }} {{ year }}</p>
      <el-button plain color="rgb(189, 101, 166)" style="margin: 0 0 0 100px;" @click="nextMonth">
        <SvgIcon type="mdi" :path="mdiChevronRight_path"></SvgIcon>
      </el-button>
    </div>
    <table class="monthlyCalendarLarge unselectable">
      <thead class="unselectable">
        <tr>
          <th v-for="day in weekDayLabels" class="unselectable" style="color: var(--primary-font-color-1); font-size: 14px;">
            {{ day }}</th>
        </tr>
      </thead>
      <tbody style="vertical-align: baseline;" class="unselectable">
        <tr v-for="week in calendarData" class="unselectable">
          <td v-for="dayObj in week" class="unselectable">
            <div @dragover="allowDrop" @dragenter="dragEnter(Object.keys(dayObj)[0])" @drop="drop(Object.keys(dayObj)[0])"
              :class="{ 'hovered': hoveredField === Object.keys(dayObj)[0] }" style="height: 15vh;"
              @dblclick="addNewEvent(Object.keys(dayObj)[0])">
              <span class="calendar-day-select"
                :class="{ 'current-day': isCurrentDay(Object.keys(dayObj)[0]), 'not-current-month': isNotInputMonth(Object.keys(dayObj)[0]) }"
                @click="handleSelectDate(Object.keys(dayObj)[0])">{{
                  Object.values(dayObj)[0] }}</span>
              <div v-for="eventinfo in getEventsForDate(Object.keys(dayObj)[0]).slice(0, 2)  " :draggable="true"
                @dragstart="startDrag(eventinfo, $event);"
                @dragend="draggedItem = null" :style="{
                  'opacity': eventinfo === draggedItem ? '0.5' : '1',
                  'transition': 'opacity 0.3s',

                }">

                <span class="eventinfo-container background-highlight-1 " :style="{
                }" @click="handleOpenEventDialog(eventinfo)">
                  {{ eventinfo.name }}
                </span>

              </div>

              <div v-for="n in Math.max(0, 2 - getEventsForDate(Object.keys(dayObj)[0]).length)  ">
                <span class="eventinfo-container background-highlight-1" style="visibility: hidden;">
                  XXX
                </span>
              </div>

              <div v-if="getEventsForDate(Object.keys(dayObj)[0]).length > 2">
                <span class="more-eventinfo-container">
                  {{ getEventsForDate(Object.keys(dayObj)[0]).length - 2 }} more...
                </span>
              </div>
              <div v-else>
                <span class="more-eventinfo-container" style="visibility: hidden;">
                  ...
                </span>
              </div>

            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <el-dialog v-model="showEventDialog" :modal=false class="event-dialog" width="40%" :show-close=false>
    <add-event-info :eventinfoid="showEventId" :key="dialogKey"></add-event-info>
  </el-dialog>
</template>
  
<script>
import { ElButton, ElPopover, ElDialog } from 'element-plus';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { v4 as uuidv4 } from 'uuid';

import { useCalendarStore } from '../stores/store.js';
import { toRefs } from 'vue';

import AddEventInfo from './AddEventInfo.vue';


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
    };
  },
  components: {
    ElButton,
    SvgIcon,
    ElPopover,
    ElDialog,
    AddEventInfo,

  },
  data() {
    return {
      mdiChevronLeft_path: mdiChevronLeft,
      mdiChevronRight_path: mdiChevronRight,
      draggedItem: null,
      hoveredField: null,
      dialogKey: 0,
      // dragging: false
    };
  },
  computed: {
    year() {
      return this.dt.getFullYear();
    },
    month() {
      const options = { month: 'long' };
      return this.dt.toLocaleString('en-US', options);
    },
    weekDayLabels() {
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

      return calendarData;
    },

  },
  methods: {
    // Check if the day is today
    isCurrentDay(day) {
      const today = new Date().getDate();
      const currentMonth = new Date().getMonth();
      return today == new Date(day).getDate() && currentMonth == new Date(day).getMonth();
    },
    // Check if the day is not the input month
    isNotInputMonth(day) {
      const inputMonth = new Date(this.dt).getMonth();
      return inputMonth != new Date(day).getMonth();
    },
    // handle click the date on calendar
    handleSelectDate(date) {
      // console.log(date);
    },
    // go to the previous month
    prevMonth() {
      const currentDate = this.dt;
      const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
      this.dt = prevMonthDate;
    },
    // go to the next month
    nextMonth() {
      const currentDate = this.dt;
      const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
      this.dt = nextMonthDate;
    },
    startDrag(eventinfo, event) {
      // TODO: change the cursor to move during dragging
      // this.dragging = true;
      this.draggedItem = eventinfo;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", ""); // Necessary for Firefox
    },
    allowDrop(event) {
      event.preventDefault();
    },
    dragEnter(newIndex) {
      console.log(`Item first touched index: ${newIndex}`);
      if (this.draggedItem) {
        this.hoveredField = newIndex;
      }
    },
    // drop the dragged item
    drop(newIndex) {
      if (this.draggedItem) {
        if (this.draggedItem.index !== newIndex) {
          console.log(`Item moved to index: ${newIndex}`);
        }

        const offset = new Date(newIndex).getTimezoneOffset();
        const tempdate = new Date(new Date(newIndex).getTime() - (offset * 60 * 1000));
        const formattedDate = tempdate.toISOString().split('T')[0];

        console.log(formattedDate);
        this.draggedItem.date = formattedDate;

        console.log(this.events);

        this.draggedItem = null;
        this.hoveredField = null;
      }
    },
    // open the event dialog
    handleOpenEventDialog(eventinfo) {
      this.showEventId = eventinfo.id;
      this.showEventDialog = true;
      this.dialogKey++;
    },
    // add new event
    addNewEvent(date) {
      const offset = new Date(date).getTimezoneOffset();
      const tempdate = new Date(new Date(date).getTime() - (offset * 60 * 1000));
      const formattedDate = tempdate.toISOString().split('T')[0];
      this.events.push({
        id: uuidv4(),
        time: '',
        starttime: '',
        endtime: '',
        date: formattedDate,
        name: "New Event",
        remark: '',
        category: '',
        allDay: true,
      });
      this.saveEventData();
    },


  },
};
</script>
  
<style>
.unselectable {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

table {
  width: 80%;
  border-collapse: collapse;
  color: var(--primary-font-color-2);

}

.event-dialog {
  background: var(--primary-background-color-1);
  border-radius: 25px;
  padding: 0px 10px;
  /* box-shadow: none; */
}

.el-dialog__body {
  padding: 0 !important;
}

.el-dialog__header {
  padding: 12px !important;
  padding-bottom: 0px !important;
}

.monthlyCalendarLarge th {
  border-bottom: 1px solid var(--primary-light-color-1);
}

.monthlyCalendarLarge th,
.monthlyCalendarLarge td {
  text-align: right;
  padding: 2px;
  width: 14.285%;
}

.monthlyCalendarLarge td {
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

.eventinfo-container {
  text-align: left;
  font-size: 12px;
  display: block;
  padding: 0 10px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
}

.background-highlight-1 {
  border: 0.5px solid var(--primary-light-color-1);
  background-color: var(--primary-light-color-1);
}

.background-highlight-1:hover {
  border: 0.5px solid var(--primary-light-sharp-color-1);
}

.more-eventinfo-container {
  text-align: center;
  font-size: 12px;
  display: block;
  padding: 0 10px;
  margin: 2px;
  cursor: pointer;
}

/* not work */
/* .drag-cursor {
  cursor: move;
  pointer-events: all;
} */

.hovered {
  background-color: rgb(233, 244, 248);
}
</style>