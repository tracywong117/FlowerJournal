import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    dt: new Date(),
    events: [
      {
        time: '10:00 AM - 12:00 PM',
        date: '2023-11-15',
        category: 'Meeting',
        remark: 'Discuss project updates',
        todo: ''
      },
      {
        time: '2:00 PM - 3:30 PM',
        date: '2023-11-18',
        category: 'Workshop',
        remark: 'Introduction to new tools',
        todo: 'Prepare presentation slides'
      },
    ]

  }),
  // getters: {
  //   getEventsForDate: (state) => (date) => {
  //     return state.events.filter((event) => event.date === date);
  //   }
  // },
  actions: {

  }
});