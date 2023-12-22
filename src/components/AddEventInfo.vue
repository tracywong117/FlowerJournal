<template>
  <div>
    <div style="padding: 20px;">
      <div
        style="display: flex; align-items: center; padding-bottom: 5px; justify-content: space-between; padding-bottom: 10px;">
        <div style="color: var(--primary-font-color-2);" class="text-hover">
          <el-popover popper-style="border:  1px solid #c1b5ce;" placement="bottom-start" width="300" trigger="click"
            :show-arrow="false">
            <template #reference>
              <div style="display: flex; align-items: center;">
                <svg-icon type="mdi" :path="mdiCalendarPath" style="padding-right: 5px;" width="20"
                  height="20"></svg-icon>
                <span style="color: var(--primary-font-color-2);">{{ formattedDate }}</span>
              </div>
            </template>
            <small-calendar v-if="eventinfo && eventinfo.date" v-model="dateToConfirm"></small-calendar>
          </el-popover>

        </div>
        <div style="display: flex; align-items: center;">
          <svg-icon type="mdi" :path="mdiClockTimeFourOutlinePath" width="20" height="20"></svg-icon>
          <div class="text-hover">
            <el-popover popper-style="border:  1px solid #c1b5ce;" placement="bottom-start" width="200" trigger="click"
              :show-arrow="false">
              <template #reference>
                <span v-if="eventinfo.starttime != ''" style="padding:0 1px; color: var(--primary-font-color-2); ">{{
                  eventinfo.starttime }}</span>
                <span v-else style="margin: 0 20px;"></span>
              </template>
              <div style="display: flex; justify-content: center; align-items: center;" v-if="eventinfo.starttime != ''">
                <!-- <time-picker v-model="eventinfo.starttime"></time-picker> -->
              </div>
            </el-popover>
          </div>
          <span>:</span>
          <div class="text-hover">
            <el-popover popper-style="border:  1px solid #c1b5ce;" placement="bottom-start" width="200" trigger="click"
              :show-arrow="false">
              <template #reference>
                <span v-if="eventinfo.endtime != ''" style="padding:0 1px; color: var(--primary-font-color-2); ">{{
                  eventinfo.endtime }}</span>
                <span v-else style="margin: 0 20px;"></span>
              </template>
              <div style="display: flex; justify-content: center; align-items: center;" v-if="eventinfo.starttime != ''">
                <!-- <time-picker v-model="eventinfo.endtime"></time-picker> -->
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
      <el-button plain color="rgb(189, 101, 166)" style="width: 80px;">Delete</el-button>
    </div>

  </div>
</template>

<script>
import { useCalendarStore } from '../stores/store.js';
import { toRefs } from 'vue';

import { ElButton, ElPopover } from 'element-plus';

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
    };
  },
  components: {
    SvgIcon,
    RichtextEditor,
    ElButton,
    SmallCalendar,
    ElPopover,
    TimePicker,

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
        // date: '',
        // remark: '',
      },
      mdiCalendarPath: mdiCalendar,
      mdiClockTimeFourOutlinePath: mdiClockTimeFourOutline,
      smallCalendarVisiible: false,

    };
  },
  mounted() {
    this.eventinfo = this.events.find(event => event.id === this.eventinfoid) || {};
    console.log(this.eventinfo);
    this.dateToConfirm = this.eventinfo.date;

  },
  methods: {
    autoHeight() {
      const textarea = this.$refs.textarea;
      textarea.style.height = '';
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    formatDate(date) {
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
      const formatted = new Date(date).toLocaleDateString(undefined, options);
      return formatted;
    },
    handleDone() {
      this.showAddEventInfoVisible = false;
      setTimeout(() => {
        this.eventinfo.date = this.dateToConfirm;
      }, 100);
    },
  },
  computed: {
    formattedDate() {
      if (this.eventinfo && this.eventinfo.date) {
        return this.formatDate(this.eventinfo.date);
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