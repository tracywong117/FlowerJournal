<template>
    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;"
        class="unselectable">
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

        <div class="seven-grid">
            <div v-for="day in weekDayLabels" class="day-label unselectable"
                style="color: var(--primary-font-color-1); font-size: 14px;">
                {{ day }}
            </div>
        </div>
        <div class="monthlyCalendarLarge unselectable">
            <div v-for="week in calendarData" class="week unselectable">
                <div class="calendar-grid">
                    <div v-for="dayObj in week" class="day unselectable">
                        <div @dragover="allowDrop" @dragenter="dragEnter(Object.keys(dayObj)[0])"
                            @drop="drop(Object.keys(dayObj)[0])"
                            :class="{ 'hovered': hoveredField === Object.keys(dayObj)[0] }" style="height: 100%"
                            @dblclick="addNewEvent(Object.keys(dayObj)[0])">
                            <span class="calendar-day-select"
                                :class="{ 'current-day': isCurrentDay(Object.keys(dayObj)[0]), 'not-current-month': isNotInputMonth(Object.keys(dayObj)[0]) }"
                                @click="handleSelectDate(Object.keys(dayObj)[0])">
                                {{ Object.values(dayObj)[0] }}</span>
                            <div v-for="(eventinfo, dayEventIndex) in getEventsForDate(Object.keys(dayObj)[0]).slice(0, 2)"
                                :style="{
                'opacity': eventinfo === draggedItem ? '0.5' : '1',
                'transition': 'opacity 0.3s',
            }" style="position: relative;">

                                <div v-if="eventinfo !== null" :id="'resizableBar' + eventinfo.id"
                                    class="eventinfo-container background-highlight-1 ellipsis-truncate"
                                    :draggable="true" @dragstart="startDrag(eventinfo, $event);"
                                    @dragend="draggedItem = null" :style="{
                'width': getWidthFromDayNums(Object.keys(dayObj)[0], dayEventIndex),
            }" @click="handleOpenEventDialog(eventinfo)">
                                    <div>
                                        {{ eventinfo.name }}
                                    </div>
                                    <div class="resizable-bar left"></div>
                                    <!-- @mousedown="startLeftResize($event, div.id, div.row, div.col)" -->
                                    <div class="resizable-bar right"></div>
                                    <!-- @mousedown="startRightResize($event, eventinfo)" -->
                                </div>

                                <div v-if="eventinfo === null" class="eventinfo-container ellipsis-truncate"
                                    style="visibility: hidden;">
                                    XXX
                                </div>

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
                    </div>
                </div>
            </div>
        </div>
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
    name: 'Calendar',
    setup() {
        const calendarStore = useCalendarStore();

        const calendarState = toRefs(calendarStore);

        const getEventsForDate = (date) => {
            if (!calendarState.allEventRenderWay.value) {
                return [];
            } else {
                const offset = new Date(date).getTimezoneOffset();
                const tempdate = new Date(new Date(date).getTime() - (offset * 60 * 1000));
                const formattedDate = new Date(tempdate).toISOString().split('T')[0];

                const targetDate = calendarState.allEventRenderWay.value[formattedDate];
                if (targetDate) {
                    const targetEventIds = targetDate['listed_event'];
                    const toRender = [];
                    for (const id in targetEventIds) {
                        if (targetEventIds[id] && typeof targetEventIds[id] === 'string' && targetEventIds[id].startsWith('[')) {
                            toRender.push(targetEventIds[id].slice(3));
                        } else {
                            toRender.push(null);
                        }
                    }

                    const toReturn = toRender.map((item) => {
                        if (item !== null) {
                            return calendarState.events.value.find((eventinfo) => eventinfo.id === item) || null;
                        }
                        // If id is null, then return null
                        return null;
                    });
                    return toReturn;
                }

                return [];

                // Old way to show event on each day
                // return calendarState.events.value.filter((eventinfo) => {
                //     const eventDate = new Date(eventinfo.date);
                //     const providedDate = new Date(date);

                //     return eventDate.toLocaleDateString() === providedDate.toLocaleDateString();
                // });
            };
        };
        return {
            ...calendarState,
            getEventsForDate,
            renderAllEventInCalendar: calendarStore.renderAllEventInCalendar,
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
            resizingObj: null,
            // dragging: false
        };
    },
    beforeMount() {
        this.allEventRenderWay = this.renderAllEventInCalendar();
        console.log(this.allEventRenderWay);
    },
    watch: {

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
        DayNums(startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            const diffInMs = end - start;
            const diffInDays = diffInMs / (24 * 60 * 60 * 1000);

            return Math.ceil(diffInDays);
        },
        getWidthFromDayNums(startDate, dayEventIndex) {
            const offset = new Date(startDate).getTimezoneOffset();
            const tempdate = new Date(new Date(startDate).getTime() - (offset * 60 * 1000));
            const formattedDate = new Date(tempdate).toISOString().split('T')[0];
            const dayNums = parseInt(this.allEventRenderWay[formattedDate]['listed_event'][dayEventIndex][1]) - 1;

            const temp = dayNums - 5 * 2;
            return 'calc(' + (dayNums + 1) * 100 + '% + ' + temp + 'px)';
        },
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
        // drop the dragged item (event in calendar)
        drop(newIndex) {
            if (this.draggedItem) {
                if (this.draggedItem.index !== newIndex) {
                    console.log(`Item moved to index: ${newIndex}`);
                }

                // fix timezone issue (we don't store timezone)
                const offset = new Date(newIndex).getTimezoneOffset();
                const tempdate = new Date(new Date(newIndex).getTime() - (offset * 60 * 1000));
                const formattedDate = tempdate.toISOString().split('T')[0];
                console.log("Formatted date", formattedDate);

                const changeInMilliseconds = new Date(tempdate) - new Date(this.draggedItem.date);
                console.log("ChangeInDate", changeInMilliseconds);

                this.draggedItem.date = formattedDate;
                this.draggedItem.endDate = new Date(new Date(this.draggedItem.endDate).getTime() + changeInMilliseconds).toISOString().split('T')[0];

                this.allEventRenderWay = this.renderAllEventInCalendar();
                console.log(this.allEventRenderWay);
                this.saveEventData();

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
                endDate: formattedDate,
                name: "New Event",
                remark: '',
                category: '',
                allDay: true,
            });
            this.allEventRenderWay = this.renderAllEventInCalendar();
            console.log(this.allEventRenderWay);
            this.saveEventData();
        },
        startRightResize(e, eventinfo) {
            e.preventDefault()
            this.resizingObj = eventinfo
            this.moveRightFunction = event => this.moveRight(event, row, col)
            document.addEventListener('mousemove', this.moveRightFunction)
            document.addEventListener('mouseup', event => this.stopRightResize(event))
        },
        moveRight(e, eventinfo) {
            e.preventDefault()
            if (this.resizeingObj === null) return // If no div is being resized, do nothing

            const span = document.getElementById('resizableBar' + this.resizingIndex);
            const columnWidth = 100
            let maxColumn = 7 - eventinfo.date.getDay() + 1 // getDay: sunday 0, monday 1, ...
            let minWidth = columnWidth
            let maxWidth = maxColumn * columnWidth

            let width = e.clientX - span.offsetLeft
            let nearestMultiple = Math.round(width / columnWidth)
            // console.log(nearestMultiple)


            width = nearestMultiple * columnWidth
            if (width < minWidth) {
                width = minWidth
            } else if (width > maxWidth) {
                width = maxWidth
            }

            let height = e.clientY - span.offsetHeight
            let nearestMultipleHeight = Math.round(height / 120)
            console.log(nearestMultipleHeight)

            if (nearestMultipleHeight > 1) {
                nearestMultipleHeight = 1
            }
        },


    },
};
</script>

