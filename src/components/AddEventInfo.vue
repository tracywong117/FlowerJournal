<template>
  <div style="padding: 20px;">
    <div style="display: flex; align-items: center; justify-content: end;">
      <span style="padding: 10px;">All Day</span><el-switch v-model="allDay"
        style="--el-switch-on-color: #dda8cd; "></el-switch>
    </div>
    <div
      style="display: flex; align-items: center; padding-bottom: 5px; justify-content: space-between; padding-bottom: 10px;">
      <div>

        <div style="color: var(--primary-font-color-2);" class="text-hover">
          <el-popover popper-style="border:  1px solid #c1b5ce;" placement="bottom-start" width="300" trigger="click"
            :show-arrow="false">
            <template #reference>
              <div style="display: flex; align-items: center;">
                <svg-icon type="mdi" :path="mdiCalendarPath" style="padding-right: 5px;" width="20" height="20"></svg-icon>
                <span style="color: var(--primary-font-color-2);">{{ formattedDate }}</span>
              </div>
            </template>
            <small-calendar v-if="eventinfo && eventinfo.date" v-model="dateToConfirm"></small-calendar>
          </el-popover>
        </div>
        <div style="color: var(--primary-font-color-2);" class="text-hover">
          <el-popover popper-style="border:  1px solid #c1b5ce;" placement="bottom-start" width="300" trigger="click"
            :show-arrow="false">
            <template #reference>
              <div style="display: flex; align-items: center;">
                <svg-icon type="mdi" :path="mdiCalendarPath" style="padding-right: 5px;" width="20" height="20"></svg-icon>
                <span style="color: var(--primary-font-color-2);">{{ formattedEndDate }}</span>
              </div>
            </template>
            <small-calendar v-if="eventinfo && eventinfo.endDate" v-model="endDateToConfirm"></small-calendar>
          </el-popover>
        </div>
      </div>
      <div v-if="!eventinfo.allDay" style="display: flex; align-items: center;">
        <svg-icon type="mdi" :path="mdiClockTimeFourOutlinePath" width="20" height="20"></svg-icon>
        <div class="text-hover">
          <el-popover popper-style="border: 1px solid #c1b5ce;" placement="bottom-start" width="200" trigger="click"
            :show-arrow="false">
            <template #reference>
              <span style="padding:0 1px; color: var(--primary-font-color-2); ">{{ eventinfo.starttime }}</span>
            </template>
            <div style="display: flex; justify-content: center; align-items: center;">
              <time-picker v-model="eventinfo.starttime"></time-picker>
            </div>
          </el-popover>
        </div>
        <span>:</span>
        <div class="text-hover">
          <el-popover popper-style="border:  1px solid #c1b5ce;" placement="bottom-start" width="200" trigger="click"
            :show-arrow="false">
            <template #reference>
              <span style="padding:0 1px; color: var(--primary-font-color-2); ">{{ eventinfo.endtime }}</span>
            </template>
            <div style="display: flex; justify-content: center; align-items: center;">
              <time-picker v-model="eventinfo.endtime"></time-picker>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <input ref="input" type="text" v-model="eventinfo.name" />
    <div v-if="eventinfo.remark || eventinfo.remark == ''">
      <RichtextEditor v-model="eventinfo.remark"></RichtextEditor>
    </div>
    <el-button plain color="rgb(139, 92, 246)" style="width: 80px;" @click="handleDone">Done</el-button>
    <el-button plain color="rgb(189, 101, 166)" style="width: 80px;" @click="handleDelete">Delete</el-button>
  </div>
</template>

<script>
import { useCalendarStore } from '../stores/store.js';
import { toRefs } from 'vue';

import { ElButton, ElPopover, ElSwitch } from 'element-plus';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCalendar, mdiClockTimeFourOutline } from '@mdi/js';

import RichtextEditor from '../components/RichtextEditor.vue';
import SmallCalendar from './SmallCalendar.vue';
import TimePicker from './TimePicker.vue';

