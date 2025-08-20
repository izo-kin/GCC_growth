/* nav toggle*/
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
const overlay = document.getElementById("overlay");

function openMobileNav() {
  mobileNav.style.transform = "translateX(0)";
  overlay.style.display = "block";
}

function closeMobileNav() {
  mobileNav.style.transform = "translateX(-100%)";
  overlay.style.display = "none";
}

navToggle.addEventListener("click", openMobileNav);
overlay.addEventListener("click", closeMobileNav);

// Close menu on link click
mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMobileNav);
});

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
    "Discipleship evanglism class intake resumes",
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

  /*recorded video sessions*/
  document.addEventListener("DOMContentLoaded", () => {
  const videoData = [
    // Add your videos here with class, title, teacher, whatsapp, date, profile
    {id:1,className:"Daniel",title:"Advanced Bible Study",teacher:"John Doe",whatsapp:"256701234567",video:"bil.mp4",profile:"tich.png",date:"19 Aug 2025"},
    {id:2,className:"Moses",title:"Faith and Obedience",teacher:"Mary Jane",whatsapp:"256701234568",video:"bil.mp4",profile:"tich.png",date:"18 Aug 2025"},
    {id:3,className:"Esther",title:"Prayer and Devotion",teacher:"Peter Smith",whatsapp:"256701234569",video:"bil.mp4",profile:"tich.png",date:"17 Aug 2025"},
    // Add more as needed
  ];

  const videoContainer = document.getElementById("videoContainer");
  const pagination = document.getElementById("pagination");
  const searchInput = document.getElementById("videoSearch");
  const classTabs = document.querySelectorAll('#classTabs .nav-link');

  let filteredVideos = [...videoData];
  const videosPerPage = 3;
  let currentPage = 1;

  function renderVideos() {
    videoContainer.innerHTML = "";
    const start = (currentPage-1)*videosPerPage;
    const end = start + videosPerPage;
    const pageVideos = filteredVideos.slice(start,end);

    pageVideos.forEach(video => {
      const card = document.createElement('div');
      card.className = "col-12 col-md-6 col-lg-4 video-card";
      card.dataset.videoId = video.id;
      card.dataset.teacher = video.teacher;
      card.dataset.whatsapp = video.whatsapp;
      card.dataset.title = video.title;
      card.dataset.class = video.className;
      card.innerHTML = `
        <div class="card shadow-sm hover-card h-100">
          <video class="card-img-top w-100" controls>
            <source src="${video.video}" type="video/mp4">
          </video>
          <div class="card-body">
            <h5 class="card-title">Class Title: ${video.title}</h5>
            <div class="d-flex align-items-center mb-2">
              <img src="${video.profile}" class="rounded-circle me-2" style="width:50px;height:50px;">
              <div>
                <p class="mb-0"><strong>Teacher:</strong> ${video.teacher}</p>
                <small class="text-muted">Uploaded: ${video.date} | Class: ${video.className}</small>
                <div class="teacher-status mt-1">
                  <span class="status-dot bg-offline"></span>
                  <small class="status-text">Offline</small>
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-success btn-sm mb-2 w-100 whatsapp-btn">Ask a Question via WhatsApp</a>
            <div class="comments-section mt-3">
              <h6>Comments</h6>
              <ul class="list-group mb-2 comments-list"></ul>
              <button class="btn btn-link p-0 mb-2 view-more-btn" style="display:none;">View More</button>
              <div class="input-group">
                <input type="text" class="form-control comment-input" placeholder="Write a comment...">
                <button class="btn btn-primary post-btn">Post</button>
              </div>
            </div>
          </div>
        </div>
      `;
      videoContainer.appendChild(card);
    });

    setupVideoCards();
    renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(filteredVideos.length / videosPerPage);
    for(let i=1;i<=pageCount;i++){
      const li = document.createElement('li');
      li.className = `page-item ${i===currentPage?'active':''}`;
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener('click', e=>{
        e.preventDefault();
        currentPage=i;
        renderVideos();
      });
      pagination.appendChild(li);
    }
  }

  // Search
  searchInput.addEventListener('input', e=>{
    const term = e.target.value.toLowerCase();
    filteredVideos = videoData.filter(v=>{
      return v.title.toLowerCase().includes(term) || v.teacher.toLowerCase().includes(term);
    });
    currentPage = 1;
    renderVideos();
  });

  // Class Tabs
  classTabs.forEach(tab=>{
    tab.addEventListener('click', e=>{
      e.preventDefault();
      classTabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const cls = tab.dataset.class;
      filteredVideos = cls==='All'? [...videoData] : videoData.filter(v=>v.className===cls);
      currentPage = 1;
      renderVideos();
    });
  });

  // Setup each card: comments, WhatsApp, teacher status
  function setupVideoCards() {
    const cards = document.querySelectorAll('.video-card');
    cards.forEach(card=>{
      const videoId = card.dataset.videoId;
      const teacher = card.dataset.teacher;
      const whatsappNumber = card.dataset.whatsapp;
      const title = card.dataset.title;
      const whatsappBtn = card.querySelector('.whatsapp-btn');
      const commentsList = card.querySelector('.comments-list');
      const input = card.querySelector('.comment-input');
      const postBtn = card.querySelector('.post-btn');
      const statusDot = card.querySelector('.status-dot');
      const statusText = card.querySelector('.status-text');
      const viewMoreBtn = card.querySelector('.view-more-btn');

      const savedComments = JSON.parse(localStorage.getItem(`comments-${videoId}`)) || [];

      let showingAll=false;

      function renderComments(limit=3){
        commentsList.innerHTML='';
        const toShow = showingAll ? savedComments : savedComments.slice(-limit);
        toShow.forEach(c=>{
          const li = document.createElement('li');
          li.className='list-group-item';
          li.textContent=`${c.teacher} (${c.title}): ${c.text}`;
          commentsList.appendChild(li);
        });
        viewMoreBtn.style.display = savedComments.length>3 ? 'inline-block' : 'none';
        viewMoreBtn.textContent = showingAll ? 'View Less' : 'View More';
      }

      renderComments();

      viewMoreBtn.addEventListener('click', ()=>{
        showingAll=!showingAll;
        renderComments();
      });

      whatsappBtn.addEventListener('click', e=>{
        e.preventDefault();
        const message = encodeURIComponent(`Hello ${teacher}, I have a question about the video '${title}'`);
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
      });

      postBtn.addEventListener('click', ()=>{
        const text = input.value.trim();
        if(!text) return;
        savedComments.push({teacher,title,text});
        localStorage.setItem(`comments-${videoId}`,JSON.stringify(savedComments));
        renderComments();
        const message = encodeURIComponent(`Comment on '${title}': ${text}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`,'_blank');
        input.value='';
      });

      function updateStatus(){
        const isOnline=Math.random()>0.5;
        if(isOnline){ statusDot.classList.add('bg-online'); statusDot.classList.remove('bg-offline'); statusText.textContent='Online'; }
        else { statusDot.classList.add('bg-offline'); statusDot.classList.remove('bg-online'); statusText.textContent='Offline'; }
      }
      updateStatus();
      setInterval(updateStatus,10000);
    });
  }

  renderVideos();
});
  
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
// Determine the upcoming Friday
const thisFriday = nextFriday();
const today = new Date();

