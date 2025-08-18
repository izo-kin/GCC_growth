/*slider*/
  const track = document.getElementById('autoLine');
  const totalSlides = track.children.length;
  let slideIndex = 0;
  let slideTimer = null;

  function moveToSlide(i) {
    track.style.transform = `translateX(-${i * 100}%)`;
  }

  function startAutoSlide() {
    slideTimer = setInterval(() => {
      slideIndex = (slideIndex + 1) % totalSlides;
      moveToSlide(slideIndex);
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(slideTimer);
  }

  function toggleText(elem) {
    const info = elem.parentElement.querySelector('.infoBox');
    info.style.display = 'flex';
    stopAutoSlide(); // Pause auto-slide when reading
  }

  function closeText(closeBtn) {
    const info = closeBtn.parentElement;
    info.style.display = 'none';
    startAutoSlide(); // Resume auto-slide
  }

  // Start on page load
  startAutoSlide();

  /*live announcements*/
  const announcements = [
    "Welcome to Glory of Christ Church Kawaala!",
    "Transformation Class resumes this Saturday at 10am.",
    "Join the Encounter Class next Sunday — Registration now open.",
    "Festival of Life Season is on.",
    "Support Church Projects directly here — God bless your giving."
  ];

  let current = 0;
  let isPaused = false;
  let isReadingAll = false;
  const announcementEl = document.getElementById("announcement");
  const overlayEl = document.getElementById("listeningOverlay");

  function loopAnnouncements() {
    if (isPaused || isReadingAll) return;
    const currentText = announcements[current];
    typeWriterEffect(currentText, () => {
      current = (current + 1) % announcements.length;
      setTimeout(() => {
        if (!isPaused && !isReadingAll) loopAnnouncements();
      }, 1000);
    });
  }

  function typeWriterEffect(text, callback, i = 0) {
    if (i === 0) announcementEl.textContent = "";
    if (i < text.length) {
      announcementEl.textContent += text.charAt(i);
      setTimeout(() => typeWriterEffect(text, callback, i + 1), 110);
    } else {
      if (callback) callback();
    }
  }

  function startReadingAll() {
    isPaused = true;
    isReadingAll = true;
    overlayEl.classList.remove("d-none");
    announcementEl.textContent = "";
    speechSynthesis.cancel();
    readAllSequentially(0);
  }

  function readAllSequentially(index) {
    if (index >= announcements.length) {
      stopReadingAll();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(announcements[index]);
    utterance.onend = () => readAllSequentially(index + 1);
    speechSynthesis.speak(utterance);
  }

  function stopReadingAll() {
    speechSynthesis.cancel();
    isReadingAll = false;
    overlayEl.classList.add("d-none");
    isPaused = false;
    loopAnnouncements();
  }

  // Start the loop
  loopAnnouncements();

  /*classes*/
  function promptJoin(className) {
  const formFields = document.getElementById('formFields');
  formFields.innerHTML = '';

  if (className === 'Encounter Class') {
    formFields.innerHTML = `
      <p class="mt-4">Join Encounter Class starting on next Sunday.</p>
      <input type="text" class="form-control mb-2" placeholder="Full Name" required>
      <input type="text" class="form-control mb-2" placeholder="Lineage (or type 'No Lineage')" required>
      <input type="text" class="form-control mb-2" placeholder="Reason for joining" required>
      <input type="tel" class="form-control mb-2" placeholder="Valid Phone Number" required>
      <input type="tel" class="form-control mb-2" placeholder="WhatsApp Number" required>
    `;
  } else if (className === 'Discipleship Class') {
    formFields.innerHTML = `
      <p class="mt-4">Would you like to join physically or online?</p>
      <select class="form-select mb-2" onchange="handleDiscipleshipOption(this.value)">
        <option value="">Select option</option>
        <option value="Physical">Physical</option>
        <option value="Online">Online</option>
      </select>
      <div id="discipleshipExtra"></div>
    `;
  } else if (className === 'Continuing Class') {
    formFields.innerHTML = `
      <input type="tel" class="form-control mb-2" placeholder="Your Phone Number" required>
      <input type="text" class="form-control mb-2" placeholder="Class you stopped in" required>
      <input type="text" class="form-control mb-2" placeholder="Time that has passed since" required>
      <input type="text" class="form-control mb-2" placeholder="Reason to continue" required>
    `;
  }

  const modal = new bootstrap.Modal(document.getElementById('joinClassModal'));
  modal.show();
}

function handleDiscipleshipOption(option) {
  const container = document.getElementById('discipleshipExtra');
  if (option === 'Online') {
    container.innerHTML = `
      <input type="tel" class="form-control mb-2" placeholder="Your WhatsApp Number" required>
      <p class="text-success mt-4">A message will be sent to the admin’s WhatsApp for online discipleship.</p>
    `;
  } else if (option === 'Physical') {
    container.innerHTML = `
      <input type="text" class="form-control mb-2" placeholder="Full Name" required>
      <input type="tel" class="form-control mb-2" placeholder="Valid Phone Number" required>
      <input type="tel" class="form-control mb-2" placeholder="WhatsApp Number" required>
      <p class="text-info mt-4">Your request will be forwarded to the physical class admin via WhatsApp.</p>
    `;
  } else {
    container.innerHTML = '';
  }
}

function scrollCards(direction) {
  const carousel = document.getElementById('classCarousel');
  const scrollAmount = 320; // Adjust depending on card width
  carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

/*video testimonies*/
function loadVideo(container) {
    const video = container.querySelector('video');
    const mainVideo = document.getElementById('main-video');
    const caption = video.getAttribute('data-caption');

    mainVideo.src = video.src;
    mainVideo.play();fullBookList

    document.getElementById('video-caption').textContent = caption;
  }

  /*library
  const books = [
    { title: "Faith Foundations", image: "glor.png", link: "#" },
    { title: "Spirit Growth", image: "5.jpg", link: "#" },
    { title: "Prayer Guide", image: "glor.png", link: "#" },
    { title: "Holy Living", image: "5.jpg", link: "#" },
    { title: "Leadership Light", image: "glor.png", link: "#" },
    { title: "Wisdom Nuggets", image: "5.jpg", link: "#" },
    { title: "Praise & Worship", image: "glor.png", link: "#" },
    { title: "Church Vision", image: "5.jpg", link: "#" }
  ];

  const bookSlider = document.getElementById("bookSlider");
  const fullBookList = document.getElementById("fullBookList");
  const bookOverlay = document.getElementById("bookOverlay");
  const toggleBooksBtn = document.getElementById("toggleBooksBtn");

  function createBookCard(book) {
    const card = document.createElement("div");
    card.className = "book-card";

   card.innerHTML = `
  <img src="${book.image}" alt="${book.title}" style="width: 100%; height: auto; object-fit: cover;">
  <div class="book-card-body" style="width: 180px; background: #000000d9; height: 130px;">
    <h6>${book.title}</h6>
    <a href="${book.link}" target="_blank" class="btn btn-sm btn-success my-1">Read</a>
    <button class="btn btn-sm btn-secondary" disabled>Download</button>
  </div>
`;
    return card;
  }

  function renderSliderBooks() {
    bookSlider.innerHTML = "";
    books.forEach(book => {
      const card = createBookCard(book);
      bookSlider.appendChild(card);
    });
  }

  function renderFullBookList() {
  fullBookList.innerHTML = "";

  const row = document.createElement("div");
  row.className = "row";

  books.forEach(book => {
    const col = document.createElement("div");
    // 2 columns on small screens, 3 on md and above
    col.className = "col-6 col-md-3 d-flex justify-content-center mb-4";

    col.appendChild(createBookCard(book));
    row.appendChild(col);
  });

  fullBookList.appendChild(row);
}

  function toggleFullBookList() {
    bookOverlay.classList.toggle("d-none");
  }

  toggleBooksBtn.addEventListener("click", () => {
    renderFullBookList();
    toggleFullBookList();
  });

  // Book Slider Controls
  document.getElementById("prevBook").onclick = () => {
    bookSlider.scrollBy({ left: -200, behavior: "smooth" });
  };

  document.getElementById("nextBook").onclick = () => {
    bookSlider.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Auto reshuffle every 15 seconds
  setInterval(() => {
    books.push(books.shift()); // rotate array
    renderSliderBooks();
  }, 55000);

  // Initial render
  renderSliderBooks();*/

  /*bible quiz*/
  const questions = [
    { q: "What is the first book of the Bible?", a: "Genesis" },
    { q: "Who built the ark?", a: "Noah" },
    { q: "Name the mountain where Moses received the Ten Commandments.", a: "Mount Sinai" },
    { q: "Who betrayed Jesus?", a: "Judas" },
    { q: "Which prophet was swallowed by a fish?", a: "Jonah" },
    { q: "What did David use to defeat Goliath?", a: "Slingshot" },
    { q: "Who was the mother of Jesus?", a: "Mary" },
    { q: "Name the sea that parted for Moses.", a: "Red Sea" },
    { q: "How many disciples did Jesus have?", a: "12" },
    { q: "Who denied Jesus three times?", a: "Peter" }
  ];

  const nextFriday = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = (5 + 7 - day) % 7 || 7; 
    let friday = new Date(today);
    friday.setDate(today.getDate() + diff);
    friday.setHours(0,0,0,0);
    return friday;
  };

  const quizDuration = 120; // seconds
  const quizValidHours = 24;
  const adminWhatsappNumber = "256741306237";

  const preQuizDiv = document.getElementById("pre-quiz");
  const startBtn = document.getElementById("start-quiz-btn");
  const quizForm = document.getElementById("quiz-form");
  const quizQuestionsDiv = document.getElementById("quiz-questions");
  const submitBtn = quizForm.querySelector("button[type='submit']");
  const attemptTimerDiv = document.getElementById("attempt-timer");
  const lineageWarning = document.getElementById("lineage-warning");
  const postQuizMessage = document.getElementById("post-quiz-message");
  const quizCountdown = document.getElementById("quiz-countdown");
  const verseTodayDiv = document.getElementById("verse-today");
  const userDetailsDiv = document.getElementById("user-details"); // <-- wrapper for name, phone, lineage, etc.

  let timerInterval;
  let usedLineages = new Set(JSON.parse(localStorage.getItem('usedLineages') || '[]'));

  function shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function renderQuestions() {
    quizQuestionsDiv.innerHTML = "";
    let shuffled = [...questions];
    shuffle(shuffled);
    shuffled.forEach((q,i) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <label class='block font-semibold text-white mb-1'>${i+1}. ${q.q}</label>
        <input type='text' name='q${i}' required class='border p-2 w-full rounded' data-answer="${q.a}">
      `;
      quizQuestionsDiv.appendChild(div);
    });
  }

  function startTimer(seconds) {
    let timeLeft = seconds;
    attemptTimerDiv.textContent = `Time Remaining: ${formatTime(timeLeft)}`;
    timerInterval = setInterval(() => {
      timeLeft--;
      attemptTimerDiv.textContent = `Time Remaining: ${formatTime(timeLeft)}`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        attemptTimerDiv.textContent = "Time's up! Submitting quiz...";
        quizForm.requestSubmit();
      }
    }, 1000);
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2,"0")}`;
  }

  function startCountdown() {
    const now = new Date();
    const quizDay = nextFriday();
    const diffMs = quizDay - now;

    if(diffMs > 0) {
      const diffDays = Math.floor(diffMs / (1000*60*60*24));
      const diffHours = Math.floor((diffMs % (1000*60*60*24)) / (1000*60*60));
      quizCountdown.textContent = `Next Bible Quiz opens in ${diffDays} day(s) and ${diffHours} hour(s).`;
    } else {
      const quizCloseTime = new Date(quizDay.getTime() + quizValidHours * 60 * 60 * 1000);
      if(now < quizCloseTime) {
        quizCountdown.textContent = `Bible Quiz is OPEN today! You have 24 hours to participate.`;
      } else {
        quizCountdown.textContent = "Quiz Closed for this week. See you next Friday!";
        preQuizDiv.style.display = "none";
        quizForm.style.display = "none";
        postQuizMessage.textContent = "Quiz Closed for this week. Check back next Friday!";
      }
    }
  }

  function showVerseOfTheDay() {
    const verse = `"Study to shew thyself approved unto God..." – 2 Timothy 2:15 (KJV)`;
    const meaning = "This verse urges believers to diligently study the Word of God to be approved by Him and live a life pleasing to Him.";
    verseTodayDiv.innerHTML = `<p>${verse}</p><p style="font-size:0.9rem; margin-top:5px;">${meaning}</p>`;
  }

  function toggleFormInputs(disabled) {
    quizForm.querySelectorAll("input, select, button").forEach(el => {
      if(el !== startBtn) el.disabled = disabled;
    });
  }

  startBtn.addEventListener("click", () => {
    preQuizDiv.style.display = "none";
    quizForm.style.display = "block";
    submitBtn.style.display = "inline-block";
    toggleFormInputs(false);
    attemptTimerDiv.textContent = "";

    quizQuestionsDiv.innerHTML = "";
    lineageWarning.style.display = "none";
    postQuizMessage.textContent = "";

    quizQuestionsDiv.style.display = "none";
    submitBtn.disabled = true;

    quizForm.lineage.value = "";
  });

  quizForm.lineage.addEventListener("change", () => {
    const lineage = quizForm.lineage.value.trim();

    if(usedLineages.has(lineage)) {
      lineageWarning.style.display = "block";
      quizQuestionsDiv.style.display = "none";
      submitBtn.disabled = true;
      attemptTimerDiv.textContent = "";
      clearInterval(timerInterval);
      postQuizMessage.textContent = "A participant from this lineage has already submitted.";
    } else if(lineage !== "") {
      lineageWarning.style.display = "none";
      renderQuestions();
      quizQuestionsDiv.style.display = "block";
      submitBtn.disabled = false;
      postQuizMessage.textContent = "";
      startTimer(quizDuration);
    } else {
      lineageWarning.style.display = "none";
      quizQuestionsDiv.style.display = "none";
      submitBtn.disabled = true;
      attemptTimerDiv.textContent = "";
      clearInterval(timerInterval);
      postQuizMessage.textContent = "";
    }
  });

  quizForm.addEventListener("submit", e => {
    e.preventDefault();
    clearInterval(timerInterval);

    const data = new FormData(quizForm);
    const lineage = data.get("lineage").trim();
    const userWhatsapp = data.get("userWhatsapp").trim();

    if(usedLineages.has(lineage)) {
      alert("A participant from this lineage has already submitted.");
      return;
    }

    let score = 0;
    questions.forEach((q,i) => {
      const ans = data.get(`q${i}`)?.trim().toLowerCase();
      if(ans === q.a.toLowerCase()) score++;
    });

    usedLineages.add(lineage);
    localStorage.setItem("usedLineages", JSON.stringify([...usedLineages]));

    const adminSummary = 
      `Bible Quiz Submission (${new Date().toLocaleDateString()})\n` +
      `Name: ${data.get("name")}\n` +
      `Phone: ${data.get("phone")}\n` +
      `Lineage: ${lineage}\n` +
      `Fellowship Leader: ${data.get("leader")}\n` +
      `Leader Contact: ${data.get("leaderContact")}\n` +
      `Score: ${score}/10`;

    let userQuizSummary = `Your Bible Quiz Results:\nScore: ${score}/10\n\nQuestions & Your Answers:\n`;
    questions.forEach((q,i) => {
      const userAns = data.get(`q${i}`) || "[No Answer]";
      userQuizSummary += `${i+1}. ${q.q}\nYour answer: ${userAns}\nCorrect answer: ${q.a}\n\n`;
    });

    const adminURL = `https://wa.me/${adminWhatsappNumber}?text=${encodeURIComponent(adminSummary)}`;
    window.open(adminURL, '_blank');

    const cleanUserWhatsapp = userWhatsapp.replace(/\D/g, '');
    const userURL = `https://wa.me/${cleanUserWhatsapp}?text=${encodeURIComponent(userQuizSummary)}`;
    window.open(userURL, '_blank');

    toggleFormInputs(true);
    submitBtn.style.display = "none";
    
    // Hide user details and questions after submit
    userDetailsDiv.style.display = "none";
    quizQuestionsDiv.style.display = "none";

    attemptTimerDiv.textContent = "Thank you for participating! Results sent to your WhatsApp.";
    postQuizMessage.textContent = "Submission sent! Winners will be rewarded.";
  });

  window.onload = () => {
  const today = new Date();
  const day = today.getDay(); // 0=Sunday, 5=Friday

  startCountdown();
  showVerseOfTheDay();

  // Disable Start Quiz button if not Friday
  if (day !== 5) {
    startBtn.disabled = true;
    startBtn.title = "Quiz only opens on Friday";
  } else {
    // It's Friday, but check if quiz is still within valid hours
    const quizOpen = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const quizClose = new Date(quizOpen.getTime() + quizValidHours * 60 * 60 * 1000);

    if (today >= quizOpen && today <= quizClose) {
      startBtn.disabled = false;
      startBtn.title = "";
    } else {
      startBtn.disabled = true;
      startBtn.title = "Quiz closed for today";
    }
  }
};

/*projects*/
const projectSlider = document.getElementById("project-slider");
const sliderContainer = document.getElementById("slider-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

let currentSlide = 0;
let currentCategory = 'Ongoing';
let autoScrollInterval;

const projects = {
  Ongoing: [
    {
      title: "Church Roofing",
      status: "Ongoing",
      description: "Completing the main hall roofing for the new extension.",
      image: "gloryb.jpg",
      percent: 65,
      balance: "UGX 5,400,000"
    },
    {
      title: "Youth Center",
      status: "Ongoing",
      description: "Renovating the youth center for better learning space.",
      image: "mir.jpg",
      percent: 45,
      balance: "UGX 3,200,000"
    }
  ],
  Upcoming: [
    {
      title: "Mission Van",
      status: "Upcoming",
      description: "Purchase of a van to facilitate outreach missions.",
      image: "images/mission_van.jpg",
      percent: 0,
      balance: "UGX 25,000,000"
    }
  ],
  Completed: [
    {
      title: "Children’s Ministry Room",
      status: "Completed",
      description: "Successfully renovated the children’s worship area.",
      image: "images/children_room.jpg",
      percent: 100,
      balance: "UGX 0"
    }
  ]
};

function renderProjects() {
  const data = projects[currentCategory];
  projectSlider.innerHTML = '';

  data.forEach((project, i) => {
    const card = document.createElement("div");
    card.className = "project-card";
    if (i === currentSlide) card.classList.add("active");

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="img-fluid rounded mb-3" style="height: 150px; width: 400px; object-fit: cover;">
      <h4>${project.title}</h4>
      <p><strong>Status:</strong> ${project.status}</p>
      <p>${project.description}</p>
      <div class="progress mb-1">
        <div class="progress-bar bg-success" style="width: ${project.percent}%">${project.percent}%</div>
      </div>
      ${project.balance && project.percent < 100 ? `<p><strong>Balance:</strong> ${project.balance}</p>` : ''}
    `;
    card.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    projectSlider.appendChild(card);
  });

  updateTabStyle();
}

function updateSlide(direction) {
  const total = projects[currentCategory].length;
  currentSlide = (currentSlide + direction + total) % total;
  renderProjects();
}

function updateTabStyle() {
  ['btn-ongoing', 'btn-upcoming', 'btn-completed'].forEach(id => {
    document.getElementById(id).classList.remove('btn-primary', 'active');
    document.getElementById(id).classList.add('btn-outline-primary');
  });

  document.getElementById(`btn-${currentCategory.toLowerCase()}`).classList.add('btn-primary', 'active');
  document.getElementById(`btn-${currentCategory.toLowerCase()}`).classList.remove('btn-outline-primary');
}

function startAutoScroll() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = setInterval(() => {
    updateSlide(1);
  }, 5000);
}

// Pause auto-scroll on hover
sliderContainer.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
sliderContainer.addEventListener("mouseleave", startAutoScroll);

btnPrev.addEventListener("click", () => {
  updateSlide(-1);
  startAutoScroll();
});
btnNext.addEventListener("click", () => {
  updateSlide(1);
  startAutoScroll();
});

document.getElementById("btn-ongoing").addEventListener("click", () => {
  currentCategory = "Ongoing";
  currentSlide = 0;
  renderProjects();
  startAutoScroll();
});
document.getElementById("btn-upcoming").addEventListener("click", () => {
  currentCategory = "Upcoming";
  currentSlide = 0;
  renderProjects();
  startAutoScroll();
});
document.getElementById("btn-completed").addEventListener("click", () => {
  currentCategory = "Completed";
  currentSlide = 0;
  renderProjects();
  startAutoScroll();
});

// Initial render + scroll
renderProjects();
startAutoScroll();

/*support growth*/
  let amount = 0;

  function selectAmount(val) {
    amount = val;
    document.getElementById("selectedAmount").textContent = "UGX " + val.toLocaleString();
    document.getElementById("proceedBtn").disabled = false;
    document.getElementById("customAmount").value = "";
  }

  function selectCustomAmount() {
    const customVal = parseInt(document.getElementById("customAmount").value);
    if (!isNaN(customVal) && customVal > 0) {
      amount = customVal;
      document.getElementById("selectedAmount").textContent = "UGX " + customVal.toLocaleString();
      document.getElementById("proceedBtn").disabled = false;
    } else {
      document.getElementById("selectedAmount").textContent = "Invalid amount";
      document.getElementById("proceedBtn").disabled = true;
    }
  }

  function proceedToPayment() {
    if (amount <= 0) {
      alert("Please select a valid amount.");
      return;
    }

    // Sample Pesapal redirect (replace with your real integration)
    const redirectURL = `https://yourpesapalpaymenturl.com/pay?amount=${amount}`;
    window.location.href = redirectURL;
  }

  /*calendar*/
  const enrollments = {
    "2025-08-10": [
      { className: "Encounter Class", info: "New intake starting at 9AM" },
      { className: "Transformation Class", info: "Enrollment open all day" }
    ],
    "2025-08-15": [
      { className: "Discipleship Class", info: "Physical session enrollment" }
    ],
    "2025-08-20": [
      { className: "Membership Class", info: "Online enrollment available" }
    ],
    "2025-08-23": [
      { className: "Shepherd Class", info: "Enrollment deadline" }
    ]
  };

  const calendarMonthYear = document.getElementById('calendarMonthYear');
  const calendarBody = document.getElementById('calendarBody');
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');
  const enrollmentModal = new bootstrap.Modal(document.getElementById('enrollmentModal'));
  const modalDateElem = document.getElementById('modalDate');
  const enrollmentDetails = document.getElementById('enrollmentDetails');

  let currentDate = new Date();

  function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  calendarMonthYear.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const today = new Date();             // Get today's date
  today.setHours(0, 0, 0, 0);           // Remove time portion

  calendarBody.innerHTML = '';
  let row = document.createElement('tr');
  let dayCount = 0;

  for (let i = 0; i < startDay; i++) {
    row.appendChild(document.createElement('td'));
    dayCount++;
  }

  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement('td');
    const fullDate = new Date(year, month, day);
    const isoDate = fullDate.toISOString().split('T')[0];

    cell.textContent = day;
    cell.style.cursor = 'default';

    const isToday = fullDate.getTime() === today.getTime();
    if (isToday) {
      cell.classList.add('bg-primary', 'text-white'); // Highlight style
    }

    if (enrollments[isoDate]) {
      cell.classList.add('table-primary', 'fw-bold', 'enroll-date');
      cell.style.cursor = 'pointer';
      cell.title = enrollments[isoDate].map(e => `${e.className}: ${e.info}`).join('\n');
      cell.addEventListener('click', () => showEnrollmentDetails(isoDate));
    }

    row.appendChild(cell);
    dayCount++;

    if (dayCount % 7 === 0 || day === totalDays) {
      while (dayCount % 7 !== 0) {
        row.appendChild(document.createElement('td'));
        dayCount++;
      }
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }
  }
}

  function showEnrollmentDetails(dateStr) {
    modalDateElem.textContent = new Date(dateStr).toLocaleDateString();
    const classes = enrollments[dateStr];

    if (!classes) {
      enrollmentDetails.innerHTML = '<p>No enrollments for this day.</p>';
    } else {
      enrollmentDetails.innerHTML = classes.map(c =>
        `<div><strong>${c.className}</strong><p>${c.info}</p></div>`
      ).join('<hr>');
    }

    enrollmentModal.show();
  }

  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);

  /*share link*/
  function copyLink() {
    const url = "https://yourchurchsite.com";
    navigator.clipboard.writeText(url).then(() => {
      document.getElementById("copyStatus").style.display = "block";
      setTimeout(() => {
        document.getElementById("copyStatus").style.display = "none";
      }, 3000);
    });
  }

  /*bottom navigation*/
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.bottom-nav .nav-icon');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });


/*announcement, encounter form, load video*/
function speakText() {
    const text = document.getElementById('announcement-text').innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }

  function showEncounterForm() {
    document.getElementById('encounter-form').style.display = 'block';
  }

  function sendToWhatsApp() {
    const name = document.getElementById('name').value;
    const lineage = document.getElementById('lineage').value;
    const reason = document.getElementById('reason').value;
    const phone = document.getElementById('phone').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const message = `I want to join Encounter Class.\nName: ${name}\nLineage: ${lineage}\nReason: ${reason}\nPhone: ${phone}\nWhatsApp: ${whatsapp}`;
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/256XXXXXXXXX?text=${encodedMsg}`);
    return false;
  }

  function loadVideo(src) {
    document.getElementById('main-video').src = src;
  }

  /*end of script.js */
