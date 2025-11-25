// ---------- SCREEN 2 DOTS SCROLL ANIMATION ----------
const screen2 = document.getElementById('screen2');
const dots = screen2?.querySelector('.dots');

if (dots) {
  dots.style.animationPlayState = "paused";

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dots.style.animationPlayState = "running";
        dots.classList.add("active");
      } else {
        dots.style.animationPlayState = "paused";
        dots.classList.remove("active");
      }
    });
  }, { threshold: 0.2 });

  observer.observe(dots);
}

// ---------- SCREEN 3, 4, 5 FUNCTIONALITY ----------
const screen3 = document.getElementById('screen3');
const screen4 = document.getElementById('screen4');
const screen5 = document.getElementById('screen5');

const selectedCount = screen3.querySelector('#selected-count'); // Screen 3 counter
const seats = screen3.querySelectorAll('.seat-card');

// Screen 2 displays
const secDisplay = document.getElementById('sec-display');
const rowDisplay = document.getElementById('row-display');
const seatDisplay = document.getElementById('seat-display');

function updateScreen4Count() {
  const selectedSeats = screen3.querySelectorAll('.seat-card.selected').length;
  const ticketDetails = screen4.querySelector('.ticket-details');
  const submitBtn = screen4.querySelector('.submit-btn');

  ticketDetails.innerHTML = `<br />${selectedSeats} Tickets Selected<br />`;
  submitBtn.textContent = `TRANSFER ${selectedSeats} TICKETS`;
}

seats.forEach(seat => {
  seat.addEventListener('click', () => {
    // Toggle seat selection
    seat.classList.toggle('selected');

    // Update Screen 3 selected count
    const count = screen3.querySelectorAll('.seat-card.selected').length;
    selectedCount.textContent = `${count} Selected`;

    // Update Screen 2 SEC / ROW / SEAT
    secDisplay.textContent = seat.dataset.sec || '115';
    rowDisplay.textContent = seat.dataset.row || '17';
    seatDisplay.textContent = seat.dataset.seat || seat.textContent;

    // Update Screen 4 live
    updateScreen4Count();
  });
});

// Show Screen 3
document.querySelectorAll('.transfer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    screen3.classList.add('show');
  });
});

// Navigate from Screen 3 -> 4
const transferLink = screen3.querySelector('.transfer-link');
transferLink.addEventListener('click', (e) => {
  e.preventDefault();
  screen3.classList.remove('show');
  screen4.classList.add('show');

  updateScreen4Count(); // Ensure correct count
});

// Navigate back from Screen 4 -> 3
screen4.querySelector('.back-btn').addEventListener('click', (e) => {
  e.preventDefault();
  screen4.classList.remove('show');
  screen3.classList.add('show');
});

// Show Screen 5
document.querySelectorAll('.view-ticket').forEach(btn => {
  btn.addEventListener('click', () => {
    screen5.classList.add('show');
  });
});

// Close screens
screen3.querySelector('.fa-times')?.addEventListener('click', () => {
  screen3.classList.remove('show');
});

screen5.querySelector('.fa-times').addEventListener('click', () => {
  screen5.classList.remove('show');
});