// Get last quiz Friday from localStorage
let lastQuizFriday = localStorage.getItem("lastQuizFriday");

// Reset usedLineages if a new Friday has arrived
let usedLineages = new Set();

if (!lastQuizFriday || new Date(lastQuizFriday).getTime() < thisFriday.getTime() - 7*24*60*60*1000) {
    // It's a new week, clear lineage usage
    usedLineages = new Set();
    localStorage.setItem("usedLineages", JSON.stringify([...usedLineages]));
    localStorage.setItem("lastQuizFriday", thisFriday.toISOString());
} else {
    // Load previously used lineages
    usedLineages = new Set(JSON.parse(localStorage.getItem("usedLineages") || "[]"));
}

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
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("project-slider");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const categoryBtns = document.querySelectorAll("[data-category]");

  const projects = {
    ongoing: [
      { title: "Church Building Renovation", desc: "Renovating the main hall with new seats and sound system.", img: "gloryb.jpg" },
      { title: "Community Outreach", desc: "Weekly evangelism and charity support.", img: "mir.jpg" }
    ],
    upcoming: [
      { title: "Youth Camp", desc: "Organizing a spiritual camp for the youth.", img: "gloryb.jpg" },
      { title: "Bible Study Series", desc: "Launching a new weekly Bible study program.", img: "mir.jpg" }
    ],
    completed: [
      { title: "Health Drive", desc: "Completed medical camp for the community.", img: "stud.png" },
      { title: "Fundraiser", desc: "Successfully raised funds for church library.", img: "2.jpg" }
    ]
  };

  let currentCategory = "ongoing";
  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;

  function renderProjects(category) {
    slider.innerHTML = "";
    projects[category].forEach(p => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <div class="card">
          <img src="${p.img}" class="card-img-top" alt="${p.title}">
          <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <p class="card-text">${p.desc}</p>
          </div>
        </div>
      `;
      slider.appendChild(card);
    });
    currentIndex = 0;
    updateSlider();
  }

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Buttons
  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) currentIndex--;
    updateSlider();
  });

  btnNext.addEventListener("click", () => {
    if (currentIndex < projects[currentCategory].length - 1) currentIndex++;
    updateSlider();
  });

  // Category Buttons
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach(b => b.classList.remove("active", "btn-success"));
      categoryBtns.forEach(b => b.classList.add("btn-outline-success"));
      btn.classList.add("active", "btn-success");
      btn.classList.remove("btn-outline-success");
      currentCategory = btn.dataset.category;
      renderProjects(currentCategory);
    });
  });

  // ✅ Touch Swipe Events
  slider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slider.addEventListener("touchmove", e => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const diff = startX - x;
    // optional: you can show slight dragging effect if desired
  });

  slider.addEventListener("touchend", e => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 50 && currentIndex < projects[currentCategory].length - 1) {
      currentIndex++; // swipe left → next
    } else if (diff < -50 && currentIndex > 0) {
      currentIndex--; // swipe right → previous
    }
    updateSlider();
    isDragging = false;
  });

  // Initial load
  renderProjects(currentCategory);
});

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
const navLinks = document.querySelectorAll('.bottom-nav a');

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
