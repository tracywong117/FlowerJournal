<template>
  <div>
    <div style="padding: 20px;">
      <div style="display: flex; align-items: center; padding-bottom: 5px; justify-content: space-between;">
        <div style="display: flex; align-items: center;">
          <svg-icon type="mdi" :path="mdiCalendarPath" style="padding-right: 5px;"></svg-icon>
          <span>{{ eventinfo.date }}</span>
        </div>
        <div>
          <p>Time: {{ eventinfo.time }}</p>
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

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCalendar } from '@mdi/js';

import RichtextEditor from '../components/RichtextEditor.vue';

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

  },
  props: {
    eventinfoid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      eventinfo: {},
      mdiCalendarPath: mdiCalendar,
    };
  },
  mounted() {
    this.eventinfo = this.events.find(event => event.id === this.eventinfoid) || {};
  },
  methods: {
    autoHeight() {
      const textarea = this.$refs.textarea;
      textarea.style.height = '';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }
};
</script>

<style>
input {
  width: 100%;
  outline: 0;
  border-width: 0 0 1px;
  border-color: purple;
  background-color: var(--primary-background-color-1);
  font-family: Poppins, Playfair, Switzer, Inter, DM Sans, Mona Sans, Arial, sans-serif;
  font-size: 22px;
  resize: none;
}


</style>