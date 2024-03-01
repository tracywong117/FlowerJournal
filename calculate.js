// events array
const events = [
    { id: 0, start_date: '2024-01-02', end_date: '2024-01-03' },
    { id: 1, start_date: '2024-01-03', end_date: '2024-01-04' },
    { id: 2, start_date: '2024-01-02', end_date: '2024-01-02' },
    { id: 3, start_date: '2024-01-01', end_date: '2024-01-03' },
    { id: 4, start_date: '2024-01-02', end_date: '2024-01-06' },
    { id: 5, start_date: '2024-01-05', end_date: '2024-01-06' },
    { id: 6, start_date: '2024-01-05', end_date: '2024-01-06' },
    { id: 7, start_date: '2024-01-03', end_date: '2024-01-03' },
    { id: 8, start_date: '2024-01-07', end_date: '2024-01-08' },
    { id: 9, start_date: '2024-01-08', end_date: '2024-01-09' },
];

// get the events rendered way in the calendar that allow multiple days for one event
function listEventsByDate(events) {
    const dateIndexMap = {};
    const nullPlaceRecord = {};
    const result = {};
    const signOfStart = '+';

    // Iterate through the events
    for (const event of events) {
        console.log("Adding event", event.id);
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);

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
                const dateString = date.toISOString().split('T')[0];

                // Add the event to the correct place
                if (isStart) {
                    result[dateString].listed_event[nullOKIndex] = `${signOfStart}${event.id}`;
                    isStart = false;
                } else{
                    result[dateString].listed_event[nullOKIndex] = event.id;
                }

                // update the dateIndexMap (which is always the length of corresponding listed_event)
                dateIndexMap[dateString] = result[dateString].listed_event.length;

                // remember to delete the null place index from nullPlaceRecord
                const indexToDelete = nullPlaceRecord[dateString].indexOf(nullOKIndex);
                if (indexToDelete > -1) {
                    nullPlaceRecord[dateString].splice(indexToDelete, 1);
                }
            }

            // Add the event to the result at the first possible vertical index
        } else {
            let maxIndex = Math.max(...temp);
            let isStart = true;
            for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                const dateString = date.toISOString().split('T')[0];

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
                    result[dateString].listed_event.push(`${signOfStart}${event.id}`);
                    isStart = false;
                } else { 
                    result[dateString].listed_event.push(event.id);
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