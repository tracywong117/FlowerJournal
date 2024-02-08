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
        date: '2024-02-15',
        name: 'Meeting',
        remark: '',
        category: '',
      },
      {
        id: 2, 
        time: '2:00 PM - 3:30 PM',
        starttime: '2:00 PM',
        endtime: '3:30 PM',
        date: '2024-02-18',
        name: 'Workshop',
        remark: '<h1>This is header h1.</h1> <h2>This is header h2.</h2>',
        category: '',
      },
      {
        id: 3, 
        time: '',
        starttime: '',
        endtime: '',
        date: '2024-02-01',
        name: 'Workshop',
        remark: '<h1>This is header h1.</h1> <h2>This is header h2.</h2>',
        category: '',
      },
      {
        id: 4, 
        time: '',
        starttime: '',
        endtime: '',
        date: '2024-02-28',
        name: 'Leisure',
        remark: '<h1>This is header h1.</h1> <h2>This is header h2.</h2>',
        category: '',
      },
    ],
    showEventDialog: false,
    showEventId: null,
    showAddEventInfoVisible: false,
    // showAddEventInfoRef: null,
    // currentShowAddEventInfoId: null,
    dateToConfirm: '',
  }),

  actions: {
    //
  }
});