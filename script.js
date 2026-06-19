// EDIT YOUR EVENTS HERE.
// Visitors can see the events, but they cannot change them from the website.
// Format: "YYYY-MM-DD": "Event Name"

const bookedEvents = {
  "2026-06-06": "Private Event",
  "2026-06-13": "Wedding",
  "2026-06-20": "Birthday Party",
  "2026-06-27": "Reunion"
};

const monthTitle = document.getElementById("monthTitle");
const calendarGrid = document.getElementById("calendarGrid");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const bookButton = document.getElementById("bookButton");
const modal = document.getElementById("bookingModal");
const closeModal = document.getElementById("closeModal");

let currentDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthTitle.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  calendarGrid.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {
    const box = document.createElement("div");
    box.className = "day";

    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    box.innerHTML = `<div class="date-number">${day}</div>`;

    if (bookedEvents[dateKey]) {
      const event = document.createElement("div");
      event.className = "event";
      event.textContent = bookedEvents[dateKey];
      box.appendChild(event);
    }

    calendarGrid.appendChild(box);
  }
}

prevMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

bookButton.addEventListener("click", () => {
  modal.classList.add("show");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

renderCalendar();
