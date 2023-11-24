<template>
  <div>
    <div style="padding: 20px;">
      <div
        style="display: flex; align-items: center; padding-bottom: 5px; justify-content: space-between; padding-bottom: 10px;">
        <div style="display: flex; align-items: center; color: var(--primary-font-color-2);" class="text-hover">

          <el-popover placement="bottom-start" width="300" trigger="click">
            <template #reference>
              <svg-icon type="mdi" :path="mdiCalendarPath" style="padding-right: 5px;" width="20" height="20"></svg-icon>
              <span style="color: var(--primary-font-color-2);">{{ formattedDate }}</span>
            </template>
            <small-calendar v-if="eventinfo && eventinfo.date" :date-selected="eventinfo.date"></small-calendar>
          </el-popover>

        </div>
        <div style="display: flex; align-items: center;" class="text-hover">
          <svg-icon type="mdi" :path="mdiClockTimeFourOutlinePath" width="20" height="20"></svg-icon>
          <span v-if="eventinfo.time != ''" style="padding-left: 5px; color: var(--primary-font-color-2);">{{
            eventinfo.time }}</span>
        </div>
      </div>
      <input ref="input" type="text" v-model="eventinfo.category" />
      <RichtextEditor></RichtextEditor>
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
        date: '',
      },
      mdiCalendarPath: mdiCalendar,
      mdiClockTimeFourOutlinePath: mdiClockTimeFourOutline,
      smallCalendarVisiible: false,

    };
  },
  mounted() {
    this.eventinfo = this.events.find(event => event.id === this.eventinfoid) || {};
    console.log(this.eventinfo);
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
    }
  },
  computed: {
    formattedDate() {
      if (this.eventinfo && this.eventinfo.date) {
        return this.formatDate(this.eventinfo.date);
      }
      return '';
    }
  },
};
</script>

<style>
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