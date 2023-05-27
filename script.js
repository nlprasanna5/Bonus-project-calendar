// Get the required elements
const monthSelect = document.getElementById("month");
const yearInput = document.getElementById("year");
const calendarBody = document.querySelector("#calendar tbody");
const dateInput = document.getElementById("date-input");

// Add event listeners
monthSelect.addEventListener("change", generateCalendar);
yearInput.addEventListener("input", generateCalendar);
dateInput.addEventListener("keydown", handleDateInput);

// Generate the calendar on page load
generateCalendar();

// Generate calendar based on selected month and year
function generateCalendar() {
    // Clear existing calendar
    calendarBody.innerHTML = "";

    // Get selected month and year
    const month = parseInt(monthSelect.value) - 1; // JavaScript months are 0-based
    const year = yearInput.value !== "" ? parseInt(yearInput.value) : new Date().getFullYear();

    // Create a new date object for the selected month and year
    const date = new Date(year, month);

    // Get the number of days in the selected month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the day of the week for the first day of the month
    const startDay = date.getDay();
    console.log(startDay,"startday");
   

    // Generate calendar cells
    let dateCount = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            // Check if it's time to stop generating cells
            if (i === 0 && j < startDay) {
                // Empty cell before the start day of the month
                cell.textContent = "";
            } else if (dateCount > daysInMonth) {
                // Empty cell after the last day of the month
                cell.textContent = "";
            } else {
                // Cell with a date
                cell.textContent = dateCount;
                dateCount++;

                // Add click event listener to the cell
                cell.addEventListener("click", toggleCellBackground);
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}


// Handle date input event
function handleDateInput(event) {
    if (event.key === "Enter") {
        const date = parseInt(dateInput.value);
        if (!isNaN(date) && date >= 1 && date <= 31) {
            const cells = document.querySelectorAll("#calendar td");
            cells.forEach((cell) => {
                const cellDate = parseInt(cell.textContent);
                if (!isNaN(cellDate) && cellDate === date) {
                    cell.classList.toggle("green-background");
                }
            });
            dateInput.value = "";
        }
    }
}

// Toggle cell background color
function toggleCellBackground(event) {
    event.target.classList.toggle("green-background");
}




