<style>
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


/* not work */
/* .drag-cursor {
    cursor: move;
    pointer-events: all;
  } */

.hovered {
    background-color: rgb(233, 244, 248);
}

/* calendar grid */
.seven-grid {
    display: grid;
    grid-template-columns: repeat(7, 12vw);
    gap: 0px;
    color: var(--primary-font-color-2);
    text-align: center;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 12vw);
    grid-auto-rows: 14vh;
    gap: 0px;
    color: var(--primary-font-color-2);
    text-align: right;
}

.monthlyCalendarLarge {
    border-top: 1px solid var(--primary-light-color-1);
    border-left: 1px solid var(--primary-light-color-1);
}

.day {
    border-bottom: 1px solid var(--primary-light-color-1);
    border-right: 1px solid var(--primary-light-color-1);
}

/* left right marin is 5px which is important for getWidthFromDayNums */
.eventinfo-container {
    text-align: left;
    font-size: 12px;
    display: block;
    padding: 0 10px;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
}

/* show 'n more' in calendar */
.more-eventinfo-container {
    text-align: center;
    font-size: 12px;
    display: block;
    padding: 0 10px;
    margin: 2px;
    cursor: pointer;
}

.ellipsis-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.background-highlight-1 {
    border: 0.5px solid var(--primary-light-color-1);
    background-color: var(--primary-light-color-1);
}

.background-highlight-1:hover {
    border: 0.5px solid var(--primary-light-sharp-color-1);
}


/* For resizable event bar*/
.resizable-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10px;
    cursor: col-resize;
}

.resizable-bar.left {
    left: 0;
}

.resizable-bar.right {
    right: 0;
}

/* event dialog related */
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
</style>