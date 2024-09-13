// Function to parse and validate the date
const parseDate = (dateString) => {
  let date;
  
  // Check if dateString is a number (Unix timestamp)
  if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString)); // Convert to integer for Unix timestamps
  } else {
    date = new Date(dateString); // Handle standard date strings
  }
  
  return date;
};

// Handle root API request for the current date
app.get("/api/", (req, res) => {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  });
});

// Handle API request with a specific date
app.get("/api/:date", (req, res) => {
  const dateString = req.params.date;
  const date = parseDate(dateString);

  // Handle invalid date scenario
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Respond with both Unix and UTC formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});
