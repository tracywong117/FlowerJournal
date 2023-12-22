import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    dt: new Date(),
    events: [
      { 
        id: 1, 
        time: '10:00 AM - 12:00 PM',
        starttime: '10:00 AM',
        endtime: '12:00 PM',
        date: '2023-11-15',
        name: 'Meeting',
        remark: '',
        category: '',
      },
      {
        id: 2, 
        time: '2:00 PM - 3:30 PM',
        starttime: '2:00 PM',
        endtime: '3:30 PM',
        date: '2023-11-18',
        name: 'Workshop',
        remark: '<h1>This is header h1.</h1> <h2>This is header h2.</h2>',
        category: '',
      },
      {
        id: 3, 
        time: '',
        starttime: '',
        endtime: '',
        date: '2023-11-18',
        name: 'Workshop',
        remark: '<h1>This is header h1.</h1> <h2>This is header h2.</h2>',
        category: '',
      },
      {
        id: 4, 
        time: '',
        starttime: '',
        endtime: '',
        date: '2023-11-18',
        name: 'Leisure',
        remark: '<h1>This is header h1.</h1> <h2>This is header h2.</h2>',
        category: '',
      },
    ],
    showAddEventInfoVisible: false,
    showAddEventInfoRef: null,
    currentShowAddEventInfoId: null,
    dateToConfirm: '',
    // eventViewVisible: false,
    // eventPopoverVisible: false,
    // calendarEventRef: null,
  }),

  actions: {
    //
  }
});