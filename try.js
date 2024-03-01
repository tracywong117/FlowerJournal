function DayNums(startDate, endDate) {
    // Parse the dates as JavaScript Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Calculate the difference in milliseconds
    const diffInMs = end - start;
  
    // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const diffInDays = diffInMs / (24 * 60 * 60 * 1000);
  
    // Return the difference in days
    return Math.ceil(diffInDays); // Use Math.ceil to round up to the next whole number
  }
  
  // Example usage:
  const eventinfo = {
    date: '2024-03-01',
    endDate: '2024-03-05'
  };
  
  const numDays = DayNums(eventinfo.date, eventinfo.endDate);
  console.log(numDays); // Output will be the number of days between the two dates