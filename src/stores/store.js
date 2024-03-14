import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    dt: new Date(),
    events: [
      // {
      //   id: 1,
      //   starttime: '10:00 AM',
      //   endtime: '12:00 PM',
      //   date: '2024-02-15',
      //   endDate: '2024-02-15',
      //   name: 'Meeting',
      //   remark: '',
      //   category: '',
      //   allDay: false,
      // },
      // {
      //   id: 2,
      //   starttime: '2:00 PM',
      //   endtime: '3:30 PM',
      //   date: '2024-02-18',
      //   endDate: '2024-02-18',
      //   name: 'Workshop',
      //   remark: '<h1>This is header h1.</h1> <h2>This is header h2.</h2>',
      //   category: '',
      //   allDay: false,
      // },
      // {
      //   id: 3,
      //   starttime: '',
      //   endtime: '',
      //   date: '2024-02-01',
      //   endDate: '2024-02-01',
      //   name: 'Workshop',
      //   remark: '<h1>This is header h1.</h1> <h2>This is header h2.</h2>',
      //   category: '',
      //   allDay: true,
      // },
      // {
      //   id: 4,
      //   starttime: '',
      //   endtime: '',
      //   date: '2024-02-28',
      //   endDate: '2024-03-01',
      //   name: 'Leisure',
      //   remark: '<h1>This is header h1.</h1> <h2>This is header h2.</h2>',
      //   category: '',
      //   allDay: true,
      // },
    ],
    showEventDialog: false,
    showEventId: null,
    dateToConfirm: '',
    endDateToConfirm: '',
    allEventRenderWay: null,
  }),

  actions: {
    saveEventData() {
      console.log('saveEventData');
      console.log(this.events);
      localStorage.setItem('eventData', JSON.stringify(this.events));
    },
    loadEventData() {
      const storedEventData = localStorage.getItem('eventData');
      if (storedEventData) {
        this.events = JSON.parse(storedEventData);
        console.log(this.events);
      }
    },
    renderAllEventInCalendar() {
      const allEvents = this.events;
      const dateIndexMap = {};
      const nullPlaceRecord = {};
      const result = {};
      const startofweek = 0; // Sunday

      // Iterate through the events
      for (const event of allEvents) {
        // console.log("Adding event", event.id);
        const startDate = new Date(event.date);
        const endDate = new Date(event.endDate);

        const temp = [];

        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
          const offset = new Date(date).getTimezoneOffset();
          const tempdate = new Date(new Date(date).getTime() - (offset * 60 * 1000));
          const dateString = tempdate.toISOString().split('T')[0];

          // initialize
          if (!result[dateString]) {
            result[dateString] = { listed_event: [] };
          }

          if (typeof dateIndexMap[dateString] === 'undefined') {
            dateIndexMap[dateString] = 0;
          }

          temp.push(dateIndexMap[dateString]);

        }

        let toCheck = nullPlaceRecord[startDate.toISOString().split('T')[0]];
        let nullOKIndex = null;
        if (toCheck) {
          for (let i = 0; i < toCheck.length; i++) {
            nullOKIndex = toCheck[i];
            // if every place in this index is null or empty 
            for (let dateTemp = new Date(startDate) + 1; dateTemp <= endDate; dateTemp.setDate(date.getDate() + 1)) {
              const offset = new Date(date).getTimezoneOffset();
              const tempdate = new Date(new Date(date).getTime() - (offset * 60 * 1000));
              const dateStringTemp = tempdate.toISOString().split('T')[0];
              // no null place or not empty place
              if (!nullPlaceRecord[dateStringTemp].includes(toCheck[i]) && nullPlaceRecord.slice(-1) > toCheck[i]) {
                nullOKIndex = null;
                break;
              }
            }
            // get the first null or empty place index so break 
            if (nullOKIndex !== null) {
              break;
            }
          }
        }

        // Really add the event to the result at correct index
        // Use null or empty place if possible
        if (nullOKIndex !== null) {
          // console.log("Use null place", nullOKIndex);
          let isStart = true;
          for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const dayofWeek = date.getDay();
            const durationInDays = (endDate - date) / (1000 * 60 * 60 * 24) + 1;
            // Sunday - Saturday : 0 - 6

            const offset = new Date(date).getTimezoneOffset();
            const tempdate = new Date(new Date(date).getTime() - (offset * 60 * 1000));
            const dateString = tempdate.toISOString().split('T')[0];

            var dayNumInWeek = Math.min(7 - dayofWeek, durationInDays);
            // console.log("dateString", dateString);
            // console.log("7-dayofWeek", 7 - dayofWeek);
            // console.log("endDate - date + 1", durationInDays);
            // console.log("dayNumInWeek", dayNumInWeek);

            // Add the event to the correct place
            if (isStart) {
              result[dateString].listed_event[nullOKIndex] = `[${dayNumInWeek}]${event.id}`;
              isStart = false;
            } else {
              result[dateString].listed_event[nullOKIndex] = `${event.id}`;
            }

            if (dayofWeek === 6 && durationInDays > 1) {
              isStart = true;
            }

            // update the dateIndexMap (which is always the length of corresponding listed_event)
            dateIndexMap[dateString] = result[dateString].listed_event.length;

            // remember to delete the null place index from nullPlaceRecord
            // console.log(nullPlaceRecord[dateString]);
            if (nullPlaceRecord[dateString]) {
              const indexToDelete = nullPlaceRecord[dateString].indexOf(nullOKIndex);
              if (indexToDelete > -1) {
                nullPlaceRecord[dateString].splice(indexToDelete, 1);
              }
            }
          }

          // Add the event to the result at the first possible vertical index
        } else {
          let maxIndex = Math.max(...temp);
          let isStart = true;
          for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const dayofWeek = date.getDay();
            const durationInDays = (endDate - date) / (1000 * 60 * 60 * 24) + 1;
            // Sunday - Saturday : 0 - 6
            const offset = new Date(date).getTimezoneOffset();
            const tempdate = new Date(new Date(date).getTime() - (offset * 60 * 1000));
            const dateString = tempdate.toISOString().split('T')[0];
            var dayNumInWeek = Math.min(7 - dayofWeek, durationInDays);
            // console.log("dateString", dateString);
            // console.log("7-dayofWeek", 7 - dayofWeek);
            // console.log("endDate - date + 1", durationInDays);
            // console.log("dayNumInWeek", dayNumInWeek);

            // Add null place 
            const emptyPlaceToAdd = maxIndex - dateIndexMap[dateString];
            for (let i = 0; i < emptyPlaceToAdd; i++) {
              result[dateString].listed_event.push(null);

              if (!nullPlaceRecord[dateString]) {
                nullPlaceRecord[dateString] = [];
              }
              nullPlaceRecord[dateString].push(result[dateString].listed_event.length - 1);
            }

            // Add the event to the correct place
            if (isStart) {
              // result[dateString].listed_event.push(`${signOfStart}${event.id}`);
              result[dateString].listed_event.push(`[${dayNumInWeek}]${event.id}`);
              isStart = false;
            } else {
              result[dateString].listed_event.push(`${event.id}`);
            }

            if (dayofWeek === 6 && durationInDays > 1) {
              isStart = true;
            }

            // update the dateIndexMap (which is always the length of corresponding listed_event)
            dateIndexMap[dateString] = result[dateString].listed_event.length;

          }
        }
      }

      return result;
    },
  }
});