export default {
  setup() {
    const calendarStore = useCalendarStore();

    const calendarState = toRefs(calendarStore);

    return {
      ...calendarState,
      saveEventData: calendarStore.saveEventData,
    };
  },
  components: {
    SvgIcon,
    RichtextEditor,
    ElButton,
    SmallCalendar,
    ElPopover,
    TimePicker,
    ElSwitch,

  },
  props: {
    eventinfoid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      eventinfo: {

      },
      mdiCalendarPath: mdiCalendar,
      mdiClockTimeFourOutlinePath: mdiClockTimeFourOutline,
      smallCalendarVisiible: false,
      allDay: false,
    };
  },
  mounted() {
    this.eventinfo = this.events.find(event => event.id === this.eventinfoid) || {};
    console.log(this.eventinfo);
    this.dateToConfirm = this.eventinfo.date;
    this.endDateToConfirm = this.eventinfo.endDate;
    this.allDay = this.eventinfo.allDay;
  },
  methods: {
    formatDate(date) {
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
      const formatted = new Date(date).toLocaleDateString(undefined, options);
      return formatted;
    },
    handleDone() {
      this.showEventDialog = false;
      setTimeout(() => {
        this.eventinfo.date = this.dateToConfirm;
        this.eventinfo.endDate = this.endDateToConfirm;

        if (this.eventinfo.endDate < this.eventinfo.date) {
          const temp = this.eventinfo.date;
          this.eventinfo.date = this.eventinfo.endDate;
          this.eventinfo.endDate = temp;
        }
      }, 100);
      this.allEventRenderWay = this.renderAllEventInCalendar();
      console.log(this.allEventRenderWay);
      this.saveEventData();
    },
    handleDelete() {
      this.showEventDialog = false;
      this.events = this.events.filter(event => event.id !== this.eventinfoid);
      this.allEventRenderWay = this.renderAllEventInCalendar();
      console.log(this.allEventRenderWay);
      this.saveEventData();
    },
  },
  watch: {
    allDay(newValue) {
      this.eventinfo.allDay = newValue;
      if (this.eventinfo.starttime == '') {
        this.eventinfo.starttime = '0:00 AM';
      }
      if (this.eventinfo.endtime == '') {
        this.eventinfo.endtime = '0:00 AM';
      }
    },
    eventinfo(newValue) {
      // Question: why this.events is updated??
      // It is the right behavior, but I don't understand why it is happening.
      // I think I should update this.events when this.eventinfo is changed (However I didn't write this code)

      // const tryIfUpdatedInEvents = this.events.find(event => event.id === this.eventinfoid) || {} ;
      // console.log(tryIfUpdatedInEvents == this.eventinfo);
      this.allEventRenderWay = this.renderAllEventInCalendar();
      console.log(this.allEventRenderWay);
      this.saveEventData();
    }
  },
  computed: {
    formattedDate() {
      if (this.eventinfo && this.eventinfo.date) {
        return this.formatDate(this.dateToConfirm)
      }
      return '';
    },
    formattedEndDate() {
      if (this.eventinfo && this.eventinfo.endDate) {
        return this.formatDate(this.endDateToConfirm)
      }
      return '';
    },
  },
};
</script>

<style scoped>
.small-calendar-popover-container .el-popper.is-light {
  border: 1px solid #c1b5ce;
}

input {
  width: 100%;
  outline: 0;
  border-width: 0 0 1px;
  border-color: #b3adbd;
  background-color: var(--primary-background-color-1);
  font-family: Poppins, Playfair, Switzer, Inter, DM Sans, Mona Sans, Arial, sans-serif;
  font-size: 22px;
  resize: none;
}

.text-hover {
  padding: 2px 5px;
  border-radius: 5px;
  cursor: pointer;
  /* background-color: var(--primary-light-color-2); */
}

.text-hover:hover {
  background-color: var(--primary-light-color-3);
}
</style>