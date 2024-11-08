let workTime = 25 * 60; // 25 phút Pomodoro
let shortBreakTime = 5 * 60; // 5 phút nghỉ ngắn
let longBreakTime = 15 * 60; // 15 phút nghỉ dài
let currentMode = 'pomodoro'; // Chế độ mặc định là Pomodoro
let timerInterval;
let remainingTime = workTime;

function setMode(mode) {
  // Dừng và reset đồng hồ khi thay đổi chế độ
  clearInterval(timerInterval);
  currentMode = mode;
  
  // Cập nhật thời gian cho mỗi chế độ
  if (mode === 'pomodoro') {
    remainingTime = workTime;
  } else if (mode === 'shortBreak') {
    remainingTime = shortBreakTime;
  } else if (mode === 'longBreak') {
    remainingTime = longBreakTime;
  }
  
  // Cập nhật hiển thị thời gian và thay đổi tab
  document.getElementById("timer").textContent = formatTime(remainingTime);
  updateTabStyles();
}

function updateTabStyles() {
  // Xóa và thêm lớp "active" cho tab hiện tại
  document.getElementById("pomodoroTab").classList.toggle("active", currentMode === 'pomodoro');
  document.getElementById("shortBreakTab").classList.toggle("active", currentMode === 'shortBreak');
  document.getElementById("longBreakTab").classList.toggle("active", currentMode === 'longBreak');
}

function startTimer() {
  clearInterval(timerInterval); // Dừng bộ đếm trước đó nếu có
  timerInterval = setInterval(updateTimer, 1000); // Cập nhật đồng hồ mỗi giây
}

function stopTimer() {
  clearInterval(timerInterval); // Dừng bộ đếm
}

function resetTimer() {
  clearInterval(timerInterval);
  // Đặt lại thời gian theo chế độ hiện tại
  if (currentMode === 'pomodoro') {
    remainingTime = workTime;
  } else if (currentMode === 'shortBreak') {
    remainingTime = shortBreakTime;
  } else if (currentMode === 'longBreak') {
    remainingTime = longBreakTime;
  }
  document.getElementById("timer").textContent = formatTime(remainingTime);
}

function updateTimer() {
  if (remainingTime > 0) {
    remainingTime--;
    document.getElementById("timer").textContent = formatTime(remainingTime);
  } else {
    clearInterval(timerInterval);
    alert("Time's up!"); // Thông báo khi hết thời gian
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Khởi tạo chế độ Pomodoro
setMode('pomodoro');
