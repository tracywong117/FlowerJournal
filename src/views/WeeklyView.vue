<template>
    <table class="weekly-schedule">
        <thead>
            <tr>
                <th></th>
                <th v-for="day in days" :key="day">{{ day }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="timeRange in timeRanges" :key="timeRange">
                <td class="time-range">{{ timeRange }}</td>
                <td v-for="day in days" :key="day" class="event-cell">
                    <div v-for="event in getEvents(day, timeRange)" :key="event.id" class="event">
                        <div class="event-title">{{ event.title }}</div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>
export default {
    data() {
        return {
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            timeRanges: [
                '12:00am - 1:00am', '1:00am - 2:00am', '2:00am - 3:00am', '3:00am - 4:00am', '4:00am - 5:00am',
                '5:00am - 6:00am', '6:00am - 7:00am', '7:00am - 8:00am', '8:00am - 9:00am', '9:00am - 10:00am',
                '10:00am - 11:00am', '11:00am - 12:00pm', '12:00pm - 1:00pm', '1:00pm - 2:00pm', '2:00pm - 3:00pm',
                '3:00pm - 4:00pm', '4:00pm - 5:00pm', '5:00pm - 6:00pm', '6:00pm - 7:00pm', '7:00pm - 8:00pm',
                '8:00pm - 9:00pm', '9:00pm - 10:00pm', '10:00pm - 11:00pm', '11:00pm - 12:00am'
            ],
            events_trial: [
                { id: 1, day: 'Monday', startTime: '9:00am', endTime: '10:30am', title: 'Meeting' },
                { id: 2, day: 'Tuesday', startTime: '1:00pm', endTime: '2:30pm', title: 'Lunch' },
                { id: 3, day: 'Wednesday', startTime: '3:00pm', endTime: '4:30pm', title: 'Presentation' }
                // Add more events_trial as needed
            ]
        };
    },
    methods: {
        getEvents(day, timeRange) {
            return this.events_trial.filter(
                event =>
                    event.day === day &&
                    (this.isTimeInRange(event.startTime, timeRange) ||
                    this.isTimeInRange(event.endTime, timeRange))
            );
        },
        isTimeInRange(time, range) {
            const [start, end] = range.split(' - ');
            const startTime = this.convertTimeToNumber(time);
            const startRange = this.convertTimeToNumber(start);
            const endRange = this.convertTimeToNumber(end);
            return startTime >= startRange && startTime <= endRange;
        },
        convertTimeToNumber(time) {
            const [hour, minute, meridiem] = time.match(/(\d+):(\d+)(am|pm)/i).slice(1);
            let hourNum = parseInt(hour, 10);
            const minuteNum = parseInt(minute, 10);
            if (meridiem.toLowerCase() === 'pm' && hourNum < 12) {
                hourNum += 12;
            }
            if (meridiem.toLowerCase() === 'am' && hourNum === 12) {
                hourNum = 0;
            }
            console.log(hourNum * 100 + minuteNum);
            return hourNum * 100 + minuteNum;
        }
    }
};
</script>
  
<style>
.weekly-schedule {
    width: 100%;
    border-collapse: collapse;
}

.weekly-schedule th,
.weekly-schedule td {
    padding: 10px;
    /* border: 1px solid #ccc; */
}

.time-range {
    font-weight: bold;
}

.event-cell {
    position: relative;
}

.event {
    padding: 5px;
}

.event-title {
    margin-top: 5px;
}
</style>