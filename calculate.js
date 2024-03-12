// events array
const events = [
    { id: 0, date: '2024-01-02', endDate: '2024-01-07' },
    { id: 1, date: '2024-01-03', endDate: '2024-01-07' },
    { id: 2, date: '2024-01-02', endDate: '2024-01-07' },
    { id: 3, date: '2024-01-01', endDate: '2024-01-07' },
    { id: 4, date: '2024-01-02', endDate: '2024-01-07' },
    { id: 5, date: '2024-01-05', endDate: '2024-01-07' },
    { id: 6, date: '2024-01-05', endDate: '2024-01-07' },
    { id: 7, date: '2024-01-03', endDate: '2024-01-07' },
    { id: 8, date: '2024-01-06', endDate: '2024-01-07' },
    { id: 9, date: '2024-01-08', endDate: '2024-01-07' },
];

// get the events rendered way in the calendar that allow multiple days for one event
function listEventsByDate(events) {
    const dateIndexMap = {};
    const nullPlaceRecord = {};
    const result = {};
    const signOfStart = '+';
    const startofweek = 0; // Sunday

    // Iterate through the events
    for (const event of events) {
        console.log("Adding event", event.id);
        const startDate = new Date(event.date);
        const endDate = new Date(event.endDate);

        const temp = [];

        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const dateString = date.toISOString().split('T')[0];

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
                    const dateStringTemp = date.toISOString().split('T')[0];
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
            console.log("Use null place", nullOKIndex);
            let isStart = true;
            for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                const dayofWeek = date.getDay();
                const durationInDays = (endDate - date) / (1000 * 60 * 60 * 24) + 1;
                // Sunday - Saturday : 0 - 6
                const dateString = date.toISOString().split('T')[0];
                var dayNumInWeek = Math.min(7 - dayofWeek, durationInDays);
                // console.log("7-dayofWeek", 7 - dayofWeek);
                // console.log("endDate - date + 1", durationInDays);
                // console.log("dayNumInWeek", dayNumInWeek);

                // Add the event to the correct place
                if (isStart) {
                    result[dateString].listed_event[nullOKIndex] = `${signOfStart}[${dayNumInWeek}]${event.id}`;
                    isStart = false;
                } else{
                    result[dateString].listed_event[nullOKIndex] = event.id;
                }

                if (dayofWeek === 6 && durationInDays > 1){
                    isStart = true;
                }

                // update the dateIndexMap (which is always the length of corresponding listed_event)
                dateIndexMap[dateString] = result[dateString].listed_event.length;

                // remember to delete the null place index from nullPlaceRecord
                console.log(nullPlaceRecord[dateString]);
                if (nullPlaceRecord[dateString]){
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
                const dateString = date.toISOString().split('T')[0];
                var dayNumInWeek = Math.min(7 - dayofWeek, durationInDays);
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
                    result[dateString].listed_event.push(`${signOfStart}[${dayNumInWeek}]${event.id}`);
                    isStart = false;
                } else { 
                    result[dateString].listed_event.push(event.id);
                }

                if (dayofWeek === 6 && durationInDays > 1){
                    isStart = true;
                }

                // update the dateIndexMap (which is always the length of corresponding listed_event)
                dateIndexMap[dateString] = result[dateString].listed_event.length;

            }
        }
    }

    return result;
}

console.time('executionTime');
// Example usage
const eventCalendar = listEventsByDate(events);
console.log(eventCalendar);
console.timeEnd('executionTime');